const DELAY_MIN = 1500
const DELAY_JITTER = 1000

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'es-MX,es;q=0.9',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

export async function scrapeCyberpuerta(sku) {
  if (!sku || sku.trim() === '') return null
  try {
    await sleep(DELAY_MIN + Math.random() * DELAY_JITTER)
    const url = `https://www.cyberpuerta.mx/index.php?cl=search&searchparam=${encodeURIComponent(sku)}`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return null
    const html = await res.text()

    // Precio en JSON-LD estructurado — el primer "price" corresponde al producto buscado
    const match = html.match(/"price"\s*:\s*"?(\d+(?:\.\d+)?)"?/)
    if (match) {
      const precio = Math.round(parseFloat(match[1]))
      if (precio > 100) return precio
    }

    return null
  } catch {
    return null
  }
}
