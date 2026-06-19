import { v4 as uuid } from 'uuid'

// SKUs verificados directamente en cyberpuerta.mx — junio 2026
// Precios se actualizan automáticamente al abrir la app

export const COMPONENTES_SEMILLA = [

  // ── CPU AMD AM4 ──────────────────────────────────────────
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 5 5600GT', sku: '100-100001488BOX', precio: 0, tienda: '', notas: 'AM4 — iGPU integrado, incluye disipador' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 5 5600X', sku: '100-100000065BOX', precio: 0, tienda: '', notas: 'AM4 — calidad/precio, incluye disipador' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 7 5700', sku: '100-100000743BOX', precio: 0, tienda: '', notas: 'AM4 — 8 núcleos con disipador' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 7 5700X', sku: '100-100000926WOF', precio: 0, tienda: '', notas: 'AM4 — 8 núcleos sin disipador' },

  // ── CPU AMD AM5 ──────────────────────────────────────────
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 5 7600', sku: '100-100001015BOX', precio: 0, tienda: '', notas: 'AM5 — entrada, incluye disipador' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 5 8500G', sku: '100-100000931BOX', precio: 0, tienda: '', notas: 'AM5 — iGPU integrado' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 5 8600G', sku: '100-100001237BOX', precio: 0, tienda: '', notas: 'AM5 — iGPU Radeon 760M' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 5 9600X', sku: '100-100001405WOF', precio: 0, tienda: '', notas: 'AM5 — calidad/precio actual' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 7 7800X3D', sku: '100-100000910WOF', precio: 0, tienda: '', notas: 'AM5 — gaming con 3D V-Cache' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 7 9700X', sku: '100-100001404WOF', precio: 0, tienda: '', notas: 'AM5 — media-alta' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 7 9800X3D', sku: '100-100001084WOF', precio: 0, tienda: '', notas: 'AM5 — top gaming absoluto' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 9 9950X3D', sku: '100-100000719WOF', precio: 0, tienda: '', notas: 'AM5 — workstation + gaming' },

  // ── CPU Intel ────────────────────────────────────────────
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i5-12400F', sku: 'CM8071504650608', precio: 0, tienda: '', notas: 'LGA1700 DDR4 — sin iGPU' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i5-13400F', sku: 'CM8071504821705', precio: 0, tienda: '', notas: 'LGA1700 — 10 núcleos sin iGPU' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i5-14400F', sku: 'CM8071505093010', precio: 0, tienda: '', notas: 'LGA1700 — media sin iGPU' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i7-14700K', sku: 'CM8071504820805', precio: 0, tienda: '', notas: 'LGA1700 — 20 núcleos alta gama' },

  // ── GPU NVIDIA RTX 5060 ──────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060', nombre: 'ASUS DUAL RTX 5060 OC 8GB', sku: 'DUAL-RTX5060-O8G', precio: 0, tienda: '', notas: '1080p DLSS4 — 2 ventiladores' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060', nombre: 'MSI RTX 5060 VENTUS 2X OC 8GB', sku: 'GEFORCERTX50608GVENTUS2XOC', precio: 0, tienda: '', notas: '1080p DLSS4 — MSI' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060', nombre: 'Zotac RTX 5060 Twin Edge OC 8GB', sku: 'ZT-B50600H-10M', precio: 0, tienda: '', notas: '1080p DLSS4 — económica' },

  // ── GPU NVIDIA RTX 5060 Ti ───────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060 Ti', nombre: 'ASUS DUAL RTX 5060 Ti OC 16GB', sku: 'DUAL-RTX5060TI-O16G', precio: 0, tienda: '', notas: '1440p DLSS4 — ASUS 16GB' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060 Ti', nombre: 'Gigabyte RTX 5060 Ti WINDFORCE OC 8GB', sku: 'GV-N506TWF2OC-8GD', precio: 0, tienda: '', notas: '1440p DLSS4 — Gigabyte' },

  // ── GPU NVIDIA RTX 5070 ──────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070', nombre: 'MSI RTX 5070 VENTUS 2X OC 12GB', sku: 'G5070-12V2C-ROW', precio: 0, tienda: '', notas: '1440p/4K DLSS4 — MSI' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070', nombre: 'ASUS RTX 5070 Prime 12GB', sku: '90YV0M11-M0AA00', precio: 0, tienda: '', notas: '1440p/4K DLSS4 — ASUS' },

  // ── GPU NVIDIA RTX 5070 Ti ───────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070 Ti', nombre: 'Gigabyte RTX 5070 Ti Gaming OC 16GB', sku: 'GV-N507TGAMING OC-16GD', precio: 0, tienda: '', notas: '4K DLSS4 — Gigabyte' },

  // ── GPU AMD RX 7600 ──────────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RX 7600', nombre: 'Sapphire RX 7600 PULSE 8GB', sku: '11324-01-20G', precio: 0, tienda: '', notas: '1080p — económica AMD' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 7600', nombre: 'ASUS RX 7600 EVO OC 8GB', sku: '90YV0LD0-MVAA00', precio: 0, tienda: '', notas: '1080p — ASUS' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 7600', nombre: 'Gigabyte RX 7600 Gaming OC 8GB', sku: 'GV-R76GAMING OC-8GD', precio: 0, tienda: '', notas: '1080p — Gigabyte' },

  // ── GPU AMD RX 9070 XT ───────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RX 9070 XT', nombre: 'ASUS RX 9070 XT Prime OC 16GB', sku: '90YV0L71-M0AA00', precio: 0, tienda: '', notas: '1440p/4K — AMD RDNA4' },

  // ── RAM DDR4 ─────────────────────────────────────────────
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 16GB', nombre: 'Kingston FURY Beast DDR4 16GB (2x8) 3200MHz', sku: 'KF432C16BBK2/16', precio: 0, tienda: '', notas: 'dual channel — lo más vendido' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 16GB', nombre: 'Corsair Vengeance LPX DDR4 16GB (2x8) 3200MHz', sku: 'CMK16GX4M2B3200C16', precio: 0, tienda: '', notas: 'dual channel perfil bajo' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 32GB', nombre: 'Kingston FURY Beast DDR4 32GB (2x16) 3200MHz', sku: 'KF432C16BBK2/32', precio: 0, tienda: '', notas: 'dual channel 32GB' },

  // ── RAM DDR5 ─────────────────────────────────────────────
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 32GB', nombre: 'Kingston FURY Beast DDR5 32GB (2x16) 6000MHz', sku: 'KF560C36BBEK2-32', precio: 0, tienda: '', notas: 'AM5 — punto dulce DDR5' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 32GB', nombre: 'Corsair Vengeance DDR5 32GB (2x16) 6000MHz', sku: 'CMK32GX5M2E6000C36', precio: 0, tienda: '', notas: 'AM5 — Corsair DDR5' },

  // ── SSD M.2 NVMe ─────────────────────────────────────────
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 500GB', nombre: 'Kingston NV2 NVMe 500GB', sku: 'SNV2S/500G', precio: 0, tienda: '', notas: 'PCIe 4.0 — entrada económica' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Kingston NV2 NVMe 1TB', sku: 'SNV2S/1000G', precio: 0, tienda: '', notas: 'PCIe 4.0 — lo más vendido' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Kingston SNV3S NVMe 1TB', sku: 'SNV3S/1000G', precio: 0, tienda: '', notas: 'PCIe 4.0 6000MB/s' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'WD Green SN350 NVMe 1TB', sku: 'WDS100T2G0C', precio: 0, tienda: '', notas: 'PCIe 3.0 — económico' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Crucial P3 Plus NVMe 1TB', sku: 'CT1000P3PSSD8', precio: 0, tienda: '', notas: 'PCIe 4.0 — precio competitivo' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 2TB', nombre: 'Kingston SNV3S NVMe 2TB', sku: 'SNV3S/2000G', precio: 0, tienda: '', notas: 'PCIe 4.0 6000MB/s 2TB' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 2TB', nombre: 'WD Black SN850X NVMe 2TB', sku: 'WDS200T2X0E', precio: 0, tienda: '', notas: 'PCIe 4.0 7300MB/s — premium' },

  // ── Motherboard AM4 ──────────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'ASUS ROG STRIX B550-F GAMING WIFI', sku: '90MB14F0-M0AAY0', precio: 0, tienda: '', notas: 'AM4 DDR4 — gama media-alta' },

  // ── Motherboard AM5 ──────────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'MSI B650 GAMING PLUS WIFI', sku: 'B650 GAMING PLUS WIFI', precio: 0, tienda: '', notas: 'AM5 DDR5 — popular gama media' },

  // ── PSU ──────────────────────────────────────────────────
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'Corsair CV650 80+ Bronze 650W', sku: 'CP-9020236-WW', precio: 0, tienda: '', notas: '650W — económica confiable' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'MSI MAG A650GN II 80+ Gold 650W', sku: 'CP-MSI-MAGA650GNII', precio: 0, tienda: '', notas: '650W Gold modular' },
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'Gigabyte UD750GM 80+ Gold 750W', sku: 'CP-GIGABYTE-GP-UD750GM', precio: 0, tienda: '', notas: '750W Gold modular' },
  { id: uuid(), categoria: 'PSU', grupo: '850W', nombre: 'MSI MAG A850GLS PCIE5 80+ Gold 850W', sku: 'CP-MSI-MAGA850GLSPCIE5', precio: 0, tienda: '', notas: '850W Gold — para RTX 5070+' },

]
