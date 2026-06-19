import { useState, useMemo } from 'react'
import { CPUS, GPUS, JUEGOS, NIVELES, RESOLUCIONES, detectarBottleneck, psuSuficiente, reqEfectivo } from '../lib/upgradeKnowledge'

// ─── Paleta ──────────────────────────────────────────────────────────────────
const C = {
  bg: '#f5f6fa',
  card: '#ffffff',
  primary: '#1E3EBF',
  primary2: '#2952e0',
  green: '#16a34a',
  greenBg: '#f0fdf4',
  greenBorder: '#86efac',
  yellow: '#d97706',
  yellowBg: '#fffbeb',
  yellowBorder: '#fcd34d',
  red: '#dc2626',
  redBg: '#fef2f2',
  redBorder: '#fca5a5',
  blue: '#2563eb',
  blueBg: '#eff6ff',
  blueBorder: '#bfdbfe',
  orange: '#ea580c',
  orangeBg: '#fff7ed',
  orangeBorder: '#fed7aa',
  gray: '#6b7280',
  grayBg: '#f9fafb',
  grayBorder: '#e5e7eb',
  text: '#111827',
  text2: '#4b5563',
}

const urgenciaConfig = {
  critico:     { color: C.red,    bg: C.redBg,    border: C.redBorder,    icon: '🔴', label: 'Prioritario' },
  recomendado: { color: C.yellow, bg: C.yellowBg, border: C.yellowBorder, icon: '🟡', label: 'Recomendado' },
  mejora:      { color: C.green,  bg: C.greenBg,  border: C.greenBorder,  icon: '🟢', label: 'Mejora extra' },
  info:        { color: C.blue,   bg: C.blueBg,   border: C.blueBorder,   icon: '🔵', label: 'A tener en cuenta' },
}

// ─── Selects y opciones de Step 1 ────────────────────────────────────────────
const OPCIONES_RAM_GB   = [4, 8, 12, 16, 24, 32, 48, 64]
const OPCIONES_RAM_VEL  = ['2133 MHz', '2400 MHz', '2666 MHz', '3000 MHz', '3200 MHz', '3600 MHz', '4000 MHz', '4800 MHz', '5200 MHz', '5600 MHz', '6000 MHz']
const OPCIONES_CANALES  = ['Single channel (1 módulo)', 'Dual channel (2+ módulos)']
const OPCIONES_COOLER   = ['Stock AMD (AMD Wraith)', 'Stock Intel (sin cooler propio)', 'Cooler aire básico (~$300)', 'Cooler aire alto rendimiento (~$800)', 'AIO 120mm', 'AIO 240mm', 'AIO 360mm']
const OPCIONES_FANS     = ['Solo los del gabinete (0 extras)', '1–2 ventiladores extra', '3–4 ventiladores extra (buen flujo)', '5+ ventiladores / setup completo']
const OPCIONES_STORAGE  = ['Solo HDD', 'SSD SATA', 'NVMe Gen 3', 'NVMe Gen 4']
const OPCIONES_PSU      = ['No sé cuántos watts tiene', '300–400W', '450–500W', '550–600W', '650–700W', '750–800W', '850W+']
const PSU_WATTS = { 'No sé cuántos watts tiene': null, '300–400W': 350, '450–500W': 475, '550–600W': 575, '650–700W': 675, '750–800W': 775, '850W+': 900 }

const CATEGORIAS_JUEGO = ['Esports', 'Battle Royale', 'FPS', 'Open World', 'Deportes', 'Sandbox', 'Casual', 'Productividad']

// ─── Util ─────────────────────────────────────────────────────────────────────
function scoreLabel(score) {
  if (!score) return 'Sin GPU dedicada'
  if (score >= 90) return 'Alta gama'
  if (score >= 75) return 'Gama media-alta'
  if (score >= 58) return 'Gama media'
  if (score >= 40) return 'Gama entrada'
  return 'Básica'
}

function getCPUScore(cpu) { return cpu?.scoreGaming || 0 }
function getGPUScore(gpu) { return gpu?.scoreGaming || 0 }

function mejorGPUparaScore(scoreMin) {
  const candidatas = GPUS
    .filter(g => g.scoreGaming >= scoreMin && g.scoreGaming < scoreMin + 20)
    .sort((a, b) => {
      const diff = a.scoreGaming - b.scoreGaming
      if (Math.abs(diff) <= 5) {
        const aRTX5 = a.modelo.includes('RTX 5')
        const bRTX5 = b.modelo.includes('RTX 5')
        if (aRTX5 && !bRTX5) return -1
        if (bRTX5 && !aRTX5) return 1
      }
      return diff
    })
  return candidatas[0] || GPUS.filter(g => g.scoreGaming >= scoreMin).sort((a, b) => a.scoreGaming - b.scoreGaming)[0]
}

function mejorCPUparaScore(scoreMin, plataformaActual) {
  return CPUS
    .filter(c => c.plataforma === plataformaActual && c.scoreGaming >= scoreMin)
    .sort((a, b) => a.scoreGaming - b.scoreGaming)[0]
}

// ─── Lógica de recomendaciones ───────────────────────────────────────────────
function calcularRecomendaciones({ cpuData, gpuData, ramGB, ramVel, canales, cooler, fans, storage, psuWatts, juego, nivelId, resolucion }) {
  const reqs = reqEfectivo(juego, nivelId, resolucion)
  const recs = []

  const cpuScore = getCPUScore(cpuData)
  const gpuScore = getGPUScore(gpuData)
  const bottle = detectarBottleneck(cpuData, gpuData)
  const ramVelNum = parseInt(ramVel) || 3200
  const storageNecesitaSSD = reqs.cpu >= 55

  // ── GPU ──────────────────────────────────────────────────────────────────
  const gpuInsuficiente = gpuScore < reqs.gpu
  const gpuBottleneck = bottle === 'gpu'

  if (gpuInsuficiente || gpuBottleneck) {
    const scoreMeta = Math.max(reqs.gpu, cpuScore - 10)
    const gpuSugerida = mejorGPUparaScore(scoreMeta)
    const esCritico = gpuScore < reqs.gpu - 15
    const necesitaMasPSU = gpuSugerida && !psuSuficiente(psuWatts, gpuSugerida)

    recs.push({
      id: 'gpu',
      urgencia: esCritico ? 'critico' : 'recomendado',
      titulo: gpuInsuficiente ? 'Actualizar GPU — la actual no alcanza' : 'Actualizar GPU — cuello de botella',
      icono: '🎮',
      descripcion: gpuInsuficiente
        ? `Tu ${gpuData?.modelo || 'GPU actual'} (${scoreLabel(gpuScore)}) no llega al nivel "${NIVELES.find(n => n.id === nivelId)?.label}" para este juego.`
        : `Tu GPU está siendo el freno. El CPU es más potente y la GPU lo limita.`,
      detalle: gpuSugerida
        ? `Recomendamos la **${gpuSugerida.modelo}** — equilibra perfecto con tu CPU para ${reqs.gpu <= gpuSugerida.scoreGaming ? '✅' : '⚠️'} el objetivo.`
        : 'Buscá una GPU de gama media-alta de la serie actual.',
      impacto: 'Más FPS, mejor calidad visual, texturas más rápidas.',
      advertencia: necesitaMasPSU ? `⚠️ La ${gpuSugerida?.modelo} requiere ~${gpuSugerida?.psuMin}W de fuente. Puede que necesites cambiar la tuya también.` : null,
      subItems: gpuSugerida ? [
        { label: 'GPU sugerida', valor: gpuSugerida.modelo },
        { label: 'VRAM', valor: `${gpuSugerida.vram}GB` },
        { label: 'Fuente mínima', valor: `${gpuSugerida.psuMin}W` },
      ] : [],
    })
  }

  // ── CPU ──────────────────────────────────────────────────────────────────
  const cpuInsuficiente = cpuScore < reqs.cpu
  const cpuBottleneck = bottle === 'cpu'
  const plataformasViejas = ['AM4', 'LGA1200', 'LGA1151']
  const cambioPlataforma = cpuData && plataformasViejas.includes(cpuData.plataforma)
  const mejorEnPlataforma = cpuData ? mejorCPUparaScore(reqs.cpu, cpuData.plataforma) : null
  const hayUpgradeSinCambiar = mejorEnPlataforma && mejorEnPlataforma.scoreGaming > cpuScore + 5

  if (cpuInsuficiente || cpuBottleneck) {
    const esCritico = cpuScore < reqs.cpu - 15

    if (hayUpgradeSinCambiar && mejorEnPlataforma) {
      recs.push({
        id: 'cpu',
        urgencia: esCritico ? 'critico' : 'recomendado',
        titulo: cpuInsuficiente ? 'Actualizar CPU — la actual no alcanza' : 'Actualizar CPU — cuello de botella',
        icono: '⚙️',
        descripcion: cpuInsuficiente
          ? `Tu ${cpuData?.modelo || 'CPU actual'} no tiene suficiente potencia para este objetivo.`
          : `Tu CPU es el freno. La GPU se queda esperando trabajo, perdés FPS innecesariamente.`,
        detalle: `Podés cambiar a **${mejorEnPlataforma.modelo}** usando la misma placa madre (socket ${cpuData?.plataforma}). Sin cambio de plataforma.`,
        impacto: 'Más FPS estables, menos caídas en escenas con muchos personajes, mejor en juegos multijugador.',
        advertencia: mejorEnPlataforma.tdp > 95 ? `⚠️ El ${mejorEnPlataforma.modelo} consume ${mejorEnPlataforma.tdp}W TDP — necesitarás un cooler mejor que el stock.` : null,
        subItems: [
          { label: 'CPU sugerida', valor: mejorEnPlataforma.modelo },
          { label: 'Socket', valor: cpuData?.plataforma },
          { label: 'TDP', valor: `${mejorEnPlataforma.tdp}W` },
        ],
      })
    } else if (cpuData && cambioPlataforma) {
      recs.push({
        id: 'cpu-plataforma',
        urgencia: esCritico ? 'recomendado' : 'mejora',
        titulo: 'Cambio de plataforma para CPU potente',
        icono: '🔄',
        descripcion: `No hay una CPU mucho más potente disponible para tu placa actual (${cpuData.plataforma}). Si querés un salto real, sería cambio de plataforma.`,
        detalle: 'AM5 (Ryzen 7000/9000) o Intel LGA1700 son las plataformas modernas con más recorrido a futuro.',
        impacto: 'Salto generacional: acceso a DDR5, CPUs más modernas, soporte por más años.',
        advertencia: 'Implica cambiar CPU + placa madre + RAM. Es una inversión mayor.',
        subItems: [
          { label: 'Opción AMD', valor: 'Ryzen 7 9700X + placa B650 + DDR5' },
          { label: 'Opción Intel', valor: 'Core i5-13600K + placa B660/B760' },
        ],
      })
    }
  }

  // ── RAM cantidad ─────────────────────────────────────────────────────────
  if (ramGB < reqs.ram) {
    recs.push({
      id: 'ram-gb',
      urgencia: ramGB <= reqs.ram / 2 ? 'critico' : 'recomendado',
      titulo: `Poca RAM — necesitás más para este uso`,
      icono: '🧠',
      descripcion: `Tenés ${ramGB}GB y este juego/uso necesita mínimo ${reqs.ram}GB para correr bien.`,
      detalle: `Con poca RAM el sistema empieza a usar el disco como memoria virtual (swap), lo que causa lagg brutal y tiempos de carga muy largos.`,
      impacto: 'Menos stuttering, carga más rápida, permite tener el juego + Discord + Chrome abiertos.',
      advertencia: null,
      subItems: [
        { label: 'RAM actual', valor: `${ramGB}GB` },
        { label: 'RAM mínima sugerida', valor: `${reqs.ram}GB` },
        { label: 'Recomendado', valor: `${Math.max(reqs.ram, 16)}GB` },
      ],
    })
  }

  // ── RAM velocidad ─────────────────────────────────────────────────────────
  const necesitaRamRapida = cpuScore >= 70 && ramVelNum < 3200 && canales === OPCIONES_CANALES[1]
  const enSingleChannel = canales === OPCIONES_CANALES[0] && (cpuScore >= 60 || gpuScore >= 55)

  if (necesitaRamRapida) {
    recs.push({
      id: 'ram-vel',
      urgencia: 'recomendado',
      titulo: 'RAM lenta para tu CPU',
      icono: '⚡',
      descripcion: `Tu CPU es potente pero la RAM a ${ramVelNum}MHz puede ser un freno silencioso, especialmente en juegos que dependen mucho del procesador.`,
      detalle: cpuData?.plataforma === 'AM5'
        ? 'En AM5, DDR5 a 6000MHz CL30 es el sweet spot para Ryzen 7000/9000. Marcan hasta 10% más FPS en juegos CPU-heavy.'
        : 'En AM4, DDR4 3600MHz CL18 es el sweet spot para Ryzen 5000. Si tenés 3200MHz ya estás bien, pero 3600 se nota.',
      impacto: 'FPS más constantes en juegos CPU-heavy (CS2, Valorant, Warzone). Latencia de RAM más baja.',
      advertencia: null,
      subItems: [
        { label: 'Velocidad actual', valor: `${ramVelNum}MHz` },
        { label: 'Objetivo', valor: cpuData?.plataforma === 'AM5' ? '6000MHz DDR5' : '3600MHz DDR4' },
      ],
    })
  }

  if (enSingleChannel) {
    recs.push({
      id: 'ram-dual',
      urgencia: 'recomendado',
      titulo: 'Pasar a Dual Channel — diferencia enorme',
      icono: '🔀',
      descripcion: 'Tenés un solo módulo de RAM. Pasar a dos módulos (dual channel) dobla el ancho de banda de memoria.',
      detalle: 'En juegos como Valorant, CS2 y Fortnite la diferencia puede ser 20–30% más FPS solo por activar dual channel. Es de lo más costo-efectivo que podés hacer.',
      impacto: 'Más FPS, menos stuttering, especialmente en CPU-heavy games. Particularmente notable en APUs (iGPU).',
      advertencia: null,
      subItems: [
        { label: 'Configuración actual', valor: 'Single channel' },
        { label: 'Objetivo', valor: `${ramGB}GB en 2 módulos iguales (dual channel)` },
      ],
    })
  }

  // ── Cooler ────────────────────────────────────────────────────────────────
  const coolerStockConCPUCaliente = (cooler.includes('Stock') || cooler.includes('básico')) && cpuData?.tdp >= 95
  const coolerInsuficienteParaUpgrade = cooler.includes('Stock') && (cpuScore >= 75 || (cpuInsuficiente && mejorEnPlataforma?.tdp >= 95))
  const quiereStreaming = juego.id === 'streaming'

  if (coolerStockConCPUCaliente || coolerInsuficienteParaUpgrade || quiereStreaming) {
    recs.push({
      id: 'cooler',
      urgencia: coolerStockConCPUCaliente ? 'critico' : 'recomendado',
      titulo: coolerStockConCPUCaliente ? 'Cooler insuficiente para tu CPU' : 'Mejorar refrigeración del CPU',
      icono: '❄️',
      descripcion: coolerStockConCPUCaliente
        ? `Tu CPU genera ${cpuData?.tdp}W y con un cooler stock o básico va a hacer throttling (bajar la frecuencia para no quemarse). Perdés rendimiento y vida útil.`
        : 'Con un cooler mejor tu CPU corre más fresco, más rápido y más silencioso.',
      detalle: 'Para CPUs de 95W+ recomendamos mínimo un cooler aire de alto rendimiento (tipo Deepcool AK400, ID-Cooling SE-224). Para 125W+ o overclocking, un AIO 240mm o más.',
      impacto: 'Temperaturas más bajas, frecuencias sostenidas, PC más silenciosa. El CPU no baja el rendimiento bajo carga larga.',
      advertencia: null,
      subItems: [
        { label: 'Cooler actual', valor: cooler },
        { label: 'Mínimo recomendado', valor: cpuData?.tdp >= 125 ? 'AIO 240mm' : 'Cooler aire tipo torre' },
        { label: 'Ideal', valor: cpuData?.tdp >= 125 ? 'AIO 360mm' : 'AIO 240mm' },
      ],
    })
  }

  // ── Ventiladores ──────────────────────────────────────────────────────────
  const pocosVentiladores = fans === OPCIONES_FANS[0] && (cpuData?.tdp >= 65 || gpuScore >= 60)

  if (pocosVentiladores) {
    recs.push({
      id: 'fans',
      urgencia: 'mejora',
      titulo: 'Agregar ventiladores de gabinete',
      icono: '💨',
      descripcion: 'El flujo de aire dentro del gabinete afecta directamente las temperaturas de CPU y GPU. Sin buena extracción/admisión, el calor se acumula.',
      detalle: 'Lo ideal es presión positiva: más entrada que salida. Por ejemplo, 2 frontales + 1 trasero. Los ventiladores de 120mm o 140mm son los más comunes y baratos.',
      impacto: 'Temperaturas 5–15°C más bajas en promedio. Componentes más silenciosos bajo carga. Mayor vida útil.',
      advertencia: null,
      subItems: [
        { label: 'Config. mínima', valor: '2 frontales (entrada) + 1 trasero (salida)' },
        { label: 'Config. ideal', valor: '3 frontales + 1 trasero + 1 superior (salida)' },
        { label: 'Marcas económicas', valor: 'Arctic P12, Deepcool, ID-Cooling' },
      ],
    })
  }

  // ── Almacenamiento ────────────────────────────────────────────────────────
  const enHDD = storage === 'Solo HDD'
  const enSATASSD = storage === 'SSD SATA'
  const juegoNecesitaNVMe = reqs.cpu >= 68

  if (enHDD) {
    recs.push({
      id: 'storage-hdd',
      urgencia: 'critico',
      titulo: 'Cambiar HDD a SSD — diferencia de noche y día',
      icono: '💾',
      descripcion: 'Tenés un disco duro mecánico (HDD). Es el cuello de botella más frustrante de una PC: tiempos de carga de 2–5 minutos, lagg al abrir el juego, stuttering al moverse por el mapa.',
      detalle: 'Un SSD NVMe básico (Kingston NV3, WD Green SN350) cuesta poco y multiplica la velocidad por 5–10x. Es la mejora más costo-efectiva que existe.',
      impacto: 'Inicio de Windows en 10 segundos, carga de juegos en 10–30 segundos, fin del stuttering por carga de texturas.',
      advertencia: null,
      subItems: [
        { label: 'Velocidad HDD', valor: '~100 MB/s' },
        { label: 'SSD SATA', valor: '~500 MB/s' },
        { label: 'NVMe Gen 3', valor: '~3500 MB/s' },
        { label: 'NVMe Gen 4', valor: '~7000 MB/s' },
      ],
    })
  } else if (enSATASSD && juegoNecesitaNVMe) {
    recs.push({
      id: 'storage-nvme',
      urgencia: 'mejora',
      titulo: 'Pasar a NVMe — carga más rápida',
      icono: '🚀',
      descripcion: 'Tu SSD SATA es bueno, pero los juegos modernos cargan mundos abiertos enormes en streaming constante. Un NVMe Gen 3 o Gen 4 mejora esos tiempos notablemente.',
      detalle: 'Juegos como GTA VI, Battlefield 6, Hogwarts Legacy fueron diseñados asumiendo NVMe. La diferencia se nota sobre todo en open world y load times.',
      impacto: 'Tiempos de carga más cortos, menos pop-in de texturas en mundo abierto.',
      advertencia: null,
      subItems: [
        { label: 'SATA actual', valor: '~550 MB/s' },
        { label: 'NVMe sugerido', valor: 'Kingston NV3 / WD Blue SN580 — ~3500 MB/s' },
      ],
    })
  }

  // ── PSU ───────────────────────────────────────────────────────────────────
  const gpuNueva = gpuScore < reqs.gpu ? mejorGPUparaScore(reqs.gpu) : null
  const psuInsuficiente = gpuNueva && psuWatts !== null && !psuSuficiente(psuWatts, gpuNueva)
  const psuDesconocida = gpuNueva && psuWatts === null

  if (psuInsuficiente) {
    recs.push({
      id: 'psu',
      urgencia: 'critico',
      titulo: '⚠️ Fuente de poder insuficiente para la GPU nueva',
      icono: '🔌',
      descripcion: `Tu fuente actual (~${psuWatts}W) no tiene margen suficiente para la GPU que necesitás (requiere ~${gpuNueva?.psuMin}W).`,
      detalle: 'Una fuente con poca potencia puede causar cortes de luz, daños al hardware o que la GPU no rinda al máximo. Siempre comprá fuente con 20% de margen extra.',
      impacto: 'Estabilidad del sistema, seguridad de tus componentes.',
      advertencia: 'Comprá fuente certificada 80 Plus Bronze o mejor: Corsair CV, Thermaltake Smart, EVGA BQ.',
      subItems: [
        { label: 'Fuente actual', valor: `${psuWatts}W` },
        { label: 'Mínimo necesario', valor: `${gpuNueva?.psuMin}W` },
        { label: 'Recomendado', valor: `${(gpuNueva?.psuMin || 0) + 100}W (con margen)` },
      ],
    })
  } else if (psuDesconocida && gpuNueva) {
    recs.push({
      id: 'psu-check',
      urgencia: 'info',
      titulo: 'Verificar fuente antes de comprar GPU',
      icono: '🔌',
      descripcion: `No sabemos cuántos watts tiene tu fuente. Si vas a comprar una ${gpuNueva?.modelo}, necesitás mínimo ${gpuNueva?.psuMin}W.`,
      detalle: 'Revisá la etiqueta de tu fuente (está en el costado). Si no tiene la potencia, cambiala primero — es más barato que dañar la GPU nueva.',
      impacto: 'Evitar daño de hardware y cortes inesperados.',
      advertencia: null,
      subItems: [
        { label: 'Mínimo para GPU sugerida', valor: `${gpuNueva?.psuMin}W` },
      ],
    })
  }

  // ── Si todo está bien ────────────────────────────────────────────────────
  const hayProblemas = recs.filter(r => r.urgencia === 'critico' || r.urgencia === 'recomendado').length === 0
  if (hayProblemas) {
    recs.push({
      id: 'ok',
      urgencia: 'info',
      titulo: '¡Tu PC ya está a la altura!',
      icono: '🏆',
      descripcion: `Tu configuración actual cumple con los requerimientos para "${NIVELES.find(n => n.id === nivelId)?.label}" en ${juego.nombre}.`,
      detalle: 'No hay cuellos de botella evidentes. Si querés llevarla al siguiente nivel, podés subir un escalón en el objetivo de rendimiento.',
      impacto: '',
      advertencia: null,
      subItems: [],
    })
  }

  const orden = { critico: 0, recomendado: 1, mejora: 2, info: 3 }
  return recs.sort((a, b) => orden[a.urgencia] - orden[b.urgencia])
}

// ─── Componentes UI ───────────────────────────────────────────────────────────
function Badge({ urgencia }) {
  const cfg = urgenciaConfig[urgencia]
  return (
    <span style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, borderRadius: 12, padding: '2px 10px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

function TarjetaRec({ rec, idx }) {
  const [open, setOpen] = useState(idx < 3)
  const cfg = urgenciaConfig[rec.urgencia]

  const parseDetalle = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : p)
  }

  return (
    <div style={{ border: `1.5px solid ${cfg.border}`, borderRadius: 12, background: cfg.bg, marginBottom: 12, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}
      >
        <span style={{ fontSize: 24, flexShrink: 0, marginTop: 1 }}>{rec.icono}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{rec.titulo}</span>
            <Badge urgencia={rec.urgencia} />
          </div>
          <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.5 }}>{rec.descripcion}</div>
        </div>
        <span style={{ color: C.gray, fontSize: 16, flexShrink: 0, marginTop: 2 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ padding: '0 18px 16px 54px', borderTop: `1px solid ${cfg.border}` }}>
          {rec.detalle && (
            <p style={{ fontSize: 13.5, color: C.text, margin: '12px 0 8px', lineHeight: 1.65 }}>
              {parseDetalle(rec.detalle)}
            </p>
          )}
          {rec.impacto && (
            <div style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 8, padding: '8px 12px', marginBottom: 8, fontSize: 13, color: C.green }}>
              ✅ <strong>Qué mejora:</strong> {rec.impacto}
            </div>
          )}
          {rec.advertencia && (
            <div style={{ background: C.yellowBg, border: `1px solid ${C.yellowBorder}`, borderRadius: 8, padding: '8px 12px', marginBottom: 8, fontSize: 13, color: C.yellow }}>
              {rec.advertencia}
            </div>
          )}
          {rec.subItems?.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 6, marginTop: 8 }}>
              {rec.subItems.map((si, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 8, padding: '6px 10px', fontSize: 12 }}>
                  <div style={{ color: C.gray, marginBottom: 2 }}>{si.label}</div>
                  <div style={{ fontWeight: 700, color: C.text }}>{si.valor}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SelectRow({ label, value, onChange, options, helpText }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: `1.5px solid ${C.grayBorder}`, fontSize: 14, background: '#fff', color: C.text }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {helpText && <div style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>{helpText}</div>}
    </div>
  )
}

function StepIndicator({ paso, total }) {
  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 24, alignItems: 'center' }}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1
        const activo = n === paso
        const done = n < paso
        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center', flex: n < total ? 1 : 'initial' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14, flexShrink: 0,
              background: done ? C.green : activo ? C.primary : '#e5e7eb',
              color: done || activo ? '#fff' : C.gray,
            }}>
              {done ? '✓' : n}
            </div>
            {n < total && <div style={{ flex: 1, height: 2, background: done ? C.green : '#e5e7eb', margin: '0 4px' }} />}
          </div>
        )
      })}
    </div>
  )
}

const PASO_LABELS = ['Tu PC actual', 'Qué querés jugar', 'Nivel de rendimiento', 'Resultados']

// ─── Página principal ────────────────────────────────────────────────────────
export default function Upgrades() {
  const [paso, setPaso] = useState(1)

  // Step 1
  const [cpuModelo, setCpuModelo] = useState('')
  const [gpuModelo, setGpuModelo] = useState('')
  const [ramGB, setRamGB] = useState(16)
  const [ramVel, setRamVel] = useState('3200 MHz')
  const [canales, setCanales] = useState(OPCIONES_CANALES[1])
  const [cooler, setCooler] = useState(OPCIONES_COOLER[0])
  const [fans, setFans] = useState(OPCIONES_FANS[0])
  const [storage, setStorage] = useState('NVMe Gen 3')
  const [psuOpcion, setPsuOpcion] = useState(OPCIONES_PSU[0])
  const [resolucion, setResolucion] = useState('1080p')

  // Step 2
  const [juegoId, setJuegoId] = useState('')
  const [catFiltro, setCatFiltro] = useState('Todos')

  // Step 3
  const [nivelId, setNivelId] = useState('comodo')

  const cpuData = CPUS.find(c => c.modelo === cpuModelo)
  const gpuData = GPUS.find(g => g.modelo === gpuModelo)
  const juego = JUEGOS.find(j => j.id === juegoId)
  const nivel = NIVELES.find(n => n.id === nivelId)
  const psuWatts = PSU_WATTS[psuOpcion]

  const recomendaciones = useMemo(() => {
    if (!cpuData || !gpuData || !juego || !nivelId) return []
    return calcularRecomendaciones({ cpuData, gpuData, ramGB, ramVel, canales, cooler, fans, storage, psuWatts, juego, nivelId, resolucion })
  }, [cpuData, gpuData, ramGB, ramVel, canales, cooler, fans, storage, psuWatts, juego, nivelId, resolucion])

  const juegosFiltrados = catFiltro === 'Todos' ? JUEGOS : JUEGOS.filter(j => j.categoria === catFiltro)
  const puedeAvanzar1 = !!cpuModelo && !!gpuModelo
  const puedeAvanzar2 = !!juegoId
  const bottle = detectarBottleneck(cpuData, gpuData)

  return (
    <div style={{ padding: '24px 16px', maxWidth: 820, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: 0 }}>🔧 Asesor de Upgrades</h1>
        <p style={{ color: C.text2, fontSize: 14, marginTop: 4 }}>Decime qué tenés y qué querés lograr — te digo exactamente qué cambiar.</p>
      </div>

      <StepIndicator paso={paso} total={4} />
      <div style={{ textAlign: 'center', fontSize: 13, color: C.gray, marginBottom: 20, fontWeight: 600 }}>
        Paso {paso} de 4: {PASO_LABELS[paso - 1]}
      </div>

      {/* ── PASO 1 ─────────────────────────────────────────────────────────── */}
      {paso === 1 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* CPU + GPU */}
            <div style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.grayBorder}` }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: C.primary }}>⚙️ Procesador y Gráfica</h3>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>CPU actual *</label>
                <select value={cpuModelo} onChange={e => setCpuModelo(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: `1.5px solid ${!cpuModelo ? C.red : C.grayBorder}`, fontSize: 14, background: '#fff', color: C.text }}>
                  <option value="">— Seleccioná tu CPU —</option>
                  {['AM4', 'AM5', 'LGA1700', 'LGA1200', 'LGA1151'].map(plat => (
                    <optgroup key={plat} label={`AMD ${plat.startsWith('AM') ? plat : ''} ${!plat.startsWith('AM') ? '/ Intel ' + plat : ''}`}>
                      {CPUS.filter(c => c.plataforma === plat).map(c => (
                        <option key={c.modelo} value={c.modelo}>{c.modelo}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {cpuData && (
                  <div style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>
                    Gaming score: {cpuData.scoreGaming}/100 · {cpuData.plataforma} · {cpuData.ram} · {cpuData.tdp}W TDP
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>GPU actual *</label>
                <select value={gpuModelo} onChange={e => setGpuModelo(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: `1.5px solid ${!gpuModelo ? C.red : C.grayBorder}`, fontSize: 14, background: '#fff', color: C.text }}>
                  <option value="">— Seleccioná tu GPU —</option>
                  {[
                    { label: 'NVIDIA RTX 5000', fn: g => g.modelo.includes('RTX 5') },
                    { label: 'NVIDIA RTX 4000', fn: g => g.modelo.includes('RTX 4') },
                    { label: 'NVIDIA RTX 3000', fn: g => g.modelo.includes('RTX 3') },
                    { label: 'NVIDIA GTX',      fn: g => g.modelo.includes('GTX') },
                    { label: 'AMD RX 7000',     fn: g => g.modelo.includes('RX 7') },
                    { label: 'AMD RX 6000',     fn: g => g.modelo.includes('RX 6') },
                    { label: 'Sin GPU dedicada',fn: g => g.modelo.includes('Sin GPU') },
                  ].map(({ label, fn }) => (
                    <optgroup key={label} label={label}>
                      {GPUS.filter(fn).map(g => <option key={g.modelo} value={g.modelo}>{g.modelo}</option>)}
                    </optgroup>
                  ))}
                </select>
                {gpuData && gpuData.scoreGaming > 0 && (
                  <div style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>
                    Gaming score: {gpuData.scoreGaming}/100 · {gpuData.vram}GB VRAM · {scoreLabel(gpuData.scoreGaming)}
                  </div>
                )}
              </div>

              {cpuData && gpuData && gpuData.scoreGaming > 0 && (
                <div style={{
                  borderRadius: 8, padding: '8px 12px', fontSize: 12,
                  background: bottle === 'balanceado' ? C.greenBg : C.yellowBg,
                  border: `1px solid ${bottle === 'balanceado' ? C.greenBorder : C.yellowBorder}`,
                  color: bottle === 'balanceado' ? C.green : C.yellow,
                }}>
                  {bottle === 'balanceado' && '✅ CPU y GPU bien balanceados'}
                  {bottle === 'cpu' && `⚠️ CPU bottleneck — el CPU frena a la GPU`}
                  {bottle === 'gpu' && `⚠️ GPU bottleneck — la GPU frena al CPU`}
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <SelectRow label="Resolución de monitor" value={resolucion} onChange={setResolucion}
                  options={RESOLUCIONES.map(r => r.id)} helpText="Afecta cuánta potencia de GPU necesitás" />
              </div>
            </div>

            {/* RAM + Almacenamiento */}
            <div style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.grayBorder}` }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: C.primary }}>🧠 Memoria y Almacenamiento</h3>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>RAM total</label>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {OPCIONES_RAM_GB.map(gb => (
                    <button key={gb} onClick={() => setRamGB(gb)}
                      style={{ padding: '5px 10px', borderRadius: 6, border: `1.5px solid ${ramGB === gb ? C.primary : C.grayBorder}`, background: ramGB === gb ? C.primary : '#fff', color: ramGB === gb ? '#fff' : C.text, cursor: 'pointer', fontSize: 13, fontWeight: ramGB === gb ? 700 : 400 }}>
                      {gb}GB
                    </button>
                  ))}
                </div>
              </div>

              <SelectRow label="Velocidad de RAM" value={ramVel} onChange={setRamVel} options={OPCIONES_RAM_VEL}
                helpText={cpuData?.plataforma === 'AM5' ? 'AM5 usa DDR5 — 6000MHz es el sweet spot' : 'AM4/Intel — 3200–3600MHz es el sweet spot'} />

              <SelectRow label="Módulos de RAM" value={canales} onChange={setCanales} options={OPCIONES_CANALES}
                helpText="Dual channel = 2 módulos = casi el doble de rendimiento de RAM" />

              <SelectRow label="Almacenamiento principal" value={storage} onChange={setStorage} options={OPCIONES_STORAGE} />
            </div>
          </div>

          {/* Refrigeración + Fuente */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.grayBorder}` }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: C.primary }}>❄️ Refrigeración</h3>
              <SelectRow label="Cooler del CPU" value={cooler} onChange={setCooler} options={OPCIONES_COOLER}
                helpText="El cooler determina qué tan fresco corre el CPU bajo carga" />
              <SelectRow label="Ventiladores en el gabinete" value={fans} onChange={setFans} options={OPCIONES_FANS}
                helpText="Más flujo de aire = temperaturas más bajas en toda la PC" />
            </div>
            <div style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.grayBorder}` }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: C.primary }}>🔌 Fuente de poder</h3>
              <SelectRow label="Watts de tu fuente" value={psuOpcion} onChange={setPsuOpcion} options={OPCIONES_PSU}
                helpText="Mirá la etiqueta pegada en la fuente, adentro del gabinete" />
              <div style={{ fontSize: 11, color: C.gray, lineHeight: 1.7, marginTop: 4 }}>
                Referencia rápida:<br />
                GTX 1650 ~300W · RTX 4060 ~550W · RTX 5070 ~650W
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
            {!puedeAvanzar1 && <span style={{ fontSize: 12, color: C.red }}>Seleccioná CPU y GPU para continuar</span>}
            <button onClick={() => puedeAvanzar1 && setPaso(2)} disabled={!puedeAvanzar1}
              style={{ padding: '10px 28px', background: puedeAvanzar1 ? C.primary : '#9ca3af', color: '#fff', border: 'none', borderRadius: 8, cursor: puedeAvanzar1 ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: 15 }}>
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* ── PASO 2 ─────────────────────────────────────────────────────────── */}
      {paso === 2 && (
        <div>
          <div style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.grayBorder}` }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: C.primary }}>¿Qué querés jugar o hacer?</h3>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {['Todos', ...CATEGORIAS_JUEGO].map(cat => (
                <button key={cat} onClick={() => setCatFiltro(cat)}
                  style={{ padding: '4px 12px', borderRadius: 20, border: `1.5px solid ${catFiltro === cat ? C.primary : C.grayBorder}`, background: catFiltro === cat ? C.primary : '#fff', color: catFiltro === cat ? '#fff' : C.text, cursor: 'pointer', fontSize: 12, fontWeight: catFiltro === cat ? 700 : 400 }}>
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
              {juegosFiltrados.map(j => (
                <button key={j.id} onClick={() => setJuegoId(j.id)}
                  style={{
                    padding: '12px 10px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                    border: `2px solid ${juegoId === j.id ? C.primary : C.grayBorder}`,
                    background: juegoId === j.id ? C.blueBg : '#fff',
                    outline: 'none',
                  }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{j.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{j.nombre}</div>
                  <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{j.categoria}</div>
                </button>
              ))}
            </div>

            {juego && (
              <div style={{ marginTop: 14, background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: C.blue }}>
                💡 <strong>{juego.nombre}:</strong> {juego.nota}
              </div>
            )}
          </div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setPaso(1)} style={{ padding: '10px 20px', background: '#fff', color: C.text, border: `1.5px solid ${C.grayBorder}`, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>← Atrás</button>
            <button onClick={() => puedeAvanzar2 && setPaso(3)} disabled={!puedeAvanzar2}
              style={{ padding: '10px 28px', background: puedeAvanzar2 ? C.primary : '#9ca3af', color: '#fff', border: 'none', borderRadius: 8, cursor: puedeAvanzar2 ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: 15 }}>
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* ── PASO 3 ─────────────────────────────────────────────────────────── */}
      {paso === 3 && (
        <div>
          <div style={{ background: C.card, borderRadius: 12, padding: 18, border: `1px solid ${C.grayBorder}` }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: C.primary }}>¿A qué nivel querés jugar {juego?.nombre}?</h3>
            <p style={{ fontSize: 13, color: C.gray, marginTop: 0, marginBottom: 16 }}>Los checks verdes indican que tu PC actual ya cumple con ese requerimiento.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {NIVELES.map(n => {
                const req = juego ? reqEfectivo(juego, n.id, resolucion) : null
                const cpuOk = !req || getCPUScore(cpuData) >= req.cpu
                const gpuOk = !req || getGPUScore(gpuData) >= req.gpu
                const ramOk = !req || ramGB >= req.ram
                const todoOk = cpuOk && gpuOk && ramOk

                return (
                  <button key={n.id} onClick={() => setNivelId(n.id)}
                    style={{
                      padding: '16px 14px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
                      border: `2.5px solid ${nivelId === n.id ? C.primary : C.grayBorder}`,
                      background: nivelId === n.id ? C.blueBg : '#fff',
                      outline: 'none',
                    }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{n.emoji}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{n.label}</div>
                    <div style={{ fontSize: 12, color: C.text2, marginTop: 2, marginBottom: 4 }}>{n.desc}</div>
                    <div style={{ fontSize: 12, color: C.gray, fontStyle: 'italic', marginBottom: 8 }}>{n.fps}</div>
                    {req && (
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        <span style={{ background: cpuOk ? C.greenBg : C.redBg, color: cpuOk ? C.green : C.red, padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                          CPU {cpuOk ? '✓' : '✗'}
                        </span>
                        <span style={{ background: gpuOk ? C.greenBg : C.redBg, color: gpuOk ? C.green : C.red, padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                          GPU {gpuOk ? '✓' : '✗'}
                        </span>
                        <span style={{ background: ramOk ? C.greenBg : C.redBg, color: ramOk ? C.green : C.red, padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                          RAM {ramOk ? '✓' : '✗'}
                        </span>
                        {todoOk && <span style={{ background: C.greenBg, color: C.green, padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Ya llegás 🎉</span>}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setPaso(2)} style={{ padding: '10px 20px', background: '#fff', color: C.text, border: `1.5px solid ${C.grayBorder}`, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>← Atrás</button>
            <button onClick={() => setPaso(4)}
              style={{ padding: '10px 28px', background: C.primary, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
              Ver recomendaciones →
            </button>
          </div>
        </div>
      )}

      {/* ── PASO 4: Resultados ─────────────────────────────────────────────── */}
      {paso === 4 && (
        <div>
          {/* Header resumen */}
          <div style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.grayBorder}`, marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 24 }}>{juego?.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{juego?.nombre} — {nivel?.label} ({nivel?.fps ?? ''})</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>
                {cpuData?.modelo} + {gpuData?.modelo} · {ramGB}GB {ramVel} · {storage} · {resolucion.toUpperCase()}
              </div>
            </div>
            <button onClick={() => setPaso(1)}
              style={{ padding: '5px 12px', background: '#fff', border: `1px solid ${C.grayBorder}`, borderRadius: 6, cursor: 'pointer', fontSize: 12, color: C.text }}>
              ✏️ Editar
            </button>
          </div>

          {/* Badges de urgencia */}
          {recomendaciones.length > 0 && (() => {
            const nCriticos = recomendaciones.filter(r => r.urgencia === 'critico').length
            const nRec = recomendaciones.filter(r => r.urgencia === 'recomendado').length
            const nMejora = recomendaciones.filter(r => r.urgencia === 'mejora').length
            return (
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                {nCriticos > 0 && <span style={{ background: C.redBg, color: C.red, border: `1px solid ${C.redBorder}`, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>🔴 {nCriticos} prioritario{nCriticos > 1 ? 's' : ''}</span>}
                {nRec > 0 && <span style={{ background: C.yellowBg, color: C.yellow, border: `1px solid ${C.yellowBorder}`, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>🟡 {nRec} recomendado{nRec > 1 ? 's' : ''}</span>}
                {nMejora > 0 && <span style={{ background: C.greenBg, color: C.green, border: `1px solid ${C.greenBorder}`, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>🟢 {nMejora} mejora{nMejora > 1 ? 's' : ''} extra</span>}
              </div>
            )
          })()}

          {recomendaciones.map((rec, i) => <TarjetaRec key={rec.id} rec={rec} idx={i} />)}

          <div style={{ marginTop: 16, background: C.grayBg, border: `1px solid ${C.grayBorder}`, borderRadius: 8, padding: '10px 14px', fontSize: 12, color: C.gray }}>
            💡 Las recomendaciones son orientativas y se basan en benchmarks promedio. Consultá el catálogo para ver precios actualizados de los componentes.
          </div>

          <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'space-between' }}>
            <button onClick={() => setPaso(3)} style={{ padding: '10px 20px', background: '#fff', color: C.text, border: `1.5px solid ${C.grayBorder}`, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>← Cambiar nivel</button>
            <button onClick={() => { setPaso(1); setCpuModelo(''); setGpuModelo(''); setJuegoId('') }}
              style={{ padding: '10px 20px', background: C.primary, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
              🔄 Nueva consulta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
