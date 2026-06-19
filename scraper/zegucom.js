const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'es-MX,es;q=0.9',
}

const DELAY = 300
const IVA = 1.16

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

// Páginas de categoría donde buscar por tipo de componente
const CATEGORY_URLS = {
  cpu:     'https://www.zegucom.com.mx/Subcategorias/procesadores-amd-socket-am4/M4/3',
  cpu_am5: 'https://www.zegucom.com.mx/Subcategorias/procesadores-amd-socket-am5/AM5/3',
  gpu:     'https://www.zegucom.com.mx/Categoria/tarjetas-de-video/TV/2',
  ram:     'https://www.zegucom.com.mx/Categoria/memorias/MM/2',
  storage: 'https://www.zegucom.com.mx/Categoria/discos-duros-ssd-y-almacenamiento/DD/2',
  mobo:    'https://www.zegucom.com.mx/Categoria/tarjetas-madre/TM/2',
  psu:     'https://www.zegucom.com.mx/Categoria/fuentes-de-poder/FP/2',
}

// Busca el SKU en una página de categoría y devuelve el precio con IVA
async function buscarEnCategoria(sku, categoryUrl) {
  try {
    await sleep(DELAY)
    const res = await fetch(categoryUrl, { headers: HEADERS })
    if (!res.ok) return null
    const html = await res.text()

    // Buscar el elemento <a> que tiene data-noparte igual al SKU
    const skuIdx = html.indexOf(`data-noparte="${sku}"`)
    if (skuIdx === -1) return null

    // data-price está en el mismo <a>, buscar hacia adelante
    const ctx = html.substring(skuIdx, skuIdx + 600)
    const priceMatch = ctx.match(/data-price="([\d.]+)"/)
    if (!priceMatch) return null

    const precioSinIva = parseFloat(priceMatch[1])
    if (isNaN(precioSinIva) || precioSinIva <= 0) return null

    return Math.round(precioSinIva * IVA)
  } catch {
    return null
  }
}

// tipo: 'cpu' | 'cpu_am5' | 'gpu' | 'ram' | 'storage' | 'mobo' | 'psu'
// Si no se pasa tipo, busca en todas las categorías (más lento)
export async function scrapeZegucom(sku, tipo = null) {
  if (!sku || sku.trim() === '') return null

  if (tipo && CATEGORY_URLS[tipo]) {
    return await buscarEnCategoria(sku, CATEGORY_URLS[tipo])
  }

  // Fallback: buscar en todas las categorías
  for (const url of Object.values(CATEGORY_URLS)) {
    const precio = await buscarEnCategoria(sku, url)
    if (precio) return precio
  }

  return null
}
