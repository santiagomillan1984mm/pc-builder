import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, pathToFileURL } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Mapea categoría del catálogo al tipo de Zegucom
function tipoZegucom(categoria) {
  const map = {
    'CPU': 'cpu',
    'GPU': 'gpu',
    'RAM': 'ram',
    'SSD M.2': 'storage',
    'SSD SATA': 'storage',
    'HDD': 'storage',
    'Motherboard': 'mobo',
    'PSU': 'psu',
  }
  return map[categoria] || null
}

async function scrapeComponente(comp, scrapers) {
  const { scrapeCyberpuerta, scrapeZegucom } = scrapers
  const tipo = tipoZegucom(comp.categoria)
  const [cp, zg] = await Promise.all([
    scrapeCyberpuerta(comp.sku).catch(() => null),
    scrapeZegucom(comp.sku, tipo).catch(() => null),
  ])
  console.log(`  ${comp.nombre}: CP=$${cp || '—'}  ZG=$${zg || '—'}`)
  return { id: comp.id, precioCyberpuerta: cp, precioZegucom: zg }
}

function scraperPlugin() {
  return {
    name: 'scraper-api',
    configureServer(server) {

      // POST /api/scrape — actualiza todos los componentes del catálogo
      server.middlewares.use('/api/scrape', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', async () => {
          try {
            const scrapers = await import(
              pathToFileURL(path.join(__dirname, 'scraper/index.js')).href +
              '?t=' + Date.now()
            )
            const { components } = JSON.parse(body)
            console.log(`\n🔄 Scraping ${components.length} componentes...`)

            // De a 2 para no saturar — pausa de 1s entre lotes
            const CONCURRENCIA = 2
            const resultados = []
            for (let i = 0; i < components.length; i += CONCURRENCIA) {
              const lote = components.slice(i, i + CONCURRENCIA).filter(c => c.sku?.trim())
              const res2 = await Promise.all(lote.map(c => scrapeComponente(c, scrapers)))
              resultados.push(...res2)
              if (i + CONCURRENCIA < components.length) await new Promise(r => setTimeout(r, 1000))
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, resultados }))
          } catch (err) {
            console.error('❌ /api/scrape:', err.message)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message }))
          }
        })
      })

      // POST /api/scrape-one — busca precio de un solo componente (botón 🔍)
      server.middlewares.use('/api/scrape-one', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', async () => {
          try {
            const scrapers = await import(
              pathToFileURL(path.join(__dirname, 'scraper/index.js')).href +
              '?t=' + Date.now()
            )
            const comp = JSON.parse(body)
            const resultado = await scrapeComponente(comp, scrapers)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, ...resultado }))
          } catch (err) {
            console.error('❌ /api/scrape-one:', err.message)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), scraperPlugin()],
  server: { port: 5173, strictPort: true },
})
