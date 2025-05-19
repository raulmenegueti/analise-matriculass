export default async function handler(req, res) {
  const { mes, ano, origem } = req.query;

  if (!mes || !ano || !origem) {
    return res.status(400).json({ error: "Parâmetros obrigatórios: mes, ano, origem" });
  }

  const url = `https://script.google.com/macros/s/AKfycbx-0LwakEMHWIDhLPY4FDDdfeLckuSXj1dTFd1lSivgLNFsQAPzPRTYNO_m48SPS5XxDA/exec?mes=${mes}&ano=${ano}&origem=${encodeURIComponent(origem)}`;

  try {
    const response = await fetch(url);
    const texto = await response.text();
    return res.status(200).json({ resposta: texto });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar dados da planilha." });
  }
}
