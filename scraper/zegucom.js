const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'es-MX,es;q=0.9',
}

const IVA = 1.16

// SKU → Base64 → URL directa del producto en Zegucom
function skuToUrl(sku) {
  const b64 = Buffer.from(sku).toString('base64')
  return `https://www.zegucom.com.mx/Producto/index/${b64}`
}

export async function scrapeZegucom(sku) {
  if (!sku || sku.trim() === '') return null
  try {
    const url = skuToUrl(sku)
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return null
    const html = await res.text()

    // Precio sin IVA en data-price o en JSON-LD
    const dataPrice = html.match(/data-price="([\d.]+)"/)
    if (dataPrice) {
      const precio = parseFloat(dataPrice[1])
      if (precio > 0) return Math.round(precio * IVA)
    }

    // Fallback: JSON-LD
    const jsonld = html.match(/"price"\s*:\s*"?([\d.]+)"?/)
    if (jsonld) {
      const precio = parseFloat(jsonld[1])
      if (precio > 100) return Math.round(precio * IVA)
    }

    return null
  } catch {
    return null
  }
}
