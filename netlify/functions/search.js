const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'es-MX,es;q=0.9',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { query } = await req.json()
    if (!query?.trim()) return Response.json({ ok: true, resultados: [] })

    const url = `https://www.cyberpuerta.mx/index.php?cl=search&searchparam=${encodeURIComponent(query)}`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return Response.json({ ok: false, error: 'No se pudo conectar a Cyberpuerta' }, { status: 502 })

    const html = await res.text()
    const resultados = []

    // Extraer bloques de producto — cada producto tiene una URL /Computo-Hardware/...html
    // Patrón: href="URL" ... title="NOMBRE" ... SKU visible después
    const BASE = 'https://www.cyberpuerta.mx'

    // Buscar links de producto con su título
    const linkRegex = /href="(\/Computo-Hardware\/[^"]+\.html)"[^>]*title="([^"]+)"/g
    let match
    const seen = new Set()

    while ((match = linkRegex.exec(html)) !== null) {
      const path = match[1]
      const nombre = match[2].trim()
      if (seen.has(path)) continue
      seen.add(path)

      // Buscar SKU cerca de este link — tomar los 500 chars después del match
      const ctx = html.substring(match.index, match.index + 800)
      const skuMatch = ctx.match(/artNr[^>]*>([^<]{4,40})</) ||
                       ctx.match(/>"([A-Z0-9][A-Z0-9\-\/\.]{3,39})"/) ||
                       ctx.match(/class="[^"]*sku[^"]*"[^>]*>([^<]{3,40})</)

      const sku = skuMatch ? skuMatch[1].trim() : ''

      resultados.push({
        nombre,
        sku,
        url: BASE + path,
      })

      if (resultados.length >= 20) break
    }

    return Response.json({ ok: true, resultados })
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export const config = { path: '/api/search' }
