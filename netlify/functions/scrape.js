import { scrapeCyberpuerta } from '../../scraper/cyberpuerta.js'
import { scrapeZegucom } from '../../scraper/zegucom.js'

const CONCURRENCIA = 4

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { components } = await req.json()
    const resultados = []

    for (let i = 0; i < components.length; i += CONCURRENCIA) {
      const lote = components.slice(i, i + CONCURRENCIA).filter(c => c.sku?.trim())
      const res = await Promise.all(lote.map(async (comp) => {
        const [cp, zg] = await Promise.all([
          scrapeCyberpuerta(comp.sku).catch(() => null),
          scrapeZegucom(comp.sku).catch(() => null),
        ])
        return { id: comp.id, precioCyberpuerta: cp, precioZegucom: zg }
      }))
      resultados.push(...res)
    }

    return Response.json({ ok: true, resultados })
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export const config = { path: '/api/scrape' }
