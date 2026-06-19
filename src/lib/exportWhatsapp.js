import { formatMXN } from './pricing'

const ALIASES = {
  CPU: 'Procesador',
  GPU: 'Tarjeta de Video',
  RAM: 'Memoria RAM',
  Motherboard: 'Placa Madre',
  'SSD M.2': 'SSD M.2',
  'SSD SATA': 'SSD SATA',
  HDD: 'Disco Duro',
  PSU: 'Fuente de Poder',
  Case: 'Gabinete',
  Cooler: 'Enfriamiento',
  Otro: 'Otro',
}

export function generarTextoWhatsapp(quote, components, config = {}) {
  const hoy = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
  const vigenciaDias = config.vigenciaDias || 7
  const fechaVence = new Date(quote.creadoEn || Date.now())
  fechaVence.setDate(fechaVence.getDate() + vigenciaDias)
  const venceStr = fechaVence.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })

  const lineas = [
    `🖥️ *COTIZACIÓN — ${quote.nombre}*`,
    `📅 ${hoy}`,
    '',
    '*Componentes:*',
  ]

  quote.items.forEach(item => {
    const comp = components.find(c => c.id === item.componenteId)
    if (!comp) return
    const precioIva = parseFloat(item.precioConIva) || Math.round((comp.precio || 0) * 1.16)
    const cat = ALIASES[comp.categoria] || comp.categoria
    const subtotal = precioIva * item.cantidad
    const cantStr = item.cantidad > 1 ? ` x${item.cantidad}` : ''
    lineas.push(`• *${cat}:* ${comp.nombre}${cantStr} — ${formatMXN(subtotal)}`)
    if (comp.sku) lineas.push(`  _Ref: ${comp.sku}_`)
  })

  lineas.push('')
  lineas.push(`💰 *Subtotal componentes:* ${formatMXN(quote.subtotalConIva)}`)
  lineas.push(`🔧 *Armado:* ${formatMXN(quote.armadoConIva)}`)
  if (quote.costoEnvio > 0) lineas.push(`🚚 *Envío:* ${formatMXN(quote.costoEnvio)}`)
  lineas.push(`✅ *TOTAL: ${formatMXN(quote.total)}*`)
  if (quote.notas?.trim()) {
    lineas.push('')
    lineas.push(`📝 _${quote.notas.trim()}_`)
  }
  lineas.push('')
  lineas.push(`_Precios incluyen IVA. Válida hasta el ${venceStr}._`)
  lineas.push('_Plazo de entrega: 7 a 10 días hábiles tras confirmar pedido y anticipo._')
  lineas.push('_Se requiere 50% de anticipo para iniciar el armado._')
  lineas.push('_Garantía de 3 meses sobre el armado._')

  return lineas.join('\n')
}
