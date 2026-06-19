import { v4 as uuid } from 'uuid'

// SKUs verificados en cyberpuerta.mx — junio 2026
// CP- = código interno Cyberpuerta | 90MB... = SKU fabricante ASUS | RR-... = SKU fabricante, etc.

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

  // ── CPU Intel LGA1700 ────────────────────────────────────
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

  // ── Motherboard AM4 B550 ─────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'ASUS PRIME B550M-K', sku: '90MB14V0-M0EAY0', precio: 0, tienda: '', notas: 'AM4 DDR4 — económica' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'ASUS PRIME B550M-A AC', sku: '90MB15K0-M0EAY0', precio: 0, tienda: '', notas: 'AM4 DDR4 — WiFi incluido' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'Gigabyte B550M DS3H AC', sku: 'CP-GIGABYTE-B550MDS3HACR2', precio: 0, tienda: '', notas: 'AM4 DDR4 — WiFi económica' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'Gigabyte B550M K', sku: 'CP-GIGABYTE-B550MK', precio: 0, tienda: '', notas: 'AM4 DDR4 — básica' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'ASUS TUF GAMING B550M-PLUS WIFI II', sku: '90MB19Y0-M0EAY0', precio: 0, tienda: '', notas: 'AM4 DDR4 — gama media WiFi' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM4 B550', nombre: 'ASUS ROG Strix B550-F GAMING WIFI II', sku: '90MB19V0-M0AAY0', precio: 0, tienda: '', notas: 'AM4 DDR4 — gama alta' },

  // ── Motherboard AM5 A620 ─────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 A620', nombre: 'Gigabyte A620M DS3H', sku: 'A620M DS3H', precio: 0, tienda: '', notas: 'AM5 DDR5 — entrada económica' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 A620', nombre: 'ASUS PRIME A620M-K-CSM', sku: '90MB1F40-M0EAYC', precio: 0, tienda: '', notas: 'AM5 DDR5 — entrada ASUS' },

  // ── Motherboard AM5 B650 ─────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'MSI PRO B650M-B', sku: 'PRO B650M-B', precio: 0, tienda: '', notas: 'AM5 DDR5 — económica MSI' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'ASRock B650M-H/M.2+', sku: 'B650M-H/M.2+', precio: 0, tienda: '', notas: 'AM5 DDR5 — económica ASRock' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'Gigabyte B650M D3HP', sku: 'B650M D3HP', precio: 0, tienda: '', notas: 'AM5 DDR5 — media Gigabyte' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'ASUS Prime B650M-K', sku: '90MB1F60-M0EAY0', precio: 0, tienda: '', notas: 'AM5 DDR5 — media ASUS' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'ASUS Prime B650M-A II', sku: 'PRIME B650M-A II', precio: 0, tienda: '', notas: 'AM5 DDR5 — media-alta' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'AORUS B650M ELITE AX ICE', sku: 'B650M A ELITE AX ICE', precio: 0, tienda: '', notas: 'AM5 DDR5 — WiFi media-alta' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B650', nombre: 'ASUS ROG Strix B650-A GAMING WIFI', sku: '90MB1BP0-M0EAY0', precio: 0, tienda: '', notas: 'AM5 DDR5 — gama alta ASUS' },

  // ── Motherboard AM5 B850 ─────────────────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'AM5 B850', nombre: 'AORUS B850 A ELITE WF7 ICE', sku: 'B850 A ELITE WF7 ICE', precio: 0, tienda: '', notas: 'AM5 DDR5 — WiFi7 alta gama' },

  // ── Motherboard Intel H610 LGA1700 ──────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel H610', nombre: 'ASUS H610M-K D4', sku: '90MB1A10-M0EAY0', precio: 0, tienda: '', notas: 'LGA1700 DDR4 — básica económica' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel H610', nombre: 'ASUS PRIME H610M-K', sku: '90MB1GA0-M0EAY0', precio: 0, tienda: '', notas: 'LGA1700 DDR5 — básica' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel H610', nombre: 'MSI PRO B840M-B', sku: 'PRO B840M-B', precio: 0, tienda: '', notas: 'LGA1851 DDR5 — económica Intel 800' },

  // ── Motherboard Intel B760 LGA1700 ──────────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B760', nombre: 'Gigabyte B760M D3HP', sku: 'B760M D3HP', precio: 0, tienda: '', notas: 'LGA1700 DDR5 — económica' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B760', nombre: 'ASUS PRIME B760M-A D4', sku: '90MB1D00-M0EAY0', precio: 0, tienda: '', notas: 'LGA1700 DDR4 — media ASUS' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B760', nombre: 'MSI B760M GAMING PLUS WIFI', sku: 'B760M GAMING PLUS WIFI', precio: 0, tienda: '', notas: 'LGA1700 DDR5 — WiFi media' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B760', nombre: 'MSI B760 GAMING PLUS WIFI', sku: 'B760 GAMING PLUS WIFI', precio: 0, tienda: '', notas: 'LGA1700 DDR5 ATX — WiFi media' },

  // ── Motherboard Intel B860/Z890 LGA1851 ─────────────────
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B860', nombre: 'ASUS PRIME B860M-K', sku: '90MB1JT0-M0EAY0', precio: 0, tienda: '', notas: 'LGA1851 DDR5 — media Intel 800' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel B860', nombre: 'MSI B860M GAMING PLUS WIFI', sku: 'B860M GAMING PLUS WIFI', precio: 0, tienda: '', notas: 'LGA1851 DDR5 — WiFi media' },
  { id: uuid(), categoria: 'Motherboard', grupo: 'Intel Z890', nombre: 'MSI Z890 GAMING PLUS WIFI', sku: 'Z890 GAMING PLUS WIFI', precio: 0, tienda: '', notas: 'LGA1851 DDR5 — alta gama OC' },

  // ── PSU ──────────────────────────────────────────────────
  { id: uuid(), categoria: 'PSU', grupo: '550W', nombre: 'XPG PROBE 600W 80+ Bronze', sku: 'PROBE600B-BKCUS', precio: 0, tienda: '', notas: '600W Bronze — económica' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'MSI MAG A650BN 80+ Bronze 650W', sku: 'MAG A650BN', precio: 0, tienda: '', notas: '650W Bronze — muy económica' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'MSI MAG A650GN II 80+ Gold 650W', sku: 'MAG A650GN II', precio: 0, tienda: '', notas: '650W Gold modular' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'XPG PYLON II 650W 80+ Bronze', sku: 'PYLONII650B-BKCUS', precio: 0, tienda: '', notas: '650W Bronze semi-modular' },
  { id: uuid(), categoria: 'PSU', grupo: '650W', nombre: 'Corsair CV650 80+ Bronze 650W', sku: 'CP-9020236-WW', precio: 0, tienda: '', notas: '650W — confiable económica' },
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'Balam Rush GR750G 80+ Gold 750W', sku: 'BR-937665', precio: 0, tienda: '', notas: '750W Gold modular — buena relación precio' },
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'Gigabyte UD750GM 80+ Gold 750W', sku: 'CP-GIGABYTE-GP-UD750GM', precio: 0, tienda: '', notas: '750W Gold modular' },
  { id: uuid(), categoria: 'PSU', grupo: '750W', nombre: 'NZXT C750 Gold 80+ Gold 750W', sku: 'PA-7G1BB-US', precio: 0, tienda: '', notas: '750W Gold modular — NZXT' },
  { id: uuid(), categoria: 'PSU', grupo: '850W', nombre: 'MSI MAG A850GLS PCIE5 80+ Gold 850W', sku: 'CP-MSI-MAGA850GLSPCIE5', precio: 0, tienda: '', notas: '850W Gold PCIE5 — para RTX 5070+' },
  { id: uuid(), categoria: 'PSU', grupo: '1000W', nombre: 'MSI MAG A1000PLS 80+ Gold 1000W', sku: 'CP-MSI-MAGA1000PLS', precio: 0, tienda: '', notas: '1000W Gold PCIE5 — RTX 5080/5090' },

  // ── Disipador CPU ─────────────────────────────────────────
  { id: uuid(), categoria: 'Disipador', grupo: 'Aire 120mm', nombre: 'Thermaltake UX200 SE ARGB 120mm', sku: 'CL-P105-AL12SW-A', precio: 0, tienda: '', notas: 'AM4/AM5/LGA1700 — económico ARGB' },
  { id: uuid(), categoria: 'Disipador', grupo: 'Aire 120mm', nombre: 'DeepCool AK400 DIGITAL 120mm', sku: 'R-AK400-BKADMN-GJD', precio: 0, tienda: '', notas: 'AM4/AM5/LGA1700 — pantalla LCD' },
  { id: uuid(), categoria: 'Disipador', grupo: 'Aire 120mm', nombre: 'Cooler Master Hyper 212 EVO V2 120mm', sku: 'RR-2V2E-18PK-R2', precio: 0, tienda: '', notas: 'AM4/AM5/LGA1700 — clásico confiable' },
  { id: uuid(), categoria: 'Disipador', grupo: 'Aire 120mm', nombre: 'Cooler Master Hyper 212 Pro 120mm', sku: 'RR-212S-25PZ-R1', precio: 0, tienda: '', notas: 'AM4/AM5/LGA1700 — 2500RPM' },
  { id: uuid(), categoria: 'Disipador', grupo: 'Aire 120mm', nombre: 'DeepCool AK620 G2 120mm', sku: 'R-AK620G2-BKNNMN-GJD', precio: 0, tienda: '', notas: 'AM4/AM5/LGA1700 — dual torre premium' },

  // ── Gabinete ─────────────────────────────────────────────
  { id: uuid(), categoria: 'Gabinete', grupo: 'Micro-ATX', nombre: 'Balam Rush Thank Expert Curve 6400', sku: 'BR-941617', precio: 0, tienda: '', notas: 'mATX — económico' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'Micro-ATX', nombre: 'Corsair 3200D RS', sku: 'CC-9011334-WW', precio: 0, tienda: '', notas: 'mATX — Corsair compacto' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'Micro-ATX', nombre: 'ASUS Prime AP201 Negro', sku: '90DC00G0-B39000', precio: 0, tienda: '', notas: 'mATX — ASUS compacto negro' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'Micro-ATX', nombre: 'ASUS Prime AP201 Blanco', sku: '90DC00G3-B39000', precio: 0, tienda: '', notas: 'mATX — ASUS compacto blanco' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'ATX', nombre: 'Cooler Master HAF 500', sku: 'H500-WGNN-S00', precio: 0, tienda: '', notas: 'ATX — airflow optimizado' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'ATX', nombre: 'MSI MAG PANO M100R PZ', sku: 'MAG PANO M100R PZ', precio: 0, tienda: '', notas: 'ATX — vidrio panorámico' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'ATX', nombre: 'ASUS Prime AP303 Mesh', sku: 'PRIME AP303 MESH BLACK', precio: 0, tienda: '', notas: 'ATX — malla frontal' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'ATX', nombre: 'Gigabyte C103 Glass', sku: 'GB-C103GP65G5', precio: 0, tienda: '', notas: 'ATX — vidrio templado' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'ATX', nombre: 'DeepCool Morpheus WH', sku: 'R-MORPHEUS-WHAPA1-G-1', precio: 0, tienda: '', notas: 'ATX — blanco minimalista' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'Full Tower', nombre: 'Thermaltake CTE E600 MX', sku: 'CA-1Y3-00MFWN-00', precio: 0, tienda: '', notas: 'Full tower — rotación 90°' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'Full Tower', nombre: 'ASUS TUF Gaming GT502', sku: '90DC0093-B08000', precio: 0, tienda: '', notas: 'ATX — ASUS TUF airflow' },
  { id: uuid(), categoria: 'Gabinete', grupo: 'Full Tower', nombre: 'ASUS ROG Strix Helios White', sku: '90DC0023-B30000', precio: 0, tienda: '', notas: 'Full tower — gama alta blanco' },

]
