const IVA = 0.16

export function precioConIva(precio) {
  return Math.round(precio * (1 + IVA))
}

export function calcularSubtotal(items, components) {
  return items.reduce((sum, item) => {
    const comp = components.find(c => c.id === item.componenteId)
    if (!comp) return sum
    return sum + comp.precio * item.cantidad
  }, 0)
}

export function sugerirArmado(subtotalSinIva, config) {
  return subtotalSinIva < config.umbralPCBasica
    ? config.armadoBasico
    : config.armadoEstandar
}

export function calcularTotal(subtotalSinIva, costoArmadoSinIva) {
  const subtotalConIva = precioConIva(subtotalSinIva)
  const armadoConIva = precioConIva(costoArmadoSinIva)
  return { subtotalConIva, armadoConIva, total: subtotalConIva + armadoConIva }
}

export function formatMXN(n) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
}
