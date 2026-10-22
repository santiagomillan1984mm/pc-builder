// Contrato de compra y armado de PC (para imprimir y firmar al dar el anticipo).
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatMXN } from './pricing'

const AZUL = [30, 62, 191]
const BLANCO = [255, 255, 255]
const GRIS = [245, 245, 245]
const TEXTO = [40, 40, 40]

const ALIASES = { CPU: 'Procesador', GPU: 'Tarjeta de video', RAM: 'Memoria RAM', Motherboard: 'Placa madre', 'SSD M.2': 'SSD M.2 NVMe', 'SSD SATA': 'SSD SATA', HDD: 'Disco duro', PSU: 'Fuente de poder', Case: 'Gabinete', Cooler: 'Enfriamiento', Otro: 'Otro' }

export const CONTRATO_DEFAULTS = {
  anticipoPct: 50,
  diasPiezas: 7,
  diasArmado: 3,
  garantiaArmadoDias: 90,
  diasRecoger: 30,
  costoAlmacenaje: 20,
}

// Suma días hábiles (lunes a viernes)
export function sumarDiasHabiles(fecha, dias) {
  const d = new Date(fecha)
  let n = 0
  while (n < dias) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) n++
  }
  return d
}

const fechaLarga = d => d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })

function precioItem(item, comp) {
  if (item.precioConIva) return parseFloat(item.precioConIva) || 0
  if (comp?.precio) return Math.round(comp.precio * 1.16)
  return 0
}

const cargarImagen = url => new Promise(resolve => {
  const img = new Image()
  img.onload = () => resolve(img)
  img.onerror = () => resolve(null)
  img.src = url
})

// datos: { cliente: {nombre, telefono, correo}, anticipoPct, diasPiezas, diasArmado, fechaFirma, notas }
export async function generarContrato(quote, components, config, datos, modo = 'imprimir') {
  const c = { ...CONTRATO_DEFAULTS, ...config, ...datos }
  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.width
  const pageH = doc.internal.pageSize.height
  const M = 14
  const anchoTexto = pageW - M * 2
  const folio = quote.id?.slice(0, 8).toUpperCase() || 'N/A'
  const negocio = config.negocio || 'Cabo GameSpot'
  const firma = c.fechaFirma ? new Date(c.fechaFirma + 'T12:00:00') : new Date()
  const total = Number(quote.total) || 0
  const anticipo = Math.round(total * Number(c.anticipoPct) / 100)
  const saldo = total - anticipo
  const llegada = sumarDiasHabiles(firma, Number(c.diasPiezas))
  const entrega = sumarDiasHabiles(llegada, Number(c.diasArmado))

  // ── Encabezado ──
  doc.setFillColor(...AZUL)
  doc.rect(0, 0, pageW, 30, 'F')
  const logo = await cargarImagen('/logo.png')
  if (logo) {
    const h = 22, w = h * (logo.width / logo.height)
    doc.addImage(logo, 'PNG', pageW - w - 10, 4, w, h)
  }
  doc.setTextColor(...BLANCO)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(13)
  doc.text('CONTRATO DE COMPRA Y ARMADO DE EQUIPO DE CÓMPUTO', M, 12)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9)
  doc.text(`${negocio} · Cabo San Lucas, B.C.S.${config.whatsapp ? ` · WhatsApp +${config.whatsapp}` : ''}`, M, 19)
  doc.text(`Folio #${folio} · Fecha: ${fechaLarga(firma)}`, M, 25)

  let y = 38
  doc.setTextColor(...TEXTO)

  // ── Datos del cliente ──
  doc.setFillColor(...GRIS)
  doc.roundedRect(M, y, anchoTexto, 18, 2, 2, 'F')
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9)
  doc.text('CLIENTE', M + 4, y + 6)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
  doc.text(`Nombre: ${c.cliente?.nombre || '______________________________'}`, M + 4, y + 13)
  doc.text(`Tel: ${c.cliente?.telefono || '______________'}`, M + 100, y + 13)
  if (c.cliente?.correo) { doc.setFontSize(8); doc.text(`Correo: ${c.cliente.correo}`, M + 100, y + 6.5) }
  y += 24

  // ── Cláusula 1: equipo ──
  const titulo = t => {
    if (y > pageH - 30) { doc.addPage(); y = 20 }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...AZUL)
    doc.text(t, M, y); y += 5
    doc.setTextColor(...TEXTO); doc.setFont('helvetica', 'normal'); doc.setFontSize(9)
  }
  const parrafo = txt => {
    const lineas = doc.splitTextToSize(txt, anchoTexto)
    if (y + lineas.length * 4.2 > pageH - 18) { doc.addPage(); y = 20 }
    doc.text(lineas, M, y); y += lineas.length * 4.2 + 2
  }

  titulo(`1. EQUIPO QUE SE COMPRA${quote.nombre ? ` — ${quote.nombre}` : ''}`)
  const filas = (quote.items || []).map(item => {
    const comp = components.find(x => x.id === item.componenteId)
    const p = precioItem(item, comp)
    return [ALIASES[comp?.categoria] || comp?.categoria || '—', comp?.nombre || 'Componente', item.cantidad, p ? formatMXN(p * item.cantidad) : '—']
  })
  const extras = [
    ['', 'Armado, instalación y pruebas', '', formatMXN(quote.armadoConIva || 0)],
    ...(quote.costoEnvio > 0 ? [['', 'Envío', '', formatMXN(quote.costoEnvio)]] : []),
  ]
  autoTable(doc, {
    startY: y,
    head: [['Categoría', 'Componente (marca y modelo)', 'Cant.', 'Importe']],
    body: [...filas, ...extras],
    foot: [['', 'TOTAL (IVA incluido)', '', formatMXN(total)]],
    headStyles: { fillColor: AZUL, textColor: BLANCO, fontSize: 8.5 },
    footStyles: { fillColor: [230, 236, 255], textColor: TEXTO, fontStyle: 'bold', fontSize: 10 },
    styles: { fontSize: 8.5, cellPadding: 2.2 },
    columnStyles: { 0: { cellWidth: 30 }, 2: { cellWidth: 13, halign: 'center' }, 3: { cellWidth: 28, halign: 'right' } },
    margin: { left: M, right: M },
  })
  y = doc.lastAutoTable.finalY + 6

  titulo('2. PRECIO Y FORMA DE PAGO')
  parrafo(`Precio total: ${formatMXN(total)} (IVA incluido). El cliente entrega un anticipo del ${c.anticipoPct}%, equivalente a ${formatMXN(anticipo)}, al firmar este contrato. El saldo de ${formatMXN(saldo)} se paga al momento de la entrega del equipo. El anticipo se destina a la compra de las piezas a nombre del cliente.`)

  titulo('3. TIEMPOS DE ENTREGA')
  parrafo(`Las piezas tardan aproximadamente ${c.diasPiezas} días hábiles en llegar a partir del anticipo. El armado, la instalación y las pruebas toman aproximadamente ${c.diasArmado} días hábiles después de recibir todas las piezas. Fecha estimada de entrega: ${fechaLarga(entrega)}. Estos tiempos son estimados: los retrasos de proveedores o paquetería no son imputables a ${negocio}, que avisará al cliente en cuanto tenga conocimiento de ellos.`)

  titulo('4. DISPONIBILIDAD Y CAMBIOS DE PRECIO')
  parrafo(`Si algún componente se agota, se descontinúa o cambia de precio de forma importante antes de su compra, ${negocio} propondrá una alternativa de desempeño igual o superior. El cliente decide si la acepta; cualquier diferencia de precio se ajusta en el saldo.`)

  titulo('5. CANCELACIÓN')
  parrafo(`El cliente puede cancelar el pedido. Si las piezas aún no se han comprado, se le devuelve el anticipo completo. Si ya fueron compradas, se descontará del anticipo el costo de las piezas que el proveedor no acepte de regreso y los gastos de envío o devolución que se generen; el resto se le reembolsa. Las piezas no devueltas quedan a disposición del cliente.`)

  titulo('6. GARANTÍA')
  parrafo(`a) Armado: ${c.garantiaArmadoDias} días a partir de la entrega, sobre la mano de obra, las conexiones y la instalación realizadas por ${negocio}.`)
  parrafo(`b) Componentes: cuentan con la garantía de su fabricante (generalmente de 1 a 3 años según la pieza). ${negocio} realiza el trámite ante el proveedor o fabricante en nombre del cliente; los tiempos de revisión y reemplazo dependen del fabricante.`)
  parrafo('c) Para hacer válida la garantía se debe presentar este contrato y el equipo sin modificaciones ni reparaciones de terceros.')

  titulo('7. LA GARANTÍA NO CUBRE')
  parrafo('Daños causados por variaciones de voltaje, apagones o descargas eléctricas; golpes, caídas o derrames de líquidos; equipos abiertos, modificados o reparados por terceros; sobrecalentamiento por falta de limpieza o mala ventilación; fallas de software, virus o programas instalados por el cliente; ni el desgaste normal por uso.')

  titulo('8. RECOMENDACIÓN ELÉCTRICA')
  parrafo('Se recomienda conectar el equipo a un regulador de voltaje o a un no-break (UPS) de capacidad adecuada para protegerlo de variaciones eléctricas.')
  if (y > pageH - 30) { doc.addPage(); y = 20 }
  doc.rect(M, y - 3.2, 4, 4)
  doc.text('El cliente fue informado de esta recomendación.', M + 7, y); y += 7

  titulo('9. ENTREGA Y RECOLECCIÓN')
  parrafo(`Al recibir el equipo, el cliente revisa que encienda y funcione correctamente. El cliente cuenta con ${c.diasRecoger} días naturales a partir del aviso de que su equipo está listo para recogerlo; pasado ese plazo se cobrarán $${c.costoAlmacenaje} por día de almacenaje y ${negocio} no se hace responsable por daños no atribuibles al taller.`)

  titulo('10. SOFTWARE')
  parrafo('Las licencias de software (sistema operativo, programas o juegos) no están incluidas salvo que aparezcan en la tabla de la cláusula 1.')

  if (c.notas?.trim()) { titulo('11. ACUERDOS ADICIONALES'); parrafo(c.notas.trim()) }

  // ── Firmas ──
  if (y > pageH - 50) { doc.addPage(); y = 30 } else y += 10
  doc.setFontSize(9)
  parrafo('Ambas partes leen y aceptan las condiciones de este contrato.')
  y += 16
  const col = (pageW - M * 2) / 2
  doc.line(M + 8, y, M + col - 8, y)
  doc.line(M + col + 8, y, pageW - M - 8, y)
  doc.text('Firma del cliente', M + col / 2, y + 5, { align: 'center' })
  doc.text(c.cliente?.nombre || '', M + col / 2, y + 10, { align: 'center' })
  doc.text(`Por ${negocio}`, M + col + col / 2, y + 5, { align: 'center' })

  // ── Pie en todas las páginas ──
  const paginas = doc.internal.getNumberOfPages()
  for (let i = 1; i <= paginas; i++) {
    doc.setPage(i)
    doc.setFillColor(...AZUL); doc.rect(0, pageH - 10, pageW, 10, 'F')
    doc.setTextColor(...BLANCO); doc.setFontSize(7.5)
    doc.text(`${negocio} · Folio #${folio}`, M, pageH - 4)
    doc.text(`Página ${i} de ${paginas}`, pageW - M, pageH - 4, { align: 'right' })
  }

  const nombreArchivo = `contrato_${(c.cliente?.nombre || quote.nombre || 'cliente').replace(/\s+/g, '_')}_${folio}.pdf`
  if (modo === 'descargar') doc.save(nombreArchivo)
  else {
    doc.autoPrint()
    const url = doc.output('bloburl')
    const w = window.open(url, '_blank')
    if (!w) doc.save(nombreArchivo)
  }
}
