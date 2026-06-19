import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Catalogo from './pages/Catalogo'
import NuevaCotizacion from './pages/NuevaCotizacion'
import Cotizaciones from './pages/Cotizaciones'
import Configuracion from './pages/Configuracion'
import Upgrades from './pages/Upgrades'
import { getComponents, saveComponents, getQuotes, saveQuotes, getConfig, saveConfig, seedIfEmpty, getFavoritos, saveFavoritos, getPresets, savePresets, aplicarPrecios } from './lib/storage'
import { COMPONENTES_SEMILLA } from './lib/seeds'

const HORAS_FRESCURA = 24

const DRAFT_VACIO = { nombre: '', clienteNombre: '', clienteTel: '', items: [], armadoOverride: '', envio: '', notas: '' }

export default function App() {
  const [pagina, setPagina] = useState('catalogo')
  const [components, setComponentsState] = useState(() => seedIfEmpty(COMPONENTES_SEMILLA))
  const [quotes, setQuotesState] = useState(() => getQuotes())
  const [config, setConfigState] = useState(() => getConfig())
  const [draft, setDraft] = useState(DRAFT_VACIO)
  const [favoritos, setFavoritosState] = useState(() => getFavoritos(
    JSON.parse(localStorage.getItem('cgspot_components') || '[]')
  ))
  const setFavoritos = (set) => { setFavoritosState(set); saveFavoritos(set) }
  const [presets, setPresetsState] = useState(() => getPresets())
  const setPresets = (data) => { setPresetsState(data); savePresets(data) }

  const setComponents = (data) => { setComponentsState(data); saveComponents(data) }

  // Auto-update de precios al abrir la app
  const [autoUpdateMsg, setAutoUpdateMsg] = useState(null) // null | 'actualizando' | 'ok' | 'error'
  const autoUpdateRan = useRef(false)

  useEffect(() => {
    if (autoUpdateRan.current) return
    autoUpdateRan.current = true

    const conSku = components.filter(c => c.sku?.trim())
    if (conSku.length === 0) return

    // Ver cuándo fue la última actualización
    const fechas = conSku.map(c => c.updatedAt).filter(Boolean).sort()
    const masVieja = fechas[0]
    if (masVieja) {
      const horasDesde = (Date.now() - new Date(masVieja).getTime()) / 36e5
      if (horasDesde < HORAS_FRESCURA) return // precios frescos, no hacer nada
    }

    const diasTexto = masVieja
      ? (() => {
          const h = Math.round((Date.now() - new Date(masVieja).getTime()) / 36e5)
          return h < 48 ? `hace ${h} hs` : `hace ${Math.round(h / 24)} días`
        })()
      : 'nunca actualizados'

    setAutoUpdateMsg(`Precios ${diasTexto} — actualizando en segundo plano...`)

    const LOTE = 4
    const resultados = []

    ;(async () => {
      for (let i = 0; i < conSku.length; i += LOTE) {
        try {
          const lote = conSku.slice(i, i + LOTE)
          const res = await fetch('/api/scrape', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ components: lote }),
          })
          const data = await res.json()
          if (data.ok) resultados.push(...data.resultados)
        } catch {
          // lote fallido — continuar con el siguiente
        }
      }
      if (resultados.length > 0) {
        setComponentsState(prev => {
          const actualizados = aplicarPrecios(prev, resultados)
          saveComponents(actualizados)
          return actualizados
        })
      }
      const encontrados = resultados.filter(r => r.precioCyberpuerta || r.precioZegucom).length
      if (encontrados > 0) {
        setAutoUpdateMsg(`✅ Precios actualizados — ${encontrados} de ${conSku.length} componentes`)
        setTimeout(() => setAutoUpdateMsg(null), 6000)
      } else {
        setAutoUpdateMsg('⚠️ No se pudieron actualizar los precios automáticamente')
        setTimeout(() => setAutoUpdateMsg(null), 8000)
      }
    })()
  }, [])
  const setQuotes = (data) => { setQuotesState(data); saveQuotes(data) }
  const setConfig = (data) => { setConfigState(data); saveConfig(data) }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar pagina={pagina} setPagina={setPagina} />
      {autoUpdateMsg && (
        <div style={{
          background: autoUpdateMsg.startsWith('✅') ? '#f0fdf4' : autoUpdateMsg.startsWith('⚠️') ? '#fffbeb' : '#eff6ff',
          borderBottom: `1px solid ${autoUpdateMsg.startsWith('✅') ? '#86efac' : autoUpdateMsg.startsWith('⚠️') ? '#fcd34d' : '#bfdbfe'}`,
          padding: '8px 20px', fontSize: 13, color: '#374151',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>{autoUpdateMsg}</span>
          <button onClick={() => setAutoUpdateMsg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 16 }}>✕</button>
        </div>
      )}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {pagina === 'catalogo' && <Catalogo components={components} setComponents={setComponents} />}
        {pagina === 'nueva-cotizacion' && (
          <NuevaCotizacion
            components={components}
            quotes={quotes}
            setQuotes={setQuotes}
            config={config}
            setPagina={setPagina}
            draft={draft}
            setDraft={setDraft}
            resetDraft={() => setDraft(DRAFT_VACIO)}
            favoritos={favoritos}
            setFavoritos={setFavoritos}
            presets={presets}
            setPresets={setPresets}
          />
        )}
        {pagina === 'cotizaciones' && (
          <Cotizaciones
            quotes={quotes} setQuotes={setQuotes}
            components={components} config={config}
            setDraft={setDraft} setPagina={setPagina}
          />
        )}
        {pagina === 'upgrades' && <Upgrades components={components} />}
        {pagina === 'config' && <Configuracion config={config} setConfig={setConfig} />}
      </div>
    </div>
  )
}
