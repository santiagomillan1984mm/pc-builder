import { useState } from 'react'
import Navbar from './components/Navbar'
import Catalogo from './pages/Catalogo'
import NuevaCotizacion from './pages/NuevaCotizacion'
import Cotizaciones from './pages/Cotizaciones'
import Configuracion from './pages/Configuracion'
import Upgrades from './pages/Upgrades'
import { getComponents, saveComponents, getQuotes, saveQuotes, getConfig, saveConfig, seedIfEmpty, getFavoritos, saveFavoritos, getPresets, savePresets } from './lib/storage'
import { COMPONENTES_SEMILLA } from './lib/seeds'

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
  const setQuotes = (data) => { setQuotesState(data); saveQuotes(data) }
  const setConfig = (data) => { setConfigState(data); saveConfig(data) }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar pagina={pagina} setPagina={setPagina} />
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {pagina === 'catalogo' && <Catalogo components={components} setComponents={setComponents} />}
        {pagina === 'nueva-cotizacion' && (
          <NuevaCotizacion
            components={components}
            setComponents={setComponents}
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
