import { v4 as uuid } from 'uuid'

// Precios sin IVA en MXN — referencia Cyberpuerta.mx junio 2026
// Actualizalos con el botón Editar cuando cambien

export const COMPONENTES_SEMILLA = [

  // ── CPU AMD AM4 ──────────────────────────────────────────
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 3 4100', sku: '100-100000510BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — entrada, 4 núcleos', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 5 5500', sku: '100-100000457BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — entrada/oficina', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 5 5600', sku: '100-100000927BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — calidad-precio rey', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 5 5600X', sku: '100-100000065BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — media, incluye disipador', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 5 5600G', sku: '100-100000252BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — gráficos integrados', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 7 5700G', sku: '100-100000263BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — iGPU potente', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 7 5700X', sku: '100-100000926WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — 8 núcleos sin disipador', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 7 5800X', sku: '100-100000063WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — 8 núcleos alta frecuencia', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 7 5700X3D', sku: '100-100001503WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — gaming con 3D V-Cache', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM4 DDR4', nombre: 'AMD Ryzen 9 5900X', sku: '100-100000061WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM4 DDR4 — 12 núcleos workstation', updatedAt: '2026-06-06' },

  // ── CPU AMD AM5 ──────────────────────────────────────────
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 5 7600', sku: '100-100001015BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — entrada-media', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 5 7600X', sku: '100-100000593WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — media sin disipador', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 5 9600X', sku: '100-100001405WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — calidad-precio actual', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 7 7700', sku: '100-100001335BOX', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — media-alta', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 7 7700X', sku: '100-100000591WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — media-alta sin disipador', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 7 9700X', sku: '100-100001404WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — estrella media-alta', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 7 9800X3D', sku: '100-100001774WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — gaming top absoluto', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 9 7900X', sku: '100-100000589WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — 12 núcleos creación contenido', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 9 9900X', sku: '100-100001561WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — workstation/multitarea', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'AMD AM5 DDR5', nombre: 'AMD Ryzen 9 9950X', sku: '100-100001277WOF', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 DDR5 — 16 núcleos top de gama', updatedAt: '2026-06-06' },

  // ── CPU Intel LGA1700 ────────────────────────────────────
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i3-12100F', sku: 'CM8071504651012', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4 — entrada sin iGPU', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i5-12400F', sku: 'CM8071504650608', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4 — calidad-precio Intel', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i5-13400F', sku: 'CM8071504821705', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4/5 — media sin iGPU', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i5-13600K', sku: 'CM8071504821805', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4/5 — 14 núcleos media-alta', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i5-14400F', sku: 'CM8071505093010', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4/5 — media sin iGPU', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i7-13700K', sku: 'CM8071504820705', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4/5 — 16 núcleos alta gama', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i7-14700K', sku: 'CM8071504820805', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4/5 — 20 núcleos', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'CPU', grupo: 'Intel LGA1700', nombre: 'Intel Core i9-14900K', sku: 'CM8071505094012', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4/5 — 24 núcleos workstation', updatedAt: '2026-06-06' },

  // ── GPU AMD RX 9000 ──────────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RX 9060 XT', nombre: 'ASUS RX 9060 XT DUAL 8GB (2x)', sku: '90YV0MI1-MVAA00', precio: 0, tienda: 'Cyberpuerta', notas: '1080p — 2 ventiladores ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 9060 XT', nombre: 'Gigabyte RX 9060 XT Gaming OC 8GB (3x)', sku: 'GV-R906XTGAMING OC-8GD', precio: 0, tienda: 'Cyberpuerta', notas: '1080p — 3 ventiladores Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 9060 XT', nombre: 'ASUS RX 9060 XT DUAL 16GB (2x)', sku: 'DUAL-RX9060XT-16G', precio: 0, tienda: 'Cyberpuerta', notas: '1080p + VRAM — 2 ventiladores ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 9060 XT', nombre: 'Gigabyte RX 9060 XT Gaming OC 16GB (3x)', sku: 'GV-R906XTGAMING OC-16GD', precio: 0, tienda: 'Cyberpuerta', notas: '1080p + VRAM — 3 ventiladores Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 9070', nombre: 'AMD RX 9070 16GB', sku: '', precio: 0, tienda: '', notas: '1440p versátil — verificar disponibilidad', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 9070 XT', nombre: 'AMD RX 9070 XT 16GB', sku: '', precio: 0, tienda: '', notas: '1440p/4K — verificar disponibilidad', updatedAt: '2026-06-06' },

  // ── GPU AMD RX 7000 ──────────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RX 7600', nombre: 'ASUS DUAL RX 7600 8GB (2x)', sku: 'DUAL-RX7600-8G', precio: 0, tienda: 'Cyberpuerta', notas: '1080p — alternativa económica AMD', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 7700 XT', nombre: 'Gigabyte RX 7700 XT Gaming OC 12GB (3x)', sku: 'GV-R77XTGAMING OC-12GD', precio: 0, tienda: 'Cyberpuerta', notas: '1440p entrada — buen precio/rendimiento', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 7800 XT', nombre: 'Sapphire PULSE RX 7800 XT 16GB', sku: '11330-02-20G', precio: 0, tienda: 'Cyberpuerta', notas: '1440p sólida — 16GB VRAM', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RX 7900 GRE', nombre: 'ASUS DUAL RX 7900 GRE 16GB', sku: 'DUAL-RX7900GRE-16G', precio: 0, tienda: 'Cyberpuerta', notas: '4K entrada / 1440p ultra', updatedAt: '2026-06-06' },

  // ── GPU NVIDIA RTX 5060 ──────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060', nombre: 'MSI RTX 5060 VENTUS 2X OC 8GB (2x)', sku: 'RTX 5060 8G VENTUS 2X OC', precio: 0, tienda: 'Cyberpuerta', notas: '1080p DLSS4 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060', nombre: 'ASUS DUAL RTX 5060 OC 8GB (2x)', sku: 'DUAL-RTX5060-O8G', precio: 0, tienda: 'Cyberpuerta', notas: '1080p DLSS4 — ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060', nombre: 'Gigabyte RTX 5060 Gaming OC 8GB (3x)', sku: 'GV-N5060GAMING OC-8GD', precio: 0, tienda: 'Cyberpuerta', notas: '1080p DLSS4 — Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060', nombre: 'Zotac RTX 5060 Twin Edge OC 8GB (2x)', sku: 'ZT-B50600H-10M', precio: 0, tienda: 'Cyberpuerta', notas: '1080p DLSS4 — Zotac', updatedAt: '2026-06-06' },

  // ── GPU NVIDIA RTX 5060 Ti ───────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060 Ti', nombre: 'MSI RTX 5060 Ti VENTUS 2X 16GB (2x)', sku: 'G506T-16V2CP', precio: 0, tienda: 'Cyberpuerta', notas: '1440p DLSS4 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060 Ti', nombre: 'ASUS DUAL RTX 5060 Ti OC 16GB (2x)', sku: 'DUAL-RTX5060TI-O16G', precio: 0, tienda: 'Cyberpuerta', notas: '1440p DLSS4 — ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060 Ti', nombre: 'Gigabyte RTX 5060 Ti Gaming OC 16GB (3x)', sku: 'GV-N506TGAMING OC-16GD', precio: 0, tienda: 'Cyberpuerta', notas: '1440p DLSS4 — Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5060 Ti', nombre: 'Zotac RTX 5060 Ti Twin Edge OC 16GB (2x)', sku: 'ZT-B50610H-10M', precio: 0, tienda: 'Cyberpuerta', notas: '1440p DLSS4 — Zotac', updatedAt: '2026-06-06' },

  // ── GPU NVIDIA RTX 5070 ──────────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070', nombre: 'MSI RTX 5070 VENTUS 3X OC 12GB (3x)', sku: 'RTX 5070 12G VENTUS 3X OC', precio: 0, tienda: 'Cyberpuerta', notas: '1440p/4K DLSS4 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070', nombre: 'ASUS DUAL RTX 5070 OC 12GB (2x)', sku: 'DUAL-RTX5070-O12G', precio: 0, tienda: 'Cyberpuerta', notas: '1440p/4K DLSS4 — ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070', nombre: 'Gigabyte RTX 5070 Gaming OC 12GB (3x)', sku: 'GV-N5070GAMING OC-12GD', precio: 0, tienda: 'Cyberpuerta', notas: '1440p/4K DLSS4 — Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070', nombre: 'Zotac RTX 5070 Twin Edge OC 12GB (2x)', sku: 'ZT-B50700H-10M', precio: 0, tienda: 'Cyberpuerta', notas: '1440p/4K DLSS4 — Zotac', updatedAt: '2026-06-06' },

  // ── GPU NVIDIA RTX 5070 Ti ───────────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070 Ti', nombre: 'MSI RTX 5070 Ti VENTUS 3X OC 16GB (3x)', sku: 'RTX 5070TI 16G VENTUS 3X OC', precio: 0, tienda: 'Cyberpuerta', notas: '4K DLSS4 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070 Ti', nombre: 'ASUS ROG Strix RTX 5070 Ti OC 16GB (3x)', sku: 'ROG-STRIX-RTX5070TI-O16G', precio: 0, tienda: 'Cyberpuerta', notas: '4K DLSS4 — ASUS ROG', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5070 Ti', nombre: 'Gigabyte RTX 5070 Ti Gaming OC 16GB (3x)', sku: 'GV-N507TGAMING OC-16GD', precio: 0, tienda: 'Cyberpuerta', notas: '4K DLSS4 — Gigabyte', updatedAt: '2026-06-06' },

  // ── GPU NVIDIA RTX 5080 / 5090 ───────────────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5080', nombre: 'MSI RTX 5080 VENTUS 3X OC 16GB (3x)', sku: 'RTX 5080 16G VENTUS 3X OC', precio: 0, tienda: 'Cyberpuerta', notas: '4K gaming/IA — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5080', nombre: 'ASUS ROG Strix RTX 5080 OC 16GB (3x)', sku: 'ROG-STRIX-RTX5080-O16G', precio: 0, tienda: 'Cyberpuerta', notas: '4K gaming/IA — ASUS ROG', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5080', nombre: 'Gigabyte RTX 5080 Gaming OC 16GB (3x)', sku: 'GV-N5080GAMING OC-16GD', precio: 0, tienda: 'Cyberpuerta', notas: '4K gaming/IA — Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 5090', nombre: 'MSI RTX 5090 SUPRIM LIQUID X 32GB', sku: 'RTX 5090 32G SUPRIM LIQUID X', precio: 0, tienda: 'Cyberpuerta', notas: 'la más potente — workstation/IA', updatedAt: '2026-06-06' },

  // ── GPU NVIDIA RTX 4000 (gen anterior) ───────────────────
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4060', nombre: 'MSI RTX 4060 VENTUS 2X OC 8GB (2x)', sku: 'RTX 4060 8G VENTUS 2X OC', precio: 0, tienda: 'Cyberpuerta', notas: '1080p DLSS3 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4060', nombre: 'ASUS DUAL RTX 4060 OC 8GB (2x)', sku: 'DUAL-RTX4060-O8G', precio: 0, tienda: 'Cyberpuerta', notas: '1080p DLSS3 — ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4060', nombre: 'Gigabyte RTX 4060 Gaming OC 8GB (3x)', sku: 'GV-N4060GAMING OC-8GD', precio: 0, tienda: 'Cyberpuerta', notas: '1080p DLSS3 — Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4060 Ti', nombre: 'MSI RTX 4060 Ti VENTUS 2X OC 8GB (2x)', sku: 'RTX 4060 TI 8G VENTUS 2X OC', precio: 0, tienda: 'Cyberpuerta', notas: '1080p/1440p DLSS3 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4060 Ti', nombre: 'ASUS DUAL RTX 4060 Ti 16GB (2x)', sku: 'DUAL-RTX4060TI-16G', precio: 0, tienda: 'Cyberpuerta', notas: '1440p 16GB DLSS3 — ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4070', nombre: 'MSI RTX 4070 VENTUS 3X OC 12GB (3x)', sku: 'RTX 4070 12G VENTUS 3X OC', precio: 0, tienda: 'Cyberpuerta', notas: '1440p DLSS3 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4070 Super', nombre: 'ASUS DUAL RTX 4070 Super OC 12GB (3x)', sku: 'DUAL-RTX4070S-O12G', precio: 0, tienda: 'Cyberpuerta', notas: '1440p DLSS3 — ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4070 Ti Super', nombre: 'MSI RTX 4070 Ti Super VENTUS 3X OC 16GB (3x)', sku: 'RTX 4070TI SUPER 16G VENTUS 3X OC', precio: 0, tienda: 'Cyberpuerta', notas: '4K DLSS3 — MSI', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'GPU', grupo: 'RTX 4080 Super', nombre: 'ASUS DUAL RTX 4080 Super OC 16GB (3x)', sku: 'DUAL-RTX4080S-O16G', precio: 0, tienda: 'Cyberpuerta', notas: '4K DLSS3 — ASUS', updatedAt: '2026-06-06' },

  // ── RAM DDR4 ─────────────────────────────────────────────
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 8GB', nombre: 'Kingston FURY Beast DDR4 8GB (1x8) 3200MHz', sku: 'KF432C16BB/8', precio: 0, tienda: 'Cyberpuerta', notas: 'single channel', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 16GB', nombre: 'Kingston FURY Beast DDR4 16GB (1x16) 3200MHz', sku: 'KF432C16BB/16', precio: 0, tienda: 'Cyberpuerta', notas: 'single channel', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 16GB', nombre: 'Kingston FURY Beast DDR4 16GB (2x8) 3200MHz', sku: 'KF432C16BBK2/16', precio: 0, tienda: 'Cyberpuerta', notas: 'dual channel estándar', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 16GB', nombre: 'Corsair Vengeance LPX DDR4 16GB (2x8) 3200MHz', sku: 'CMK16GX4M2B3200C16', precio: 0, tienda: 'Cyberpuerta', notas: 'dual channel perfil bajo', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 16GB', nombre: 'G.Skill Ripjaws V DDR4 16GB (2x8) 3200MHz', sku: 'F4-3200C16D-16GVKB', precio: 0, tienda: 'Cyberpuerta', notas: 'dual channel alternativa', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 16GB', nombre: 'G.Skill Trident Z RGB DDR4 16GB (2x8) 3600MHz', sku: 'F4-3600C18D-16GTZRX', precio: 0, tienda: 'Cyberpuerta', notas: 'dual channel RGB 3600MHz', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 32GB', nombre: 'Kingston FURY Beast DDR4 32GB (2x16) 3200MHz', sku: 'KF432C16BBK2/32', precio: 0, tienda: 'Cyberpuerta', notas: 'dual channel alta capacidad', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 32GB', nombre: 'Corsair Vengeance LPX DDR4 32GB (2x16) 3200MHz', sku: 'CMK32GX4M2E3200C16', precio: 0, tienda: 'Cyberpuerta', notas: 'dual channel perfil bajo', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 32GB', nombre: 'G.Skill Ripjaws V DDR4 32GB (2x16) 3600MHz', sku: 'F4-3600C18D-32GVK', precio: 0, tienda: 'Cyberpuerta', notas: 'dual channel 3600MHz', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR4 32GB', nombre: 'Corsair Dominator Platinum DDR4 32GB (2x16) 3200MHz', sku: 'CMT32GX4M2C3200C16', precio: 0, tienda: 'Cyberpuerta', notas: 'gama alta RGB', updatedAt: '2026-06-06' },

  // ── RAM DDR5 ─────────────────────────────────────────────
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 16GB', nombre: 'Kingston FURY Beast DDR5 16GB (2x8) 6000MHz', sku: 'KF560C36BBEK2-16', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 dual channel entrada', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 32GB', nombre: 'Kingston FURY Beast DDR5 32GB (2x16) 6000MHz', sku: 'KF560C36BBE2AK2-32', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 dual channel punto dulce', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 32GB', nombre: 'Corsair Vengeance DDR5 32GB (2x16) 6000MHz', sku: 'CMK32GX5M2E6000C36', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 alternativa Corsair', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 32GB', nombre: 'G.Skill Trident Z5 RGB DDR5 32GB (2x16) 6400MHz', sku: 'F5-6400J3239G16GX2-TZ5RK', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 RGB alta frecuencia', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 64GB', nombre: 'Kingston FURY Beast DDR5 64GB (2x32) 6000MHz', sku: 'KF560C36BBEK2-64', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 workstation/edición', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'RAM', grupo: 'DDR5 64GB', nombre: 'Corsair Vengeance DDR5 64GB (2x32) 6000MHz', sku: 'CMK64GX5M2B6000C30', precio: 0, tienda: 'Cyberpuerta', notas: 'AM5 64GB workstation', updatedAt: '2026-06-06' },

  // ── SSD M.2 NVMe ─────────────────────────────────────────
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 500GB', nombre: 'Kingston NV2 NVMe 500GB', sku: 'SNV2S/500G', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 — entrada', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 500GB', nombre: 'WD Green NVMe 480GB', sku: 'WDS480G4G0E', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 — económico', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 500GB', nombre: 'Crucial P3 Plus NVMe 500GB', sku: 'CT500P3PSSD8', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 — económico', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Kingston NV2 NVMe 1TB', sku: 'SNV2S/1000G', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 — 1TB económico', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Kingston SNV3S NVMe 1TB', sku: 'SNV3S/1000G', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 6000MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'WD Green NVMe 1TB', sku: 'WDS100T4G0E-00CPS0', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 — económico', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'WD Blue SN580 NVMe 1TB', sku: 'WDS100T3B0E', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 4150MB/s — media gama', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Crucial P3 Plus NVMe 1TB', sku: 'CT1000P3PSSD8', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 — precio competitivo', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Crucial P5 Plus NVMe 1TB', sku: 'CT1000P5PSSD8', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 6600MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Samsung 970 EVO Plus NVMe 1TB', sku: 'MZ-V7S1T0B/AM', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 3.0 — buen precio', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'Samsung 980 PRO NVMe 1TB', sku: 'MZ-V8P1T0B/AM', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 7300MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 1TB', nombre: 'WD Black SN850X NVMe 1TB', sku: 'WDS100T2X0E', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 7300MB/s — tope de gama', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 2TB', nombre: 'Kingston SNV3S NVMe 2TB', sku: 'SNV3S/2000G', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 6000MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 2TB', nombre: 'WD Blue SN580 NVMe 2TB', sku: 'WDS200T3B0E', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 4150MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 2TB', nombre: 'WD Black SN850X NVMe 2TB', sku: 'WDS200T2X0E', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 7300MB/s — premium', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD M.2', grupo: 'NVMe 2TB', nombre: 'Samsung 990 PRO NVMe 2TB', sku: 'MZ-V9P2T0B/AM', precio: 0, tienda: 'Cyberpuerta', notas: 'PCIe 4.0 7450MB/s — tope Samsung', updatedAt: '2026-06-06' },

  // ── SSD SATA 2.5" ────────────────────────────────────────
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 500GB', nombre: 'Kingston KC600 512GB SATA', sku: 'SKC600/512G', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 550MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 500GB', nombre: 'Crucial MX500 500GB SATA', sku: 'CT500MX500SSD1', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 560MB/s — confiable', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 500GB', nombre: 'WD Blue 500GB SATA', sku: 'WDS500G3B0A', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 560MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 500GB', nombre: 'Samsung 870 EVO 500GB SATA', sku: 'MZ-77E500B/AM', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 560MB/s — referencia', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 1TB', nombre: 'Kingston KC600 1TB SATA', sku: 'SKC600/1024G', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 550MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 1TB', nombre: 'Crucial MX500 1TB SATA', sku: 'CT1000MX500SSD1', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 560MB/s — confiable', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 1TB', nombre: 'WD Blue 1TB SATA', sku: 'WDS100T3B0A', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 560MB/s', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 1TB', nombre: 'Samsung 870 EVO 1TB SATA', sku: 'MZ-77E1T0B/AM', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 560MB/s — mejor SATA', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'SSD SATA', grupo: 'SATA 2TB', nombre: 'Kingston KC600 2TB SATA', sku: 'SKC600/2048G', precio: 0, tienda: 'Cyberpuerta', notas: 'SATA III 550MB/s', updatedAt: '2026-06-06' },

  // ── HDD ──────────────────────────────────────────────────
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 1TB', nombre: 'Seagate Barracuda 1TB 7200RPM', sku: 'ST1000DM010', precio: 0, tienda: 'Cyberpuerta', notas: 'almacenamiento básico', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 1TB', nombre: 'WD Blue 1TB 7200RPM', sku: 'WD10EZEX', precio: 0, tienda: 'Cyberpuerta', notas: 'almacenamiento básico WD', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 2TB', nombre: 'Seagate Barracuda 2TB 7200RPM', sku: 'ST2000DM008', precio: 0, tienda: 'Cyberpuerta', notas: 'almacenamiento estándar', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 2TB', nombre: 'WD Blue 2TB 5400RPM', sku: 'WD20EZAZ', precio: 0, tienda: 'Cyberpuerta', notas: 'almacenamiento 2TB WD', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 2TB', nombre: 'WD Purple 2TB 5400RPM', sku: 'WD20PURZ', precio: 0, tienda: 'Cyberpuerta', notas: 'videovigilancia', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 4TB', nombre: 'Seagate Barracuda 4TB 5400RPM', sku: 'ST4000DM004', precio: 0, tienda: 'Cyberpuerta', notas: 'almacenamiento masivo', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 4TB', nombre: 'WD Blue 4TB 5400RPM', sku: 'WD40EZAZ', precio: 0, tienda: 'Cyberpuerta', notas: 'almacenamiento masivo WD', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'HDD', grupo: 'HDD 4TB', nombre: 'Seagate IronWolf 4TB NAS 5400RPM', sku: 'ST4000VN006', precio: 0, tienda: 'Cyberpuerta', notas: 'NAS/servidor — mayor durabilidad', updatedAt: '2026-06-06' },

  // ── Motherboard AM4 ──────────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 A520', nombre: 'ASUS Prime A520M-K AM4 mATX', sku: 'PRIME A520M-K', precio: 0, tienda: 'Cyberpuerta', notas: 'entrada sin overclock', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 A520', nombre: 'MSI PRO A520M-E AM4 mATX', sku: 'PRO A520M-E', precio: 0, tienda: 'Cyberpuerta', notas: 'entrada económica', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 A520', nombre: 'Gigabyte A520M DS3H AM4 mATX', sku: 'A520M DS3H', precio: 0, tienda: 'Cyberpuerta', notas: 'entrada Gigabyte', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'ASUS Prime B550M-A AC AM4 mATX', sku: 'PRIME B550M-A AC', precio: 0, tienda: 'Cyberpuerta', notas: 'estándar mATX WiFi', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'MSI MAG B550M MORTAR WIFI AM4 mATX', sku: 'MAG B550M MORTAR WIFI', precio: 0, tienda: 'Cyberpuerta', notas: 'mATX WiFi muy popular', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'MSI MAG B550 TOMAHAWK AM4 ATX', sku: 'MAG B550 TOMAHAWK', precio: 0, tienda: 'Cyberpuerta', notas: 'estándar ATX', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'Gigabyte B550 AORUS Elite AM4 ATX', sku: 'B550 AORUS ELITE', precio: 0, tienda: 'Cyberpuerta', notas: 'gama alta ATX', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'ASUS ROG Strix B550-F AM4 ATX', sku: 'ROG STRIX B550-F GAMING WIFI II', precio: 0, tienda: 'Cyberpuerta', notas: 'gama alta WiFi', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 X570', nombre: 'MSI MEG X570 UNIFY AM4 ATX', sku: 'MEG X570 UNIFY', precio: 0, tienda: 'Cyberpuerta', notas: 'X570 premium sin RGB', updatedAt: '2026-06-06' },

  // ── Motherboard AM5 ──────────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 A620', nombre: 'ASUS Prime A620M-K AM5 mATX', sku: '90MB1F40-M0AAY0', precio: 0, tienda: 'Cyberpuerta', notas: 'entrada DDR5', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 A620', nombre: 'Gigabyte A620M DS3H AM5 mATX', sku: 'A620M DS3H', precio: 0, tienda: 'Cyberpuerta', notas: 'entrada económica', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'MSI B650M Gaming WIFI AM5 mATX', sku: 'B650M GAMING WIFI', precio: 0, tienda: 'Cyberpuerta', notas: 'estándar mATX WiFi', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'ASUS Prime B650M-A WIFI AM5 mATX', sku: 'PRIME B650M-A WIFI', precio: 0, tienda: 'Cyberpuerta', notas: 'mATX WiFi ASUS', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'MSI MAG B650 TOMAHAWK WIFI AM5 ATX', sku: 'MAG B650 TOMAHAWK WIFI', precio: 0, tienda: 'Cyberpuerta', notas: 'ATX estándar WiFi', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'Gigabyte B650 AORUS Elite AX V2 AM5 ATX', sku: 'B650 AORUS ELITE AX V2', precio: 0, tienda: 'Cyberpuerta', notas: 'ATX con WiFi', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 X670', nombre: 'ASUS ROG Strix B650E-F AM5 ATX', sku: 'ROG STRIX B650E-F GAMING WIFI', precio: 0, tienda: 'Cyberpuerta', notas: 'gama alta B650E', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 X670', nombre: 'ASUS ROG Strix X670E-F AM5 ATX', sku: 'ROG STRIX X670E-F', precio: 0, tienda: 'Cyberpuerta', notas: 'X670E alta gama', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 X670', nombre: 'MSI MEG X670E ACE AM5 ATX', sku: 'MEG X670E ACE', precio: 0, tienda: 'Cyberpuerta', notas: 'X670E tope de gama', updatedAt: '2026-06-06' },

  // ── Motherboard Intel LGA1700 ────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel H610/H670', nombre: 'MSI PRO H610M-G LGA1700 mATX', sku: 'PRO H610M-G DDR4', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4 — entrada Intel', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel H610/H670', nombre: 'ASUS Prime H670M-PLUS LGA1700 mATX', sku: 'PRIME H670M-PLUS D4', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4 — entrada media', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B660/B760', nombre: 'MSI MAG B660M Mortar WIFI LGA1700 mATX', sku: 'MAG B660M MORTAR WIFI DDR4', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4 — mATX WiFi', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B660/B760', nombre: 'ASUS Prime B760M-A WIFI LGA1700 mATX', sku: 'PRIME B760M-A WIFI D4', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR4/5 — mATX WiFi', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel Z790', nombre: 'MSI MAG Z790 Tomahawk WIFI LGA1700 ATX', sku: 'MAG Z790 TOMAHAWK WIFI', precio: 0, tienda: 'Cyberpuerta', notas: 'LGA1700 DDR5 — Z790 overclock', updatedAt: '2026-06-06' },

  // ── PSU 550W ─────────────────────────────────────────────
  { id: uuid(), categoria: 'PSU', grupo: '550W', nombre: 'XPG PYLON 550W 80+ Bronze', sku: 'PYLON550B-BKCUS', precio: 0, tienda: 'Cyberpuerta', notas: 'oficina / GPU chica', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '550W', nombre: 'Corsair CX550 550W 80+ Bronze', sku: 'CP-9020121-NA', precio: 0, tienda: 'Cyberpuerta', notas: 'Corsair entrada', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '550W', nombre: 'EVGA 600W 80+ Bronze', sku: '100-B1-0600-KR', precio: 0, tienda: 'Cyberpuerta', notas: 'básica confiable', updatedAt: '2026-06-06' },

  // ── PSU 650W ─────────────────────────────────────────────
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'XPG PYLON 650W 80+ Bronze', sku: 'PYLON650B-BKCUS', precio: 0, tienda: 'Cyberpuerta', notas: 'gamer entrada-media', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'MSI MAG A650BN 650W 80+ Bronze', sku: 'MAG A650BN', precio: 0, tienda: 'Cyberpuerta', notas: 'alternativa económica', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'Corsair CX650M 650W 80+ Bronze Semi-Modular', sku: 'CP-9020103-NA', precio: 0, tienda: 'Cyberpuerta', notas: 'semi-modular mejor cableado', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'be quiet! Pure Power 11 600W 80+ Gold', sku: 'BN294', precio: 0, tienda: 'Cyberpuerta', notas: 'silenciosa alemana', updatedAt: '2026-06-06' },

  // ── PSU 750W ─────────────────────────────────────────────
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'XPG CORE REACTOR 750W 80+ Gold', sku: 'COREREACTOR750G-BKCUS', precio: 0, tienda: 'Cyberpuerta', notas: 'gamer media-alta', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'MSI MAG A750GL 750W 80+ Gold Modular', sku: 'MAG A750GL PCIE5', precio: 0, tienda: 'Cyberpuerta', notas: 'modular con PCIe 5', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'Corsair RM750 750W 80+ Gold Modular', sku: 'CP-9020195-NA', precio: 0, tienda: 'Cyberpuerta', notas: 'modular silencioso', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'Seasonic Focus GX-750 750W 80+ Gold Modular', sku: 'FOCUS-GX-750', precio: 0, tienda: 'Cyberpuerta', notas: 'modular premium muy recomendada', updatedAt: '2026-06-06' },

  // ── PSU 850W+ ────────────────────────────────────────────
  { id: uuid(), categoria: 'PSU', grupo: '850W+', nombre: 'XPG CORE REACTOR 850W 80+ Gold', sku: 'COREREACTOR850G-BKCUS', precio: 0, tienda: 'Cyberpuerta', notas: 'gama alta', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '850W+', nombre: 'Corsair RM850x 850W 80+ Gold Modular', sku: 'CP-9020200-NA', precio: 0, tienda: 'Cyberpuerta', notas: 'modular alta gama', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'PSU', grupo: '850W+', nombre: 'Corsair HX1000 1000W 80+ Platinum Modular', sku: 'CP-9020139-NA', precio: 0, tienda: 'Cyberpuerta', notas: 'Platinum modular — workstation', updatedAt: '2026-06-06' },

  // ── Case Económico ───────────────────────────────────────
  { id: uuid(), categoria: 'Case', grupo: 'Económico', nombre: 'Balam Rush Calipso Midi-Tower ATX', sku: 'BR-922968', precio: 0, tienda: 'Cyberpuerta', notas: 'económico funcional', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Económico', nombre: 'Balam Rush Argus RGB Midi-Tower ATX', sku: 'BR-ARGUS', precio: 0, tienda: 'Cyberpuerta', notas: 'económico con RGB', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Económico', nombre: 'MSI MAG Forge 100R Mid Tower ATX', sku: 'MAG FORGE 100R', precio: 0, tienda: 'Cyberpuerta', notas: 'vidrio templado', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Económico', nombre: 'Gigabyte C200 Glass ATX', sku: 'GB-C200G', precio: 0, tienda: 'Cyberpuerta', notas: 'vidrio templado Gigabyte', updatedAt: '2026-06-06' },

  // ── Case Gama Media ──────────────────────────────────────
  { id: uuid(), categoria: 'Case', grupo: 'Gama Media', nombre: 'XPG STARKER AIR Mid Tower ATX', sku: 'STARKERAIR-BKCWW', precio: 0, tienda: 'Cyberpuerta', notas: 'flujo de aire — muy buena opción', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Gama Media', nombre: 'MSI MAG Pano M100R mATX', sku: 'MAG PANO M100R PZ', precio: 0, tienda: 'Cyberpuerta', notas: 'panorámico ARGB mATX', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Gama Media', nombre: 'NZXT H510 Mid Tower ATX', sku: 'CA-H510B-B1', precio: 0, tienda: 'Cyberpuerta', notas: 'minimalista popular', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Gama Media', nombre: 'Fractal Design Focus G ATX', sku: 'FD-CA-FOCUS-GY-W', precio: 0, tienda: 'Cyberpuerta', notas: 'limpio y funcional', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Gama Media', nombre: 'Phanteks Eclipse P400A ATX', sku: 'PH-EC400ATG_DBK01', precio: 0, tienda: 'Cyberpuerta', notas: 'excelente flujo de aire', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Gama Media', nombre: 'Corsair 4000D Airflow ATX', sku: 'CC-9011200-WW', precio: 0, tienda: 'Cyberpuerta', notas: 'excelente flujo de aire', updatedAt: '2026-06-06' },

  // ── Case Premium ─────────────────────────────────────────
  { id: uuid(), categoria: 'Case', grupo: 'Premium', nombre: 'Corsair 5000D Airflow ATX', sku: 'CC-9011210-WW', precio: 0, tienda: 'Cyberpuerta', notas: 'top en flujo de aire', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Premium', nombre: 'NZXT H710 Mid Tower ATX', sku: 'CA-H710B-B1', precio: 0, tienda: 'Cyberpuerta', notas: 'premium gestión de cables', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Case', grupo: 'Premium', nombre: 'Lian Li Lancool 216 ATX', sku: 'G99.L216X1B.00', precio: 0, tienda: 'Cyberpuerta', notas: 'flujo de aire top con ventiladores', updatedAt: '2026-06-06' },

  // ── Cooler Aire ──────────────────────────────────────────
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'AMD Wraith Stealth (stock AM4)', sku: '', precio: 0, tienda: '', notas: 'incluido en Ryzen 5 5600/5600X — $0', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'ARCTIC Freezer 36 120mm', sku: 'ACFRE00123A', precio: 0, tienda: 'Cyberpuerta', notas: 'precio muy competitivo, excelente rendimiento', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'DeepCool AK400 120mm', sku: 'R-AK400-BKNNMN-G', precio: 0, tienda: 'Cyberpuerta', notas: 'excelente precio/rendimiento silencioso', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'Cooler Master Hyper 212 Pro', sku: 'RR-212S-25PZ-R1', precio: 0, tienda: 'Cyberpuerta', notas: 'clásico confiable', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'Cooler Master Hyper 212 Black', sku: 'RR-S4KK-25SN-R1', precio: 0, tienda: 'Cyberpuerta', notas: 'versión negra Hyper 212', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'be quiet! Shadow Rock 3', sku: 'BK004', precio: 0, tienda: 'Cyberpuerta', notas: 'silencioso alemán gama media', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'Noctua NH-U12S redux', sku: 'NH-U12S redux', precio: 0, tienda: 'Cyberpuerta', notas: 'silencioso premium', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'Aire', nombre: 'Noctua NH-D15 (doble torre)', sku: 'NH-D15', precio: 0, tienda: 'Cyberpuerta', notas: 'el mejor cooler de aire', updatedAt: '2026-06-06' },

  // ── Cooler Líquido AIO ───────────────────────────────────
  { id: uuid(), categoria: 'Cooler', grupo: 'AIO 240mm', nombre: 'DeepCool LT520 AIO 240mm', sku: 'R-LT520-BKANMN-G', precio: 0, tienda: 'Cyberpuerta', notas: 'buena relación precio/rendimiento', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'AIO 240mm', nombre: 'Cooler Master MasterLiquid 240L AIO', sku: 'MLW-D24M-A18PC-R2', precio: 0, tienda: 'Cyberpuerta', notas: 'AIO 240mm popular', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'AIO 240mm', nombre: 'Corsair H100x Elite 240mm AIO', sku: 'CW-9060065-WW', precio: 0, tienda: 'Cyberpuerta', notas: 'AIO 240mm Corsair', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'AIO 360mm', nombre: 'Cooler Master MasterLiquid 360L AIO', sku: 'MLW-D36M-A18PC-R2', precio: 0, tienda: 'Cyberpuerta', notas: 'AIO 360mm gama alta', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'AIO 360mm', nombre: 'ARCTIC Liquid Freezer III 360mm AIO', sku: 'ACFRE00137A', precio: 0, tienda: 'Cyberpuerta', notas: 'uno de los mejores AIO', updatedAt: '2026-06-06' },
  { id: uuid(), categoria: 'Cooler', grupo: 'AIO 360mm', nombre: 'Corsair H150i Elite 360mm AIO', sku: 'CW-9060070-WW', precio: 0, tienda: 'Cyberpuerta', notas: 'AIO 360mm premium Corsair', updatedAt: '2026-06-06' },
]
