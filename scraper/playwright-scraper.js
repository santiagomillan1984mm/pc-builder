import { chromium } from 'playwright'

let browser = null

async function getBrowser() {
  if (!browser || !browser.isConnected()) {
    browser = await chromium.launch({ headless: true })
  }
  return browser
}

function parsePrecio(texto) {
  if (!texto) return null
  const limpio = texto.replace(/[^0-9.,]/g, '')
  let num
  if (limpio.includes(',') && limpio.includes('.')) {
    num = parseFloat(limpio.replace(/,/g, ''))
  } else if (limpio.includes(',')) {
    num = parseFloat(limpio.replace(/,/g, ''))
  } else {
    num = parseFloat(limpio)
  }
  return isNaN(num) || num < 100 || num > 200000 ? null : Math.round(num)
}

export async function scrapeCyberpuerta(sku) {
  if (!sku) return null
  const b = await getBrowser()
  const ctx = await b.newContext({ locale: 'es-MX' })
  const page = await ctx.newPage()
  try {
    const url = `https://www.cyberpuerta.mx/search/?q=${encodeURIComponent(sku)}`
    await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 })
    await page.waitForTimeout(1500)

    const urlFinal = page.url()
    console.log(`  CP URL: ${urlFinal}`)

    // Si redirigió a producto directamente, leer precio
    const esPaginaProducto = !urlFinal.includes('/search/') && !urlFinal.includes('cyberpuerta.mx/')
    if (esPaginaProducto) {
      console.log(`  CP: redirigió a producto`)
      await page.waitForSelector('[itemprop="price"], .cp-price', { timeout: 8000 }).catch(() => {})
    } else {
      // Estamos en página de búsqueda — buscar el producto correcto por SKU
      // Intentar encontrar un elemento que contenga el SKU y hacer click
      const skuEl = page.getByText(sku, { exact: true }).first()
      if (await skuEl.count() > 0) {
        console.log(`  CP: encontró SKU en página, haciendo click...`)
        await Promise.all([
          page.waitForNavigation({ timeout: 15000, waitUntil: 'networkidle' }).catch(() => {}),
          skuEl.click(),
        ])
        await page.waitForTimeout(1000)
        console.log(`  CP URL producto: ${page.url()}`)
      } else {
        console.log(`  CP: SKU no visible en página, buscando primer resultado...`)
        // Click en el primer resultado de búsqueda
        const primerLink = page.locator('.productName a, .product-name a, h2 a, .cp-product a').first()
        if (await primerLink.count() > 0) {
          await Promise.all([
            page.waitForNavigation({ timeout: 15000, waitUntil: 'networkidle' }).catch(() => {}),
            primerLink.click(),
          ])
          await page.waitForTimeout(1000)
          console.log(`  CP URL producto: ${page.url()}`)
        }
      }
    }

    // Leer precio en la página de producto
    await page.waitForSelector('[itemprop="price"], .cp-price, .productPrice', { timeout: 8000 }).catch(() => {})

    const selectores = [
      { sel: '[itemprop="price"]', attr: 'content' },
      { sel: '.cp-price', attr: null },
      { sel: '.productPrice', attr: null },
    ]

    for (const { sel, attr } of selectores) {
      const el = page.locator(sel).first()
      if (await el.count() > 0) {
        const texto = attr
          ? await el.getAttribute(attr).catch(() => null)
          : await el.innerText().catch(() => null)
        console.log(`  CP [${sel}]: "${texto?.trim().slice(0, 80)}"`)
        const precio = parsePrecio(texto)
        if (precio) return precio
      }
    }

    return null
  } catch (err) {
    console.error(`  CP error (${sku}): ${err.message}`)
    return null
  } finally {
    await ctx.close()
  }
}

export async function scrapeZegucom(sku) {
  if (!sku) return null
  const b = await getBrowser()
  const ctx = await b.newContext({ locale: 'es-MX' })
  const page = await ctx.newPage()
  try {
    const b64 = Buffer.from(sku).toString('base64')
    const url = `https://www.zegucom.com.mx/articulo/${b64}`
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
    await page.waitForTimeout(1000)

    const urlFinal = page.url()
    console.log(`  ZG URL: ${urlFinal}`)

    // Si redirigió a 404 o página de error, salir
    if (urlFinal.includes('404') || urlFinal.includes('error') || urlFinal.includes('inicio')) {
      console.log(`  ZG: página no encontrada`)
      return null
    }

    const selectores = [
      { sel: '[itemprop="price"]', attr: 'content' },
      { sel: '.precio', attr: null },
      { sel: '.price', attr: null },
      { sel: '[class*="precio"]', attr: null },
      { sel: '[class*="price"]', attr: null },
    ]

    for (const { sel, attr } of selectores) {
      const el = page.locator(sel).first()
      if (await el.count() > 0) {
        const texto = attr
          ? await el.getAttribute(attr).catch(() => null)
          : await el.innerText().catch(() => null)
        console.log(`  ZG [${sel}]: "${texto?.trim().slice(0, 80)}"`)
        const precio = parsePrecio(texto)
        if (precio) return precio
      }
    }

    return null
  } catch (err) {
    console.error(`  ZG error (${sku}): ${err.message}`)
    return null
  } finally {
    await ctx.close()
  }
}
