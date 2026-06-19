// ─── CPUs ───────────────────────────────────────────────────────────────────
// scoreGaming / scoreProd: 1–100
export const CPUS = [
  // AMD AM4
  { modelo: 'Ryzen 3 3100',    plataforma: 'AM4', ram: 'DDR4', scoreGaming: 44, scoreProd: 40, tdp: 65  },
  { modelo: 'Ryzen 3 3300X',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 47, scoreProd: 44, tdp: 65  },
  { modelo: 'Ryzen 5 2600',    plataforma: 'AM4', ram: 'DDR4', scoreGaming: 48, scoreProd: 50, tdp: 65  },
  { modelo: 'Ryzen 5 3600',    plataforma: 'AM4', ram: 'DDR4', scoreGaming: 58, scoreProd: 58, tdp: 65  },
  { modelo: 'Ryzen 5 5500',    plataforma: 'AM4', ram: 'DDR4', scoreGaming: 65, scoreProd: 63, tdp: 65  },
  { modelo: 'Ryzen 5 5600',    plataforma: 'AM4', ram: 'DDR4', scoreGaming: 72, scoreProd: 70, tdp: 65  },
  { modelo: 'Ryzen 5 5600X',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 74, scoreProd: 72, tdp: 65  },
  { modelo: 'Ryzen 5 5600G',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 65, scoreProd: 64, tdp: 65, iGPU: true },
  { modelo: 'Ryzen 7 5700G',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 72, scoreProd: 76, tdp: 65, iGPU: true },
  { modelo: 'Ryzen 7 5700X',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 79, scoreProd: 80, tdp: 65  },
  { modelo: 'Ryzen 7 5800X',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 82, scoreProd: 84, tdp: 105 },
  { modelo: 'Ryzen 7 5700X3D', plataforma: 'AM4', ram: 'DDR4', scoreGaming: 91, scoreProd: 82, tdp: 105 },
  { modelo: 'Ryzen 7 5800X3D', plataforma: 'AM4', ram: 'DDR4', scoreGaming: 95, scoreProd: 85, tdp: 105 },
  { modelo: 'Ryzen 9 5900X',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 84, scoreProd: 92, tdp: 105 },
  { modelo: 'Ryzen 9 5950X',   plataforma: 'AM4', ram: 'DDR4', scoreGaming: 85, scoreProd: 98, tdp: 105 },
  // AMD AM5
  { modelo: 'Ryzen 5 7600',    plataforma: 'AM5', ram: 'DDR5', scoreGaming: 84, scoreProd: 80, tdp: 65  },
  { modelo: 'Ryzen 5 7600X',   plataforma: 'AM5', ram: 'DDR5', scoreGaming: 86, scoreProd: 82, tdp: 105 },
  { modelo: 'Ryzen 5 9600X',   plataforma: 'AM5', ram: 'DDR5', scoreGaming: 90, scoreProd: 86, tdp: 65  },
  { modelo: 'Ryzen 7 7700X',   plataforma: 'AM5', ram: 'DDR5', scoreGaming: 90, scoreProd: 90, tdp: 105 },
  { modelo: 'Ryzen 7 9700X',   plataforma: 'AM5', ram: 'DDR5', scoreGaming: 93, scoreProd: 93, tdp: 65  },
  { modelo: 'Ryzen 9 7900X',   plataforma: 'AM5', ram: 'DDR5', scoreGaming: 91, scoreProd: 97, tdp: 170 },
  { modelo: 'Ryzen 9 9900X',   plataforma: 'AM5', ram: 'DDR5', scoreGaming: 94, scoreProd: 98, tdp: 120 },
  // Intel LGA1700
  { modelo: 'Core i3-12100F',  plataforma: 'LGA1700', ram: 'DDR4', scoreGaming: 62, scoreProd: 58, tdp: 58  },
  { modelo: 'Core i5-12400F',  plataforma: 'LGA1700', ram: 'DDR4', scoreGaming: 74, scoreProd: 72, tdp: 65  },
  { modelo: 'Core i5-13400F',  plataforma: 'LGA1700', ram: 'DDR4', scoreGaming: 78, scoreProd: 76, tdp: 65  },
  { modelo: 'Core i5-12600K',  plataforma: 'LGA1700', ram: 'DDR4', scoreGaming: 80, scoreProd: 80, tdp: 125 },
  { modelo: 'Core i5-13600K',  plataforma: 'LGA1700', ram: 'DDR4', scoreGaming: 86, scoreProd: 86, tdp: 125 },
  { modelo: 'Core i7-12700K',  plataforma: 'LGA1700', ram: 'DDR4', scoreGaming: 88, scoreProd: 90, tdp: 125 },
  { modelo: 'Core i7-13700K',  plataforma: 'LGA1700', ram: 'DDR4', scoreGaming: 90, scoreProd: 94, tdp: 125 },
  // Intel antiguas
  { modelo: 'Core i5-10400F',  plataforma: 'LGA1200', ram: 'DDR4', scoreGaming: 62, scoreProd: 60, tdp: 65  },
  { modelo: 'Core i5-9400F',   plataforma: 'LGA1151', ram: 'DDR4', scoreGaming: 52, scoreProd: 50, tdp: 65  },
  { modelo: 'Core i7-8700K',   plataforma: 'LGA1151', ram: 'DDR4', scoreGaming: 60, scoreProd: 68, tdp: 95  },
]

// ─── GPUs ────────────────────────────────────────────────────────────────────
export const GPUS = [
  // RTX 5000 (gen actual)
  { modelo: 'RTX 5060',        scoreGaming: 74, psuMin: 550, vram: 8  },
  { modelo: 'RTX 5060 Ti',     scoreGaming: 82, psuMin: 600, vram: 16 },
  { modelo: 'RTX 5070',        scoreGaming: 91, psuMin: 650, vram: 12 },
  { modelo: 'RTX 5070 Ti',     scoreGaming: 95, psuMin: 700, vram: 16 },
  // RTX 4000
  { modelo: 'RTX 4060',        scoreGaming: 68, psuMin: 550, vram: 8  },
  { modelo: 'RTX 4060 Ti',     scoreGaming: 76, psuMin: 600, vram: 8  },
  { modelo: 'RTX 4070',        scoreGaming: 87, psuMin: 650, vram: 12 },
  { modelo: 'RTX 4070 Super',  scoreGaming: 92, psuMin: 700, vram: 12 },
  { modelo: 'RTX 4070 Ti',     scoreGaming: 94, psuMin: 700, vram: 12 },
  { modelo: 'RTX 4080',        scoreGaming: 97, psuMin: 750, vram: 16 },
  // RTX 3000
  { modelo: 'RTX 3060 12GB',   scoreGaming: 65, psuMin: 550, vram: 12 },
  { modelo: 'RTX 3060 Ti',     scoreGaming: 74, psuMin: 600, vram: 8  },
  { modelo: 'RTX 3070',        scoreGaming: 82, psuMin: 650, vram: 8  },
  { modelo: 'RTX 3070 Ti',     scoreGaming: 86, psuMin: 700, vram: 8  },
  { modelo: 'RTX 3080',        scoreGaming: 91, psuMin: 750, vram: 10 },
  // GTX (usadas/entrada)
  { modelo: 'GTX 1660 Ti',     scoreGaming: 50, psuMin: 450, vram: 6  },
  { modelo: 'GTX 1660 Super',  scoreGaming: 48, psuMin: 450, vram: 6  },
  { modelo: 'GTX 1660',        scoreGaming: 44, psuMin: 450, vram: 6  },
  { modelo: 'GTX 1650 Super',  scoreGaming: 40, psuMin: 400, vram: 4  },
  { modelo: 'GTX 1650',        scoreGaming: 33, psuMin: 350, vram: 4  },
  { modelo: 'GTX 1060 6GB',    scoreGaming: 36, psuMin: 400, vram: 6  },
  { modelo: 'GTX 1050 Ti',     scoreGaming: 28, psuMin: 300, vram: 4  },
  // AMD RX 7000
  { modelo: 'RX 7900 GRE',     scoreGaming: 91, psuMin: 700, vram: 16 },
  { modelo: 'RX 7800 XT',      scoreGaming: 85, psuMin: 650, vram: 16 },
  { modelo: 'RX 7700 XT',      scoreGaming: 78, psuMin: 600, vram: 12 },
  { modelo: 'RX 7600 XT',      scoreGaming: 70, psuMin: 550, vram: 16 },
  { modelo: 'RX 7600',         scoreGaming: 66, psuMin: 550, vram: 8  },
  // AMD RX 6000
  { modelo: 'RX 6800 XT',      scoreGaming: 88, psuMin: 650, vram: 16 },
  { modelo: 'RX 6700 XT',      scoreGaming: 76, psuMin: 600, vram: 12 },
  { modelo: 'RX 6650 XT',      scoreGaming: 69, psuMin: 550, vram: 8  },
  { modelo: 'RX 6600',         scoreGaming: 62, psuMin: 500, vram: 8  },
  { modelo: 'Sin GPU dedicada',scoreGaming: 10, psuMin: 0,   vram: 0  },
]

// ─── Juegos y usos ──────────────────────────────────────────────────────────
// cpuMin / gpuMin por nivel: minimo, comodo (60fps), fluido (144fps), ultra
export const JUEGOS = [
  // ── Esports / competitivos ──
  {
    id: 'valorant', nombre: 'Valorant', emoji: '🔫', categoria: 'Esports',
    nota: 'Muy optimizado, enfocado en CPU. Con buena RAM dual-channel ya se nota.',
    reqs: { minimo: { cpu: 35, gpu: 20, ram: 8 }, comodo: { cpu: 50, gpu: 35, ram: 16 }, fluido: { cpu: 65, gpu: 50, ram: 16 }, ultra: { cpu: 75, gpu: 65, ram: 32 } },
  },
  {
    id: 'cs2', nombre: 'Counter-Strike 2', emoji: '💣', categoria: 'Esports',
    nota: 'Muy dependiente del CPU. Ryzen 5000 o Intel 12th gen en adelante para 144fps estables.',
    reqs: { minimo: { cpu: 45, gpu: 28, ram: 8 }, comodo: { cpu: 62, gpu: 45, ram: 16 }, fluido: { cpu: 72, gpu: 58, ram: 16 }, ultra: { cpu: 82, gpu: 72, ram: 32 } },
  },
  {
    id: 'lol', nombre: 'League of Legends', emoji: '⚔️', categoria: 'Esports',
    nota: 'Corre en casi cualquier PC moderna. El límite suele ser el monitor, no la PC.',
    reqs: { minimo: { cpu: 28, gpu: 18, ram: 8 }, comodo: { cpu: 40, gpu: 28, ram: 8 }, fluido: { cpu: 52, gpu: 40, ram: 16 }, ultra: { cpu: 62, gpu: 52, ram: 16 } },
  },
  {
    id: 'fortnite', nombre: 'Fortnite', emoji: '🏗️', categoria: 'Battle Royale',
    nota: 'Con Unreal Engine 5 (capítulo 5+) los requerimientos subieron bastante. VRAM importante.',
    reqs: { minimo: { cpu: 50, gpu: 35, ram: 8 }, comodo: { cpu: 65, gpu: 55, ram: 16 }, fluido: { cpu: 75, gpu: 68, ram: 16 }, ultra: { cpu: 82, gpu: 82, ram: 32 } },
  },
  {
    id: 'warzone', nombre: 'Call of Duty: Warzone', emoji: '🪖', categoria: 'Battle Royale',
    nota: 'Consume mucha VRAM (mínimo 8GB recomendado). Optimización irregular, puede trabarse con poco RAM.',
    reqs: { minimo: { cpu: 55, gpu: 45, ram: 16 }, comodo: { cpu: 68, gpu: 60, ram: 16 }, fluido: { cpu: 78, gpu: 74, ram: 32 }, ultra: { cpu: 85, gpu: 88, ram: 32 } },
  },
  {
    id: 'apexlegends', nombre: 'Apex Legends', emoji: '🚀', categoria: 'Battle Royale',
    nota: 'Bien optimizado. Dual-channel RAM hace diferencia notoria en CPU usage.',
    reqs: { minimo: { cpu: 48, gpu: 35, ram: 8 }, comodo: { cpu: 62, gpu: 52, ram: 16 }, fluido: { cpu: 72, gpu: 65, ram: 16 }, ultra: { cpu: 80, gpu: 78, ram: 32 } },
  },
  {
    id: 'freeFire', nombre: 'Free Fire', emoji: '🔥', categoria: 'Esports',
    nota: 'Diseñado para hardware modesto. Cualquier PC moderna lo mueve a 144fps sin problema.',
    reqs: { minimo: { cpu: 22, gpu: 15, ram: 4 }, comodo: { cpu: 32, gpu: 22, ram: 8 }, fluido: { cpu: 42, gpu: 32, ram: 8 }, ultra: { cpu: 52, gpu: 42, ram: 16 } },
  },
  // ── Open World / AAA ──
  {
    id: 'gtav', nombre: 'GTA V', emoji: '🚗', categoria: 'Open World',
    nota: 'Juego viejo pero muy popular. No exige mucho, ideal para PCs de entrada.',
    reqs: { minimo: { cpu: 40, gpu: 28, ram: 8 }, comodo: { cpu: 55, gpu: 42, ram: 16 }, fluido: { cpu: 65, gpu: 58, ram: 16 }, ultra: { cpu: 72, gpu: 70, ram: 32 } },
  },
  {
    id: 'gtavi', nombre: 'GTA VI', emoji: '🌴', categoria: 'Open World',
    nota: 'Se espera que sea el juego más exigente del momento. Requiere hardware moderno.',
    reqs: { minimo: { cpu: 72, gpu: 68, ram: 16 }, comodo: { cpu: 82, gpu: 80, ram: 16 }, fluido: { cpu: 88, gpu: 90, ram: 32 }, ultra: { cpu: 94, gpu: 97, ram: 32 } },
  },
  {
    id: 'rdr2', nombre: 'Red Dead Redemption 2', emoji: '🤠', categoria: 'Open World',
    nota: 'Visualmente hermoso pero muy exigente. VRAM crítica en ultra (mínimo 8GB).',
    reqs: { minimo: { cpu: 55, gpu: 45, ram: 12 }, comodo: { cpu: 68, gpu: 62, ram: 16 }, fluido: { cpu: 78, gpu: 76, ram: 16 }, ultra: { cpu: 85, gpu: 88, ram: 32 } },
  },
  {
    id: 'cyberpunk', nombre: 'Cyberpunk 2077', emoji: '🤖', categoria: 'Open World',
    nota: 'Con ray tracing y path tracing necesita GPU de alta gama. Sin RT corre bien en mid-range.',
    reqs: { minimo: { cpu: 58, gpu: 52, ram: 12 }, comodo: { cpu: 70, gpu: 66, ram: 16 }, fluido: { cpu: 80, gpu: 80, ram: 16 }, ultra: { cpu: 88, gpu: 94, ram: 32 } },
  },
  {
    id: 'eldenring', nombre: 'Elden Ring', emoji: '⚔️', categoria: 'Open World',
    nota: 'Port de PC mejorado. Bien optimizado, no exige tanto como aparenta visualmente.',
    reqs: { minimo: { cpu: 52, gpu: 42, ram: 12 }, comodo: { cpu: 64, gpu: 58, ram: 16 }, fluido: { cpu: 74, gpu: 70, ram: 16 }, ultra: { cpu: 82, gpu: 82, ram: 32 } },
  },
  {
    id: 'hogwarts', nombre: 'Hogwarts Legacy', emoji: '🧙', categoria: 'Open World',
    nota: 'Uno de los juegos más exigentes. Con 8GB VRAM ya se queda corto en ultra.',
    reqs: { minimo: { cpu: 60, gpu: 56, ram: 16 }, comodo: { cpu: 72, gpu: 68, ram: 16 }, fluido: { cpu: 82, gpu: 80, ram: 32 }, ultra: { cpu: 88, gpu: 92, ram: 32 } },
  },
  {
    id: 'minecraft', nombre: 'Minecraft (con shaders)', emoji: '⛏️', categoria: 'Sandbox',
    nota: 'Sin shaders corre en cualquier cosa. Con Optifine + shaders depende mucho del CPU y RAM.',
    reqs: { minimo: { cpu: 30, gpu: 20, ram: 8 }, comodo: { cpu: 55, gpu: 45, ram: 16 }, fluido: { cpu: 68, gpu: 60, ram: 16 }, ultra: { cpu: 78, gpu: 74, ram: 32 } },
  },
  {
    id: 'battlefield6', nombre: 'Battlefield 6', emoji: '💥', categoria: 'FPS',
    nota: 'Se espera destrucción de escenarios avanzada. CPU con muchos núcleos va a marcar diferencia.',
    reqs: { minimo: { cpu: 68, gpu: 65, ram: 16 }, comodo: { cpu: 78, gpu: 76, ram: 16 }, fluido: { cpu: 86, gpu: 88, ram: 32 }, ultra: { cpu: 92, gpu: 95, ram: 32 } },
  },
  {
    id: 'fc25', nombre: 'EA FC 25 / FIFA', emoji: '⚽', categoria: 'Deportes',
    nota: 'No es muy exigente. CPU importa más que GPU para física del juego.',
    reqs: { minimo: { cpu: 42, gpu: 32, ram: 8 }, comodo: { cpu: 55, gpu: 45, ram: 16 }, fluido: { cpu: 65, gpu: 56, ram: 16 }, ultra: { cpu: 74, gpu: 66, ram: 32 } },
  },
  {
    id: 'f124', nombre: 'F1 24', emoji: '🏎️', categoria: 'Deportes',
    nota: 'Bien optimizado. GPU importa más para resolución alta. CPU para físicas en 1440p+.',
    reqs: { minimo: { cpu: 50, gpu: 42, ram: 8 }, comodo: { cpu: 62, gpu: 58, ram: 16 }, fluido: { cpu: 72, gpu: 70, ram: 16 }, ultra: { cpu: 82, gpu: 82, ram: 32 } },
  },
  {
    id: 'roblox', nombre: 'Roblox', emoji: '🟥', categoria: 'Casual',
    nota: 'Corre en casi cualquier hardware. Si lagguea, el problema probablemente es internet o RAM baja.',
    reqs: { minimo: { cpu: 20, gpu: 12, ram: 4 }, comodo: { cpu: 30, gpu: 20, ram: 8 }, fluido: { cpu: 40, gpu: 30, ram: 8 }, ultra: { cpu: 50, gpu: 40, ram: 16 } },
  },
  // ── Usos no-gaming ──
  {
    id: 'oficina', nombre: 'Trabajo / Oficina', emoji: '💼', categoria: 'Productividad',
    nota: 'Office, navegador, videollamadas, PDFs. RAM y SSD hacen la mayor diferencia.',
    reqs: { minimo: { cpu: 28, gpu: 0, ram: 8 }, comodo: { cpu: 42, gpu: 0, ram: 16 }, fluido: { cpu: 55, gpu: 0, ram: 16 }, ultra: { cpu: 65, gpu: 0, ram: 32 } },
  },
  {
    id: 'edicionVideo', nombre: 'Edición de video', emoji: '🎬', categoria: 'Productividad',
    nota: 'CPU con muchos núcleos + RAM 32GB + SSD NVMe es la combinación ideal. GPU ayuda con GPU-rendering.',
    reqs: { minimo: { cpu: 55, gpu: 38, ram: 16 }, comodo: { cpu: 70, gpu: 55, ram: 32 }, fluido: { cpu: 82, gpu: 68, ram: 32 }, ultra: { cpu: 92, gpu: 80, ram: 64 } },
  },
  {
    id: 'diseño3d', nombre: 'Diseño 3D / Blender', emoji: '🎨', categoria: 'Productividad',
    nota: 'GPU CUDA (NVIDIA) acelera el render enormemente. RAM abundante para escenas complejas.',
    reqs: { minimo: { cpu: 58, gpu: 45, ram: 16 }, comodo: { cpu: 72, gpu: 62, ram: 32 }, fluido: { cpu: 84, gpu: 76, ram: 32 }, ultra: { cpu: 94, gpu: 92, ram: 64 } },
  },
  {
    id: 'streaming', nombre: 'Streaming solamente (OBS)', emoji: '🎙️', categoria: 'Productividad',
    nota: 'Encodear con NVENC (NVIDIA) libera al CPU para otras cosas. CPU potente = stream más estable.',
    reqs: { minimo: { cpu: 60, gpu: 45, ram: 16 }, comodo: { cpu: 72, gpu: 58, ram: 16 }, fluido: { cpu: 82, gpu: 70, ram: 32 }, ultra: { cpu: 90, gpu: 82, ram: 32 } },
  },
  {
    id: 'jugarYstreamear', nombre: 'Jugar y Streamear a la vez', emoji: '🎮🎙️', categoria: 'Productividad',
    nota: 'El escenario más exigente: jugar + encodear video en tiempo real. CPU con 6+ núcleos es clave. NVENC de NVIDIA descarga mucho al CPU.',
    reqs: { minimo: { cpu: 70, gpu: 58, ram: 16 }, comodo: { cpu: 80, gpu: 70, ram: 32 }, fluido: { cpu: 88, gpu: 80, ram: 32 }, ultra: { cpu: 94, gpu: 90, ram: 32 } },
  },
]

// ─── Niveles de rendimiento ──────────────────────────────────────────────────
export const NIVELES = [
  { id: 'minimo',  label: 'Que ande nomás',    desc: 'Jugable, algunos bajones de FPS, settings bajos',    fps: '30–50 FPS',  emoji: '🟡' },
  { id: 'comodo',  label: 'Cómodo',            desc: '60 FPS estables, settings medios/altos sin trabas',   fps: '60 FPS',     emoji: '🟢' },
  { id: 'fluido',  label: 'Fluido y competitivo', desc: '144 FPS o más, ideal para monitores de alta tasa', fps: '144+ FPS',   emoji: '🔵' },
  { id: 'ultra',   label: 'Lo máximo',         desc: 'Ultra settings, 1440p/4K, sin compromisos',           fps: '144+ FPS 4K',emoji: '💜' },
]

// ─── Resoluciones ────────────────────────────────────────────────────────────
export const RESOLUCIONES = [
  { id: '1080p', label: '1080p (Full HD)', gpuMult: 1.0 },
  { id: '1440p', label: '1440p (2K)',      gpuMult: 1.35 },
  { id: '4k',    label: '4K (Ultra HD)',   gpuMult: 1.8  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function detectarBottleneck(cpu, gpu) {
  if (!cpu || !gpu) return null
  const diff = cpu.scoreGaming - gpu.scoreGaming
  if (diff > 22) return 'cpu'
  if (diff < -22) return 'gpu'
  return 'balanceado'
}

export function psuSuficiente(psuWatts, gpu) {
  return !psuWatts || !gpu || psuWatts >= gpu.psuMin
}

export function reqEfectivo(juego, nivel, resolucion) {
  const base = juego.reqs[nivel]
  const mult = RESOLUCIONES.find(r => r.id === resolucion)?.gpuMult || 1
  return {
    cpu: base.cpu,
    gpu: Math.round(base.gpu * mult),
    ram: base.ram,
  }
}
