const KEYS = {
  components: 'cgspot_components',
  quotes: 'cgspot_quotes',
  config: 'cgspot_config',
  favoritos: 'cgspot_favoritos',
}

// SKUs pre-marcados como clásicos de gama media
const SKUS_CLASICOS = new Set([
  // CPU AM4
  '100-100000927BOX', // Ryzen 5 5600
  '100-100000065BOX', // Ryzen 5 5600X
  '100-100000926WOF', // Ryzen 7 5700X
  // CPU AM5
  '100-100001405WOF', // Ryzen 5 9600X
  '100-100001404WOF', // Ryzen 7 9700X
  // CPU Intel
  'CM8071504650608',  // i5-12400F
  'CM8071504821705',  // i5-13400F
  // GPU AMD
  'DUAL-RX7600-8G',
  'GV-R77XTGAMING OC-12GD', // RX 7700 XT
  // GPU NVIDIA RTX 5060
  'RTX 5060 8G VENTUS 2X OC',
  'DUAL-RTX5060-O8G',
  // GPU NVIDIA RTX 5060 Ti
  'G506T-16V2CP',
  'DUAL-RTX5060TI-O16G',
  // RAM DDR4
  'KF432C16BBK2/16',       // Kingston 16GB 2x8
  'CMK16GX4M2B3200C16',    // Corsair 16GB 2x8
  'KF432C16BBK2/32',       // Kingston 32GB
  // RAM DDR5
  'KF560C36BBE2AK2-32',    // Kingston 32GB DDR5
  // SSD
  'SNV2S/1000G',           // Kingston NV2 1TB
  'WDS100T3B0E',           // WD Blue SN580 1TB
  // Motherboard AM4
  'MAG B550M MORTAR WIFI',
  'MAG B550 TOMAHAWK',
  // Motherboard AM5
  'B650M GAMING WIFI',
  'MAG B650 TOMAHAWK WIFI',
  // PSU
  'PYLON650B-BKCUS',       // XPG 650W
  'CP-9020103-NA',         // Corsair CX650M
  'COREREACTOR750G-BKCUS', // XPG Core Reactor 750W
  // Case
  'CC-9011200-WW',         // Corsair 4000D Airflow
  'CA-H510B-B1',           // NZXT H510
  'STARKERAIR-BKCWW',      // XPG Starker Air
  // Cooler
  'R-AK400-BKNNMN-G',     // DeepCool AK400
  'RR-212S-25PZ-R1',      // Hyper 212 Pro
  'ACFRE00123A',           // ARCTIC Freezer 36
])

export function getFavoritos(components) {
  const stored = localStorage.getItem(KEYS.favoritos)
  if (stored) return new Set(JSON.parse(stored))
  // Primera vez: auto-detectar por SKU
  const ids = components.filter(c => c.sku && SKUS_CLASICOS.has(c.sku)).map(c => c.id)
  const set = new Set(ids)
  saveFavoritos(set)
  return set
}

export function saveFavoritos(set) {
  localStorage.setItem(KEYS.favoritos, JSON.stringify([...set]))
}

const DEFAULT_CONFIG = {
  negocio: 'CaboGamespot',
  umbralPCBasica: 15000,
  armadoBasico: 8000,
  armadoEstandar: 5000,
  vigenciaDias: 7,
}

export function getConfig() {
  const stored = localStorage.getItem(KEYS.config)
  return stored ? { ...DEFAULT_CONFIG, ...JSON.parse(stored) } : DEFAULT_CONFIG
}

export function saveConfig(config) {
  localStorage.setItem(KEYS.config, JSON.stringify(config))
}

export function getComponents() {
  const stored = localStorage.getItem(KEYS.components)
  return stored ? JSON.parse(stored) : []
}

export function seedIfEmpty(semilla) {
  if (!localStorage.getItem(KEYS.components)) {
    saveComponents(semilla)
    return semilla
  }
  return getComponents()
}

export function saveComponents(components) {
  localStorage.setItem(KEYS.components, JSON.stringify(components))
}

export function getQuotes() {
  const stored = localStorage.getItem(KEYS.quotes)
  return stored ? JSON.parse(stored) : []
}

export function saveQuotes(quotes) {
  localStorage.setItem(KEYS.quotes, JSON.stringify(quotes))
}

// Aplica resultados del scraper al catálogo actual
const KEY_PRESETS = 'cgspot_presets'

export function getPresets() {
  const stored = localStorage.getItem(KEY_PRESETS)
  return stored ? JSON.parse(stored) : []
}

export function savePresets(presets) {
  localStorage.setItem(KEY_PRESETS, JSON.stringify(presets))
}

export function aplicarPrecios(components, resultados) {
  return components.map(comp => {
    const r = resultados.find(x => x.id === comp.id)
    if (!r) return comp
    const cp = r.precioCyberpuerta
    const zg = r.precioZegucom
    // precio base = el más barato disponible (sin IVA = c/IVA / 1.16)
    const precios = [cp, zg].filter(Boolean)
    const minConIva = precios.length > 0 ? Math.min(...precios) : null
    const tiendaMin = minConIva === cp ? 'Cyberpuerta' : 'Zegucom'
    return {
      ...comp,
      precio: minConIva ? Math.round(minConIva / 1.16) : comp.precio,
      tienda: minConIva ? tiendaMin : comp.tienda,
      precioCyberpuerta: cp,
      precioZegucom: zg,
      updatedAt: new Date().toISOString().slice(0, 10),
    }
  })
}
