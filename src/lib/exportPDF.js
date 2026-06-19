import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatMXN } from './pricing'

const AZUL = [30, 62, 191]
const VERDE = [42, 110, 42]
const BLANCO = [255, 255, 255]
const GRIS_CLARO = [245, 245, 245]
const GRIS_MED = [180, 180, 180]

const ALIASES = { CPU: 'Procesador', GPU: 'Tarjeta de Video', RAM: 'Memoria RAM', Motherboard: 'Placa Madre', 'SSD M.2': 'SSD M.2 NVMe', 'SSD SATA': 'SSD SATA 2.5"', HDD: 'Disco Duro HDD', PSU: 'Fuente de Poder', Case: 'Gabinete', Cooler: 'Enfriamiento', Otro: 'Otro' }

const cargarImagen = (url) => new Promise((resolve) => {
  const img = new Image()
  img.onload = () => resolve(img)
  img.onerror = () => resolve(null)
  img.src = url
})

function getPrecioItem(item, comp) {
  if (item.precioConIva) return parseFloat(item.precioConIva) || 0
  if (comp?.precio) return Math.round(comp.precio * 1.16)
  return 0
}

export async function generarPDF(quote, components, config) {
  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.width
  const pageH = doc.internal.pageSize.height
  const hoy = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
  const folio = quote.id?.slice(0, 8).toUpperCase() || 'N/A'

  // ── ENCABEZADO ──────────────────────────────────────────
  doc.setFillColor(...AZUL)
  doc.rect(0, 0, pageW, 42, 'F')

  // Logo
  const logo = await cargarImagen('/logo.png')
  if (logo) {
    const ratio = logo.width / logo.height
    const logoH = 32
    const logoW = logoH * ratio
    doc.addImage(logo, 'PNG', pageW - logoW - 12, 5, logoW, logoH)
  }

  doc.setTextColor(...BLANCO)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(config.negocio || 'Cotización', 14, 16)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  if (config.whatsapp) doc.text(`WhatsApp: +${config.whatsapp}`, 14, 24)
  doc.text(`Fecha: ${hoy}`, 14, 31)
  doc.text(`Folio: #${folio}`, 14, 38)

  // ── INFO COTIZACIÓN + CLIENTE ────────────────────────────
  let y = 50

  // Caja izquierda: cotización
  doc.setFillColor(...GRIS_CLARO)
  doc.roundedRect(12, y, 85, 28, 3, 3, 'F')
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('COTIZACIÓN', 18, y + 8)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(quote.nombre || 'Sin nombre', 18, y + 17)
  doc.setFontSize(8)
  doc.setTextColor(...GRIS_MED)
  doc.text(`Generado el ${hoy}`, 18, y + 24)

  // Caja derecha: cliente
  if (quote.cliente?.nombre) {
    doc.setFillColor(...GRIS_CLARO)
    doc.roundedRect(105, y, 93, 28, 3, 3, 'F')
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('CLIENTE', 111, y + 8)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(quote.cliente.nombre, 111, y + 17)
  }

  y += 36

  // ── TABLA DE COMPONENTES ────────────────────────────────
  const rows = quote.items.map(item => {
    const comp = components.find(c => c.id === item.componenteId)
    const precio = getPrecioItem(item, comp)
    const subtotal = precio * item.cantidad
    return [
      ALIASES[comp?.categoria] || comp?.categoria || '—',
      comp?.nombre || 'Componente eliminado',
      item.cantidad,
      precio > 0 ? formatMXN(precio) : '—',
      subtotal > 0 ? formatMXN(subtotal) : '—',
    ]
  }).filter(Boolean)

  autoTable(doc, {
    startY: y,
    head: [['Categoría', 'Componente', 'Cant.', 'Precio c/IVA', 'Subtotal']],
    body: rows,
    headStyles: { fillColor: VERDE, textColor: BLANCO, fontStyle: 'bold', fontSize: 9 },
    alternateRowStyles: { fillColor: GRIS_CLARO },
    styles: { fontSize: 9, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 30 },
      2: { cellWidth: 14, halign: 'center' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 30, halign: 'right' },
    },
  })

  const finalY = doc.lastAutoTable.finalY + 8

  // ── TOTALES ─────────────────────────────────────────────
  const totalesData = [
    ['Subtotal componentes (c/IVA)', formatMXN(quote.subtotalConIva)],
    ['Armado de PC (c/IVA)', formatMXN(quote.armadoConIva)],
    ...(quote.costoEnvio > 0 ? [['Envío', formatMXN(quote.costoEnvio)]] : []),
    ['TOTAL', formatMXN(quote.total)],
  ]
  const filaTotal = totalesData.length - 1

  autoTable(doc, {
    startY: finalY,
    body: totalesData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 90, fontStyle: 'bold', textColor: [60, 60, 60] },
      1: { cellWidth: 40, halign: 'right', textColor: [60, 60, 60] },
    },
    margin: { left: pageW - 145 },
    didParseCell: (data) => {
      if (data.row.index === filaTotal) {
        data.cell.styles.fillColor = AZUL
        data.cell.styles.textColor = BLANCO
        data.cell.styles.fontStyle = 'bold'
        data.cell.styles.fontSize = 13
        data.cell.styles.cellPadding = 5
      }
    },
  })

  // ── NOTAS ───────────────────────────────────────────────
  let noteStartY = doc.lastAutoTable.finalY + 10
  if (quote.notas && quote.notas.trim()) {
    if (noteStartY < pageH - 40) {
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(60, 60, 60)
      doc.text('Notas:', 14, noteStartY)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(80, 80, 80)
      const lineas = doc.splitTextToSize(quote.notas.trim(), pageW - 28)
      doc.text(lineas, 14, noteStartY + 5)
      noteStartY += 5 + lineas.length * 4 + 4
    }
  }

  // ── NOTA AL PIE ─────────────────────────────────────────
  const vigenciaDias = config.vigenciaDias || 7
  const fechaVence = new Date(quote.creadoEn || Date.now())
  fechaVence.setDate(fechaVence.getDate() + vigenciaDias)
  const venceStr = fechaVence.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
  if (noteStartY < pageH - 25) {
    doc.setFontSize(8)
    doc.setTextColor(...GRIS_MED)
    doc.setFont('helvetica', 'italic')
    doc.text(`* Precios con IVA incluido. Cotización válida hasta el ${venceStr} (${vigenciaDias} días).`, 14, noteStartY)
  }

  // ── PIE DE PÁGINA ────────────────────────────────────────
  doc.setFillColor(...AZUL)
  doc.rect(0, pageH - 14, pageW, 14, 'F')
  doc.setTextColor(...BLANCO)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(config.negocio + (config.whatsapp ? `  ·  WhatsApp: +${config.whatsapp}` : ''), 14, pageH - 5)
  doc.text(`Folio #${folio}`, pageW - 14, pageH - 5, { align: 'right' })

  doc.save(`cotizacion_${quote.nombre.replace(/\s+/g, '_')}_${folio}.pdf`)
}
