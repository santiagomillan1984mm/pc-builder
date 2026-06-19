const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'es-MX,es;q=0.9',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

// Extrae nombre legible desde la URL del producto
function nombreDesdeUrl(path) {
  const slug = path.split('/').pop().replace('.html', '')
  return slug.replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
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
    const BASE = 'https://www.cyberpuerta.mx'
    const resultados = []
    const seen = new Set()

    // Extraer todos los hrefs de productos
    const hrefRegex = /href="(\/Computo-Hardware\/[^"]+\.html)"/g
    let m

    while ((m = hrefRegex.exec(html)) !== null) {
      const path = m[1]
      if (seen.has(path)) continue
      // Ignorar links de breadcrumb (paths muy cortos sin nombre de producto)
      const partes = path.split('/').filter(Boolean)
      if (partes.length < 4) continue
      seen.add(path)

      // Buscar el nombre en el texto cercano al link
      // Intentar extraer texto entre > y < cerca de este href
      const ctx = html.substring(m.index, m.index + 600)

      // Buscar título como texto de link: >Texto</a> o title="Texto"
      let nombre = ''
      const titleMatch = ctx.match(/title="([^"]{10,200})"/)
      if (titleMatch) {
        nombre = titleMatch[1].trim()
      } else {
        // Buscar texto entre > y </a> o > y <
        const textMatch = ctx.match(/>[^<>]{15,200}(?:<\/a>|<\/span>|<\/h)/)
        if (textMatch) {
          nombre = textMatch[0].replace(/^>/, '').replace(/<\/.+$/, '').trim()
        }
      }
      // Fallback: derivar nombre desde URL
      if (!nombre || nombre.length < 5) {
        nombre = nombreDesdeUrl(path)
      }

      // Buscar SKU cerca del link — buscar en un radio de 800 chars
      const ctx2 = html.substring(Math.max(0, m.index - 100), m.index + 800)
      let sku = ''
      // Patrón SKU típico: mezcla de mayúsculas, números, guiones, barras
      const skuPatterns = [
        /artNr[^>]*?>([^<]{3,40})</,
        /class="[^"]*artnum[^"]*"[^>]*>([^<]{3,40})</i,
        />\s*((?:[A-Z0-9]{2,}[-\/][A-Z0-9]|[0-9]{3}-[0-9]{9,})[^\s<"]{0,30})\s*</,
      ]
      for (const pat of skuPatterns) {
        const sk = ctx2.match(pat)
        if (sk && sk[1].trim().length >= 4) { sku = sk[1].trim(); break }
      }

      resultados.push({ nombre, sku, url: BASE + path })
      if (resultados.length >= 20) break
    }

    return Response.json({ ok: true, resultados })
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export const config = { path: '/api/search' }
