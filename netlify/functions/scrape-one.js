import { scrapeCyberpuerta } from '../../scraper/cyberpuerta.js'
import { scrapeZegucom } from '../../scraper/zegucom.js'

const TIPO_ZEGUCOM = {
  CPU: 'cpu', GPU: 'gpu', RAM: 'ram',
  'SSD M.2': 'storage', 'SSD SATA': 'storage', HDD: 'storage',
  Motherboard: 'mobo', PSU: 'psu',
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const comp = await req.json()
    const tipo = TIPO_ZEGUCOM[comp.categoria] || null
    const [cp, zg] = await Promise.all([
      scrapeCyberpuerta(comp.sku).catch(() => null),
      scrapeZegucom(comp.sku, tipo).catch(() => null),
    ])
    return Response.json({ ok: true, id: comp.id, precioCyberpuerta: cp, precioZegucom: zg })
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export const config = { path: '/api/scrape-one' }
