// Base de datos de componentes populares en México para el buscador del cotizador.
// No trae precios: el precio se pone en la cotización (o con el botón 🔍).
// Si un componente no está aquí, se puede agregar a mano desde el buscador.

const out = []
const add = (categoria, grupo, nombre, notas = '') => out.push({ categoria, grupo, nombre, notas })

// ── RAM ─────────────────────────────────────────────────
const CAPS = [
  ['8GB (1x8)', '8GB', '1 módulo'],
  ['16GB (1x16)', '16GB', '1 módulo — deja ranuras libres para crecer'],
  ['16GB (2x8)', '16GB', 'kit doble canal'],
  ['32GB (1x32)', '32GB', '1 módulo'],
  ['32GB (2x16)', '32GB', 'kit doble canal'],
  ['64GB (2x32)', '64GB', 'kit doble canal'],
]
const DDR4 = [
  ['Kingston FURY Beast', ['3200', '3600']],
  ['Kingston FURY Beast RGB', ['3200', '3600']],
  ['Corsair Vengeance LPX', ['3200', '3600']],
  ['Corsair Vengeance RGB Pro', ['3200', '3600']],
  ['XPG GAMMIX D35', ['3200', '3600']],
  ['XPG Spectrix D35G RGB', ['3200', '3600']],
  ['TeamGroup T-Force Vulcan Z', ['3200', '3600']],
  ['TeamGroup T-Force Delta RGB', ['3200', '3600']],
  ['Crucial Pro', ['3200']],
  ['Patriot Viper Steel', ['3200', '3600']],
  ['G.Skill Ripjaws V', ['3200', '3600']],
]
for (const [serie, vel] of DDR4) for (const [cap, gb, nota] of CAPS) for (const v of vel) {
  if (cap.startsWith('8GB') && v === '3600') continue
  add('RAM', `DDR4 ${gb}`, `${serie} DDR4 ${cap} ${v}MHz`, `DDR4 — ${nota}`)
}
const CAPS5 = [
  ['16GB (1x16)', '16GB', '1 módulo — deja ranuras libres para crecer'],
  ['16GB (2x8)', '16GB', 'kit doble canal'],
  ['32GB (1x32)', '32GB', '1 módulo'],
  ['32GB (2x16)', '32GB', 'kit doble canal — punto dulce'],
  ['48GB (2x24)', '48GB', 'kit doble canal'],
  ['64GB (2x32)', '64GB', 'kit doble canal'],
]
const DDR5 = [
  ['Kingston FURY Beast', ['5600', '6000']],
  ['Kingston FURY Beast RGB', ['5600', '6000']],
  ['Corsair Vengeance', ['5600', '6000']],
  ['Corsair Vengeance RGB', ['5600', '6000']],
  ['XPG Lancer', ['5600', '6000']],
  ['XPG Lancer RGB', ['6000']],
  ['TeamGroup T-Force Delta RGB', ['6000']],
  ['TeamGroup T-Force Vulcan', ['5600', '6000']],
  ['Crucial Pro', ['5600', '6000']],
  ['Crucial', ['5600']],
  ['G.Skill Flare X5', ['6000']],
  ['G.Skill Trident Z5 RGB', ['6000']],
  ['Patriot Viper Venom', ['6000']],
]
for (const [serie, vel] of DDR5) for (const [cap, gb, nota] of CAPS5) for (const v of vel) {
  add('RAM', `DDR5 ${gb}`, `${serie} DDR5 ${cap} ${v}MHz`, `DDR5 — ${nota}`)
}

// ── MOTHERBOARDS ────────────────────────────────────────
const MB = {
  'AM4 A520': ['ASUS PRIME A520M-K', 'ASUS PRIME A520M-E', 'MSI A520M-A PRO', 'MSI A520M PRO', 'Gigabyte A520M K V2', 'Gigabyte A520M DS3H', 'ASRock A520M-HDV', 'ASRock A520M/ac'],
  'AM4 B450': ['MSI B450M PRO-VDH MAX', 'MSI B450M-A PRO MAX', 'MSI B450 TOMAHAWK MAX', 'ASUS PRIME B450M-A II', 'ASUS TUF GAMING B450M-PLUS II', 'Gigabyte B450M DS3H V2', 'Gigabyte B450 AORUS ELITE V2', 'ASRock B450M Steel Legend', 'ASRock B450M-HDV R4.0'],
  'AM4 B550': ['ASUS PRIME B550M-K', 'ASUS PRIME B550M-A WIFI II', 'ASUS TUF GAMING B550M-PLUS WIFI II', 'ASUS TUF GAMING B550-PLUS WIFI II', 'ASUS ROG STRIX B550-F GAMING WIFI II', 'ASUS ROG STRIX B550-A GAMING', 'MSI B550M PRO-VDH WIFI', 'MSI MAG B550M MORTAR WIFI', 'MSI MAG B550 TOMAHAWK', 'MSI B550-A PRO', 'MSI MPG B550 GAMING PLUS', 'Gigabyte B550M DS3H', 'Gigabyte B550M AORUS ELITE', 'Gigabyte B550 AORUS ELITE AX V2', 'Gigabyte B550 GAMING X V2', 'ASRock B550M-HDV', 'ASRock B550M Pro4', 'ASRock B550M Steel Legend', 'ASRock B550 Phantom Gaming 4'],
  'AM4 X570': ['ASUS TUF GAMING X570-PLUS WIFI', 'ASUS ROG STRIX X570-E GAMING WIFI II', 'MSI MAG X570S TOMAHAWK MAX WIFI', 'Gigabyte X570S AORUS ELITE AX', 'ASRock X570 Steel Legend'],
  'AM5 A620': ['ASUS PRIME A620M-K', 'ASUS PRIME A620M-E', 'MSI PRO A620M-E', 'Gigabyte A620M GAMING X', 'Gigabyte A620M S2H', 'ASRock A620M-HDV/M.2'],
  'AM5 B650': ['ASUS PRIME B650M-A AX II', 'ASUS PRIME B650M-A WIFI II', 'ASUS TUF GAMING B650M-PLUS WIFI', 'ASUS TUF GAMING B650-PLUS WIFI', 'ASUS ROG STRIX B650-A GAMING WIFI', 'ASUS ROG STRIX B650E-F GAMING WIFI', 'MSI PRO B650M-A WIFI', 'MSI PRO B650M-P', 'MSI MAG B650M MORTAR WIFI', 'MSI MAG B650 TOMAHAWK WIFI', 'MSI B650 GAMING PLUS WIFI', 'Gigabyte B650M GAMING WIFI', 'Gigabyte B650M DS3H', 'Gigabyte B650M AORUS ELITE AX', 'Gigabyte B650 AORUS ELITE AX V2', 'Gigabyte B650 EAGLE AX', 'ASRock B650M-HDV/M.2', 'ASRock B650M Pro RS WiFi', 'ASRock B650M PG Lightning WiFi', 'ASRock B650 Steel Legend WiFi'],
  'AM5 B850': ['ASUS PRIME B850M-A WIFI', 'ASUS TUF GAMING B850-PLUS WIFI', 'ASUS ROG STRIX B850-A GAMING WIFI', 'MSI PRO B850M-A WIFI', 'MSI MAG B850 TOMAHAWK MAX WIFI', 'Gigabyte B850M GAMING X WIFI6E', 'Gigabyte B850 AORUS ELITE WIFI7', 'ASRock B850M Pro RS WiFi', 'ASRock B850 Steel Legend WiFi'],
  'AM5 X670E/X870': ['ASUS TUF GAMING X670E-PLUS WIFI', 'ASUS TUF GAMING X870-PLUS WIFI', 'ASUS ROG STRIX X870E-E GAMING WIFI', 'MSI PRO X870-P WIFI', 'MSI MAG X870 TOMAHAWK WIFI', 'Gigabyte X870 EAGLE WIFI7', 'Gigabyte X870 AORUS ELITE WIFI7', 'ASRock X870 Steel Legend WiFi'],
  'Intel LGA1700 H610': ['ASUS PRIME H610M-E D4', 'ASUS PRIME H610M-K D4', 'MSI PRO H610M-E DDR4', 'Gigabyte H610M S2H DDR4', 'Gigabyte H610M K DDR4', 'ASRock H610M-HDV/M.2'],
  'Intel LGA1700 B760': ['ASUS PRIME B760M-A WIFI D4', 'ASUS PRIME B760M-A WIFI', 'ASUS TUF GAMING B760M-PLUS WIFI D4', 'ASUS TUF GAMING B760M-PLUS WIFI', 'ASUS ROG STRIX B760-F GAMING WIFI', 'MSI PRO B760M-A WIFI DDR4', 'MSI PRO B760M-P DDR4', 'MSI MAG B760M MORTAR WIFI', 'MSI MAG B760 TOMAHAWK WIFI', 'Gigabyte B760M DS3H DDR4', 'Gigabyte B760M GAMING X DDR4', 'Gigabyte B760M AORUS ELITE AX', 'Gigabyte B760 GAMING X AX', 'ASRock B760M-HDV/M.2 D4', 'ASRock B760M Pro RS/D4', 'ASRock B760M Steel Legend WiFi'],
  'Intel LGA1700 Z790': ['ASUS PRIME Z790-P WIFI', 'ASUS TUF GAMING Z790-PLUS WIFI', 'ASUS ROG STRIX Z790-E GAMING WIFI II', 'MSI PRO Z790-A MAX WIFI', 'MSI MAG Z790 TOMAHAWK WIFI', 'Gigabyte Z790 UD AX', 'Gigabyte Z790 AORUS ELITE AX', 'ASRock Z790 Steel Legend WiFi'],
  'Intel LGA1851 B860/Z890': ['ASUS PRIME B860M-A WIFI', 'ASUS TUF GAMING B860M-PLUS WIFI', 'MSI PRO B860M-A WIFI', 'Gigabyte B860M AORUS ELITE WIFI6E', 'ASUS TUF GAMING Z890-PLUS WIFI', 'MSI MAG Z890 TOMAHAWK WIFI', 'Gigabyte Z890 AORUS ELITE WIFI7'],
}
for (const [grupo, modelos] of Object.entries(MB)) for (const m of modelos) {
  const ddr = grupo.startsWith('AM4') ? 'DDR4'
    : grupo.startsWith('AM5') || grupo.includes('LGA1851') ? 'DDR5'
    : /D4|DDR4/.test(m) ? 'DDR4' : 'DDR5'
  const wifi = /WIFI|WiFi|AX|\/ac/i.test(m) && !/MAX(?! WIFI)/.test(m.replace('MAX WIFI', 'MAXWIFI')) ? ' · WiFi' : ''
  const tam = /M-|M |M\/|M$|M PRO|M\.2/.test(m.replace(grupo.split(' ').pop(), '')) ? ' · Micro ATX' : ' · ATX'
  add('Motherboard', grupo, m, `${grupo.split(' ').slice(0, -1).join(' ') || grupo} ${ddr}${tam}${wifi}`)
}

// ── CPU ─────────────────────────────────────────────────
const CPUS = {
  'AMD AM4 DDR4': ['AMD Ryzen 5 5500', 'AMD Ryzen 5 5600', 'AMD Ryzen 5 5600X', 'AMD Ryzen 5 5600G', 'AMD Ryzen 5 5600GT', 'AMD Ryzen 7 5700', 'AMD Ryzen 7 5700X', 'AMD Ryzen 7 5700G', 'AMD Ryzen 7 5800X', 'AMD Ryzen 7 5800X3D', 'AMD Ryzen 9 5900X'],
  'AMD AM5 DDR5': ['AMD Ryzen 5 7600', 'AMD Ryzen 5 7600X', 'AMD Ryzen 5 8500G', 'AMD Ryzen 5 8600G', 'AMD Ryzen 5 9600', 'AMD Ryzen 5 9600X', 'AMD Ryzen 7 7700', 'AMD Ryzen 7 7700X', 'AMD Ryzen 7 7800X3D', 'AMD Ryzen 7 8700G', 'AMD Ryzen 7 9700X', 'AMD Ryzen 7 9800X3D', 'AMD Ryzen 9 7900X', 'AMD Ryzen 9 9900X', 'AMD Ryzen 9 9950X', 'AMD Ryzen 9 9950X3D'],
  'Intel LGA1700': ['Intel Core i3-12100F', 'Intel Core i3-13100F', 'Intel Core i5-12400F', 'Intel Core i5-12400', 'Intel Core i5-13400F', 'Intel Core i5-14400F', 'Intel Core i5-14400', 'Intel Core i5-14600KF', 'Intel Core i7-12700F', 'Intel Core i7-14700F', 'Intel Core i7-14700K', 'Intel Core i9-14900K'],
  'Intel LGA1851': ['Intel Core Ultra 5 225F', 'Intel Core Ultra 5 245K', 'Intel Core Ultra 7 265K', 'Intel Core Ultra 9 285K'],
}
for (const [grupo, ms] of Object.entries(CPUS)) for (const m of ms) add('CPU', grupo, m, grupo)

// ── SSD ─────────────────────────────────────────────────
const SSD = [
  ['Kingston NV3', ['500GB', '1TB', '2TB'], 'NVMe Gen4'],
  ['Kingston KC3000', ['1TB', '2TB'], 'NVMe Gen4 alto rendimiento'],
  ['WD Blue SN580', ['500GB', '1TB', '2TB'], 'NVMe Gen4'],
  ['WD Black SN770', ['500GB', '1TB', '2TB'], 'NVMe Gen4'],
  ['WD Black SN850X', ['1TB', '2TB'], 'NVMe Gen4 tope'],
  ['Samsung 980', ['500GB', '1TB'], 'NVMe Gen3'],
  ['Samsung 990 EVO Plus', ['1TB', '2TB'], 'NVMe Gen4/Gen5'],
  ['Samsung 990 PRO', ['1TB', '2TB'], 'NVMe Gen4 tope'],
  ['Crucial P3 Plus', ['500GB', '1TB', '2TB'], 'NVMe Gen4'],
  ['Crucial T500', ['1TB', '2TB'], 'NVMe Gen4'],
  ['XPG GAMMIX S70 Blade', ['1TB', '2TB'], 'NVMe Gen4'],
  ['XPG Legend 710', ['512GB', '1TB'], 'NVMe Gen3'],
  ['Lexar NM790', ['1TB', '2TB'], 'NVMe Gen4'],
]
for (const [s, caps, n] of SSD) for (const c of caps) add('SSD M.2', 'NVMe', `${s} ${c} M.2 NVMe`, n)
for (const [s, caps] of [['Kingston A400', ['480GB', '960GB']], ['Crucial BX500', ['500GB', '1TB']], ['Samsung 870 EVO', ['500GB', '1TB']], ['WD Blue SA510', ['500GB', '1TB']]]) for (const c of caps) add('SSD SATA', 'SATA 2.5"', `${s} ${c} SATA`, 'SSD SATA 2.5"')

// ── FUENTES (todas las potencias por línea) ─────────────
const PSU = [
  ['Cooler Master MWE Bronze V3', [550, 600, 650, 750], '80+ Bronze'],
  ['Cooler Master MWE Gold V2', [650, 750, 850], '80+ Gold'],
  ['Cooler Master MWE Gold V2 Full Modular', [650, 750, 850, 1050], '80+ Gold modular'],
  ['Cooler Master MWE Gold V3 ATX 3.1', [750, 850, 1050], '80+ Gold · ATX 3.1 PCIe 5'],
  ['Cooler Master GX III Gold', [650, 750, 850, 1050], '80+ Gold modular · ATX 3'],
  ['Cooler Master V Gold i multi', [850, 1000], '80+ Gold modular'],
  ['Cooler Master Elite NEX White', [500, 600, 700], '80 Plus White básica'],
  ['XPG PYLON', [450, 550, 650, 750], '80+ Bronze'],
  ['XPG Core Reactor II', [650, 750, 850, 1000], '80+ Gold modular'],
  ['XPG Core Reactor II VE', [650, 750, 850], '80+ Gold · ATX 3.1'],
  ['XPG CYBERCORE II', [1000, 1300], '80+ Platinum'],
  ['Corsair CX', [550, 650, 750], '80+ Bronze'],
  ['Corsair CX{w}M', [550, 650, 750], '80+ Bronze semi-modular'],
  ['Corsair RM{w}e', [650, 750, 850, 1000], '80+ Gold modular · ATX 3.1'],
  ['Corsair RM{w}x', [750, 850, 1000, 1200], '80+ Gold modular · ATX 3.1'],
  ['Corsair HX{w}i', [1000, 1200, 1500], '80+ Platinum'],
  ['EVGA BR', [500, 600, 700], '80+ Bronze'],
  ['EVGA GQ', [650, 750, 850], '80+ Gold semi-modular'],
  ['EVGA SuperNOVA G6', [650, 750, 850, 1000], '80+ Gold modular'],
  ['MSI MAG A{w}BN', [550, 650, 750], '80+ Bronze'],
  ['MSI MAG A{w}GL PCIE5', [650, 750, 850, 1000], '80+ Gold · ATX 3.1'],
  ['MSI MPG A{w}G PCIE5', [850, 1000], '80+ Gold modular · ATX 3'],
  ['Gigabyte P{w}BS', [550, 650], '80+ Bronze'],
  ['Gigabyte UD{w}GM PG5', [750, 850, 1000], '80+ Gold modular · ATX 3'],
  ['Thermaltake Smart', [500, 600, 700], '80 Plus White básica'],
  ['Thermaltake Smart BX1', [550, 650, 750], '80+ Bronze'],
  ['Thermaltake Toughpower GF A3', [750, 850, 1050], '80+ Gold modular · ATX 3'],
  ['NZXT C Gold', [650, 750, 850, 1000], '80+ Gold modular · ATX 3.1'],
  ['Seasonic Focus GX', [650, 750, 850, 1000], '80+ Gold modular'],
  ['be quiet! Pure Power 12 M', [650, 750, 850, 1000], '80+ Gold modular · ATX 3'],
  ['Lian Li EDGE', [850, 1000, 1200], '80+ Platinum · ATX 3'],
  ['Antec NeoECO Gold', [650, 750, 850], '80+ Gold modular'],
  ['Aerocool Cylon', [500, 600, 700], '80 Plus White RGB básica'],
]
for (const [linea, ws, n] of PSU) for (const w of ws) {
  const nombre = linea.includes('{w}') ? linea.replace('{w}', w) : `${linea} ${w}W`
  add('PSU', `${w}W`, nombre, `${w}W · ${n}`)
}

// ── TARJETAS DE VIDEO ───────────────────────────────────
const NV_MARCAS = ['ASUS Dual', 'ASUS Prime', 'ASUS TUF Gaming', 'MSI Ventus 2X', 'MSI Ventus 3X', 'MSI Gaming Trio', 'Gigabyte Windforce', 'Gigabyte Eagle', 'Gigabyte Gaming OC', 'Zotac Twin Edge', 'Zotac Solid', 'PNY', 'Palit Dual', 'INNO3D Twin X2']
const NV = [
  ['RTX 3050 6GB', 'entrada'], ['RTX 3050 8GB', 'entrada'], ['RTX 4060 8GB', '1080p'], ['RTX 4060 Ti 8GB', '1080p alto'],
  ['RTX 5050 8GB', 'entrada DLSS4'], ['RTX 5060 8GB', '1080p DLSS4'], ['RTX 5060 Ti 8GB', '1080p/1440p DLSS4'], ['RTX 5060 Ti 16GB', '1440p DLSS4'],
  ['RTX 5070 12GB', '1440p DLSS4'], ['RTX 5070 Ti 16GB', '1440p/4K DLSS4'], ['RTX 5080 16GB', '4K'], ['RTX 5090 32GB', '4K tope'],
]
const ALTAS = ['RTX 5080 16GB', 'RTX 5090 32GB']
for (const [chip, n] of NV) for (const m of NV_MARCAS) {
  if (ALTAS.includes(chip) && /Dual|Prime|Twin Edge|Ventus 2X|Windforce|PNY|Palit|INNO3D/.test(m)) continue
  if (chip.startsWith('RTX 3050') && /Trio|TUF|Solid|Ventus 3X/.test(m)) continue
  add('GPU', chip.replace(/ \d+GB$/, ''), `${m.split(' ')[0]} GeForce ${chip} ${m.split(' ').slice(1).join(' ')}`.replace(/\s+/g, ' ').trim(), `NVIDIA · ${n}`)
}
const AMD_MARCAS = ['Sapphire Pulse', 'Sapphire Pure', 'Sapphire Nitro+', 'PowerColor Fighter', 'PowerColor Hellhound', 'PowerColor Reaper', 'XFX Swift', 'XFX Quicksilver', 'ASRock Challenger', 'ASRock Steel Legend', 'Gigabyte Gaming OC', 'ASUS Prime', 'ASUS TUF Gaming']
const AMD = [
  ['RX 6600 8GB', '1080p'], ['RX 7600 8GB', '1080p'], ['RX 7600 XT 16GB', '1080p/1440p'], ['RX 7700 XT 12GB', '1440p'], ['RX 7800 XT 16GB', '1440p alto'],
  ['RX 9060 XT 8GB', '1080p FSR4'], ['RX 9060 XT 16GB', '1440p FSR4'], ['RX 9070 16GB', '1440p/4K FSR4'], ['RX 9070 XT 16GB', '4K FSR4'],
]
for (const [chip, n] of AMD) for (const m of AMD_MARCAS) {
  if (chip.startsWith('RX 6600') && !/Pulse|Fighter|Swift|Challenger/.test(m)) continue
  add('GPU', chip.replace(/ \d+GB$/, ''), `${m.split(' ')[0]} Radeon ${chip} ${m.split(' ').slice(1).join(' ')}`.trim(), `AMD · ${n}`)
}
for (const [m, n] of [['Intel Arc B570 10GB', '1080p'], ['Intel Arc B580 12GB', '1080p/1440p'], ['ASRock Intel Arc B580 Challenger 12GB', '1080p/1440p'], ['Sparkle Intel Arc B580 Titan 12GB', '1080p/1440p']]) add('GPU', 'Intel Arc', m, `Intel · ${n}`)

// ── GABINETES ───────────────────────────────────────────
for (const [m, n] of [
  ['Corsair 3000D Airflow', 'ATX'], ['Corsair 4000D Airflow', 'ATX'], ['Corsair 4000D RGB Airflow', 'ATX'], ['Corsair 5000D Airflow', 'ATX grande'], ['Corsair 6500X', 'ATX doble cámara'],
  ['NZXT H5 Flow', 'ATX'], ['NZXT H6 Flow', 'ATX doble cámara'], ['NZXT H7 Flow', 'ATX grande'], ['NZXT H9 Flow', 'ATX doble cámara'],
  ['Lian Li Lancool 207', 'ATX'], ['Lian Li Lancool 216', 'ATX'], ['Lian Li O11 Dynamic EVO', 'ATX doble cámara'], ['Lian Li O11 Vision', 'ATX pecera'], ['Lian Li A3-mATX', 'Micro ATX'],
  ['Montech AIR 903 MAX', 'ATX'], ['Montech XR', 'ATX pecera'], ['Montech Sky Two', 'ATX pecera'],
  ['XPG Starker Air', 'ATX'], ['XPG Valor Air', 'ATX'], ['XPG Invader X', 'ATX pecera'],
  ['Cooler Master MasterBox Q300L', 'Micro ATX'], ['Cooler Master MasterBox TD500 Mesh V2', 'ATX'], ['Cooler Master MasterBox 520 Mesh', 'ATX'], ['Cooler Master HAF 500', 'ATX'],
  ['Thermaltake View 170 TG ARGB', 'Micro ATX'], ['Thermaltake View 270 TG ARGB', 'ATX'], ['Thermaltake Versa H18', 'Micro ATX'],
  ['MSI MAG FORGE 120A Airflow', 'ATX'], ['MSI MAG PANO 100R PZ', 'ATX pecera'], ['ASUS TUF Gaming GT302 ARGB', 'ATX'], ['ASUS A21', 'Micro ATX'],
  ['Phanteks XT Pro', 'ATX'], ['Phanteks NV5', 'ATX pecera'], ['DeepCool CH560', 'ATX'], ['DeepCool CC560 V2', 'ATX'], ['Fractal Design Pop Air', 'ATX'], ['Fractal Design North', 'ATX'],
  ['Antec NX410', 'ATX'], ['Aerocool Cylon Mini', 'Micro ATX'], ['Yeyian Mirage', 'ATX'],
]) add('Case', 'Gabinete', m, n)

// ── DISIPADORES / ENFRIAMIENTO ──────────────────────────
for (const [m, n] of [
  ['DeepCool AG400', 'aire 1 torre'], ['DeepCool AK400', 'aire 1 torre'], ['DeepCool AK400 Digital', 'aire con pantalla'], ['DeepCool AK620', 'aire doble torre'], ['DeepCool LE520 240mm', 'líquido 240'], ['DeepCool LS720 360mm', 'líquido 360'],
  ['Cooler Master Hyper 212 Black', 'aire 1 torre'], ['Cooler Master Hyper 212 Spectrum V3', 'aire RGB'], ['Cooler Master MasterLiquid 240L Core', 'líquido 240'], ['Cooler Master MasterLiquid 360L Core', 'líquido 360'],
  ['Thermalright Assassin X 120 Refined SE', 'aire económico'], ['Thermalright Peerless Assassin 120 SE', 'aire doble torre'], ['Thermalright Phantom Spirit 120 SE', 'aire doble torre'], ['Thermalright Aqua Elite 240 V3', 'líquido 240'], ['Thermalright Aqua Elite 360 V3', 'líquido 360'],
  ['ID-COOLING SE-224-XTS', 'aire 1 torre'], ['ID-COOLING FROZN A410', 'aire 1 torre'],
  ['ARCTIC Freezer 36', 'aire 1 torre'], ['ARCTIC Liquid Freezer III 240', 'líquido 240'], ['ARCTIC Liquid Freezer III 360', 'líquido 360'],
  ['Corsair Nautilus 240 RS ARGB', 'líquido 240'], ['Corsair Nautilus 360 RS ARGB', 'líquido 360'], ['Corsair iCUE LINK TITAN 360 RX', 'líquido 360 premium'],
  ['NZXT Kraken 240', 'líquido 240'], ['NZXT Kraken 360', 'líquido 360'], ['NZXT Kraken Elite 360', 'líquido con pantalla'],
  ['Noctua NH-U12S redux', 'aire'], ['Noctua NH-D15 G2', 'aire tope'], ['be quiet! Pure Rock 2', 'aire'], ['XPG Levante X 240', 'líquido 240'], ['MSI MAG CORELIQUID A13 240', 'líquido 240'],
]) add('Cooler', 'Enfriamiento', m, n)

export const BASE_COMPONENTES = out

export function normalizarBusqueda(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[-_/().]/g, ' ').replace(/\s+/g, ' ').trim()
}

// Busca en el catálogo propio y en la base. Todas las palabras escritas deben aparecer.
export function buscarComponentes(texto, catalogo, max = 10) {
  const palabras = normalizarBusqueda(texto).split(' ').filter(Boolean)
  if (!palabras.length) return []
  const puntaje = c => {
    const nombre = normalizarBusqueda(c.nombre)
    const t = `${nombre} ${normalizarBusqueda(c.grupo || '')} ${normalizarBusqueda(c.categoria)}`
    const compacto = nombre.replace(/ /g, '')
    let pts = 0
    for (const p of palabras) {
      if (new RegExp(`(^| )${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(t)) pts += 2
      else if (t.includes(p) || compacto.includes(p)) pts += 1
      else return -1
    }
    return pts
  }
  const conPuntaje = (lista, origen) => lista.map(c => ({ ...c, origen, pts: puntaje(c) })).filter(c => c.pts >= 0)
  const nombres = new Set(catalogo.map(c => normalizarBusqueda(c.nombre)))
  const enCatalogo = conPuntaje(catalogo, 'catalogo')
  const enBase = conPuntaje(BASE_COMPONENTES.filter(c => !nombres.has(normalizarBusqueda(c.nombre))), 'base')
  const orden = (a, b) => b.pts - a.pts || a.nombre.length - b.nombre.length
  return [...enCatalogo.sort(orden), ...enBase.sort(orden)].slice(0, max)
}
