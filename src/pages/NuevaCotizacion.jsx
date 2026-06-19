import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { sugerirArmado, calcularTotal, formatMXN } from '../lib/pricing'
import { generarPDF } from '../lib/exportPDF'
import { generarTextoWhatsapp } from '../lib/exportWhatsapp'

const ALIASES = { CPU: 'Procesador', GPU: 'Tarjeta de Video', RAM: 'Memoria RAM', Motherboard: 'Placa Madre', 'SSD M.2': 'SSD M.2 NVMe', 'SSD SATA': 'SSD SATA 2.5"', HDD: 'Disco Duro HDD', PSU: 'Fuente de Poder', Case: 'Gabinete', Cooler: 'Enfriamiento', Otro: 'Otro' }
const CAT_ORDER = ['CPU','GPU','RAM','Motherboard','SSD M.2','SSD SATA','HDD','PSU','Case','Cooler','Otro']

function urlCP(comp) {
  if (comp.urlCyberpuerta) return comp.urlCyberpuerta
  return `https://www.google.com/search?q=${encodeURIComponent(`cyberpuerta ${comp.nombre} ${comp.sku || ''}`)}`
}

function urlZG(comp) {
  if (comp.urlZegucom) return comp.urlZegucom
  if (comp.sku) return `https://www.google.com/search?q=${encodeURIComponent(`zegucom ${comp.nombre} ${comp.sku}`)}`
  return null
}

function plantillas(quote, components, clienteNombre) {
  const nombre = clienteNombre?.split(' ')[0] || clienteNombre || 'Cliente'
  const anticipo = quote.total ? `$${Math.round(quote.total / 2).toLocaleString('es-MX')}` : '50%'
  return [
    {
      id: 'cotizacion',
      label: '📋 Cotización',
      texto: generarTextoWhatsapp(quote, components),
    },
    {
      id: 'anticipo',
      label: '💰 Pedir anticipo',
      texto: `Hola ${nombre}! Perfecto, queda confirmada tu PC 🙌\n\nPara arrancar necesito el 50% de anticipo: *${anticipo}*.\nUna vez confirmado el pago, la PC queda lista en 7 a 10 días hábiles.\n\n¿Cómo preferís pagar? (transferencia o efectivo). Saludos!`,
    },
    {
      id: 'seguimiento',
      label: '🔔 Seguimiento',
      texto: `Hola ${nombre}! Te quería consultar si pudiste ver la cotización que te mandé para tu PC. Quedo a disposición para cualquier duda o ajuste. Saludos!`,
    },
    {
      id: 'precios',
      label: '⚠️ Precios actualizados',
      texto: `Hola ${nombre}! Te aviso que los precios de algunos componentes se actualizaron. Te mando la cotización con los valores al día de hoy 👇`,
    },
    {
      id: 'lista',
      label: '🖥️ PC lista',
      texto: `Hola ${nombre}! Tu PC ya está armada y lista! 🎉\n\nEl saldo restante es *${anticipo}* (50% final).\nCoordinamos para el retiro/entrega cuando gustes. Saludos!`,
    },
    {
      id: 'libre',
      label: '✏️ Mensaje libre',
      texto: `Hola ${nombre}! `,
    },
  ]
}

export default function NuevaCotizacion({ components, quotes, setQuotes, config, setPagina, draft, setDraft, resetDraft, favoritos, setFavoritos, presets, setPresets }) {
  // State local de UI (no necesita persistir)
  const [categoriasExpandidas, setCategoriasExpandidas] = useState([])
  const [plantillaActiva, setPlantillaActiva] = useState(null)
  const [mensajeTexto, setMensajeTexto] = useState('')
  const [buscandoPrecio, setBuscandoPrecio] = useState({}) // { componenteId: true }

  // Valores del draft (persisten al navegar)
  const { nombre, clienteNombre, clienteTel, items, armadoOverride, envio, notas } = draft
  const set = (key) => (val) => setDraft(d => ({ ...d, [key]: val }))
  const setNombre = set('nombre')
  const setClienteNombre = set('clienteNombre')
  const setClienteTel = set('clienteTel')
  const setItems = (fn) => setDraft(d => ({ ...d, items: typeof fn === 'function' ? fn(d.items) : fn }))
  const setArmadoOverride = set('armadoOverride')
  const setEnvio = set('envio')
  const setNotas = set('notas')

  const subtotalConIva = items.reduce((acc, item) => acc + (parseFloat(item.precioConIva) || 0) * item.cantidad, 0)
  const subtotalSinIva = subtotalConIva / 1.16
  const armadoSugerido = sugerirArmado(subtotalSinIva, config)
  const costoArmado = armadoOverride !== '' ? parseFloat(armadoOverride) || 0 : armadoSugerido
  const { armadoConIva, total: totalSinEnvio } = calcularTotal(subtotalSinIva, costoArmado)
  const costoEnvio = parseFloat(envio) || 0
  const total = totalSinEnvio + costoEnvio

  function toggleCategoria(cat) {
    setCategoriasExpandidas(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  function toggleFavorito(compId, e) {
    e.stopPropagation()
    const next = new Set(favoritos)
    if (next.has(compId)) next.delete(compId)
    else next.add(compId)
    setFavoritos(next)
  }

  function agregarComponente(compId) {
    const comp = components.find(c => c.id === compId)
    if (!comp) return
    const existe = items.find(i => i.componenteId === compId)
    const precioConIva = comp.precio ? String(Math.round(comp.precio * 1.16)) : ''
    if (existe) {
      setItems(prev => prev.map(i => i.componenteId === compId ? { ...i, cantidad: i.cantidad + 1 } : i))
    } else {
      setItems(prev => [...prev, { componenteId: compId, cantidad: 1, precioConIva }])
    }
  }

  const quitarItem = (id) => setItems(prev => prev.filter(i => i.componenteId !== id))

  const buscarPrecio = async (comp) => {
    if (!comp.sku) return
    setBuscandoPrecio(prev => ({ ...prev, [comp.id]: true }))
    try {
      const res = await fetch('/api/scrape-one', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: comp.id, sku: comp.sku, categoria: comp.categoria }),
      })
      const data = await res.json()
      if (!data.ok) return
      const precios = [data.precioCyberpuerta, data.precioZegucom].filter(Boolean)
      if (precios.length === 0) return
      const minConIva = Math.min(...precios)
      actualizarPrecio(comp.id, String(minConIva))
    } catch {
      // silencioso — el campo queda como estaba
    } finally {
      setBuscandoPrecio(prev => ({ ...prev, [comp.id]: false }))
    }
  }
  const actualizarPrecio = (componenteId, valor) => setItems(prev => prev.map(i => i.componenteId === componenteId ? { ...i, precioConIva: valor } : i))
  const actualizarCantidad = (componenteId, valor) => setItems(prev => prev.map(i => i.componenteId === componenteId ? { ...i, cantidad: parseInt(valor) || 1 } : i))

  const buildQuote = (extra = {}) => ({
    id: uuid(),
    nombre: nombre || 'Sin nombre',
    notas: notas || '',
    cliente: { nombre: clienteNombre, telefono: clienteTel },
    items: items.map(item => ({ ...item, precioConIva: parseFloat(item.precioConIva) || 0 })),
    costoArmado,
    subtotalConIva,
    armadoConIva,
    costoEnvio,
    total,
    creadoEn: new Date().toISOString(),
    preciosManual: true,
    ...extra,
  })

  const handleGuardar = () => {
    setQuotes([...quotes, buildQuote()])
    resetDraft()
    setPagina('cotizaciones')
  }

  const handleVendida = () => {
    setQuotes([...quotes, buildQuote({ vendida: true })])
    resetDraft()
    setPagina('cotizaciones')
  }

  const handlePDF = async () => {
    await generarPDF(buildQuote(), components, config)
  }

  const seleccionarPlantilla = (p) => {
    setPlantillaActiva(p.id)
    setMensajeTexto(p.texto)
  }

  const enviarWA = () => {
    const tel = clienteTel.replace(/\D/g, '')
    if (!tel) { alert('Ingresá el teléfono del cliente primero.'); return }
    window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(mensajeTexto)}`, '_blank')
  }

  const copiarWA = () => {
    navigator.clipboard.writeText(mensajeTexto)
    alert('¡Texto copiado! Pegalo en WhatsApp.')
  }

  const hayItems = items.length > 0
  const hayTotal = subtotalConIva > 0
  const quoteActual = hayItems ? buildQuote() : null
  const pls = quoteActual ? plantillas(quoteActual, components, clienteNombre) : []

  // Componentes por categoría
  const compsPorCategoria = (cat) => components.filter(c => c.categoria === cat)
  const itemIds = new Set(items.map(i => i.componenteId))

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <h2 style={{ color: '#1E3EBF', marginBottom: 20 }}>Nueva Cotización</h2>

      {/* Datos básicos */}
      <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 20, marginBottom: 16 }}>
        <h4 style={{ margin: '0 0 14px', color: '#333', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.4 }}>Datos de la cotización</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <label style={labelStyle}>
            Nombre de la cotización
            <input value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} placeholder="Ej: PC Gaming Mid-Range" />
          </label>
          <label style={labelStyle}>
            Nombre del cliente
            <input value={clienteNombre} onChange={e => setClienteNombre(e.target.value)} style={inputStyle} placeholder="Ej: Juan Pérez" />
          </label>
          <label style={labelStyle}>
            Teléfono del cliente
            <input value={clienteTel} onChange={e => setClienteTel(e.target.value)} style={inputStyle} placeholder="Ej: 6241234567" />
          </label>
        </div>
        <label style={{ ...labelStyle, marginTop: 12 }}>
          Notas internas (opcional — aparecen en PDF y WhatsApp)
          <textarea value={notas || ''} onChange={e => setNotas(e.target.value)} rows={2} placeholder="Ej: cliente quiere RGB, tiene monitor 1440p, presupuesto máx $25k…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
        </label>
      </div>

      {/* Selector de componentes */}
      <div style={{ background: '#f0f4ff', border: '1px solid #c8d5f8', borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <h4 style={{ margin: '0 0 12px', color: '#1E3EBF', fontSize: 14 }}>
          Agregar componentes
          <span style={{ fontWeight: 400, color: '#6b7280', marginLeft: 8, fontSize: 12 }}>Click para agregar · ⭐ para marcar/desmarcar clásico</span>
        </h4>

        {/* ── Sección Clásicos ── */}
        {favoritos && favoritos.size > 0 && (() => {
          const clasicosDisp = CAT_ORDER.flatMap(cat =>
            components.filter(c => c.categoria === cat && favoritos.has(c.id))
          )
          if (clasicosDisp.length === 0) return null
          const clasicosPorCat = CAT_ORDER.map(cat => ({
            cat,
            comps: clasicosDisp.filter(c => c.categoria === cat),
          })).filter(g => g.comps.length > 0)
          return (
            <div style={{ border: '2px solid #fbbf24', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ background: '#fef3c7', padding: '8px 14px', borderBottom: '1px solid #fbbf24', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 700, color: '#92400e', fontSize: 13 }}>⭐ Clásicos gama media</span>
                <span style={{ color: '#b45309', fontSize: 12 }}>— los más usados</span>
              </div>
              <div style={{ padding: '10px 14px', background: '#fffbeb', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {clasicosPorCat.map(({ cat, comps }) => (
                  <div key={cat} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#92400e', background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: 4, padding: '3px 7px', whiteSpace: 'nowrap', marginTop: 2 }}>
                      {ALIASES[cat] || cat}
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {comps.map(c => {
                        const yaAgregado = itemIds.has(c.id)
                        return (
                          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 0, borderRadius: 6, overflow: 'hidden', border: yaAgregado ? '1px solid #a8d5a2' : '1px solid #fbbf24' }}>
                            <button
                              onClick={() => !yaAgregado && agregarComponente(c.id)}
                              style={{
                                padding: '5px 10px', border: 'none', cursor: yaAgregado ? 'default' : 'pointer',
                                background: yaAgregado ? '#f0fdf4' : '#fffbeb',
                                color: yaAgregado ? '#2A6E2A' : '#92400e',
                                fontSize: 12, fontWeight: 500,
                              }}
                            >
                              {yaAgregado ? '✓ ' : '+ '}{c.nombre}
                            </button>
                            <button
                              onClick={(e) => toggleFavorito(c.id, e)}
                              title="Quitar de clásicos"
                              style={{ padding: '5px 7px', border: 'none', cursor: 'pointer', background: '#fef3c7', color: '#f59e0b', fontSize: 12, borderLeft: '1px solid #fbbf24' }}
                            >⭐</button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}

        {/* ── Acordeón por categoría ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {CAT_ORDER.map(cat => {
            const comps = compsPorCategoria(cat)
            if (comps.length === 0) return null
            const expandida = categoriasExpandidas.includes(cat)
            const agregadosEnCat = comps.filter(c => itemIds.has(c.id))
            const disponibles = comps.filter(c => !itemIds.has(c.id))
            return (
              <div key={cat} style={{ border: '1px solid #c8d5f8', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => toggleCategoria(cat)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', background: expandida ? '#1E3EBF' : agregadosEnCat.length > 0 ? '#e8f5e9' : '#e8f0fe',
                  border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  color: expandida ? '#fff' : agregadosEnCat.length > 0 ? '#2A6E2A' : '#1E3EBF',
                }}>
                  <span>
                    {ALIASES[cat] || cat}
                    {agregadosEnCat.length > 0 && (
                      <span style={{ marginLeft: 8, fontWeight: 400, fontSize: 12 }}>
                        ✓ {agregadosEnCat.map(c => c.nombre).join(', ')}
                      </span>
                    )}
                  </span>
                  <span style={{ fontSize: 11 }}>{expandida ? '▲' : '▼'}</span>
                </button>
                {expandida && (
                  <div style={{ padding: '10px 14px', background: '#fff', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {disponibles.length === 0 && agregadosEnCat.length > 0 && (
                      <span style={{ color: '#9ca3af', fontSize: 13 }}>Todos los componentes de esta categoría ya están agregados.</span>
                    )}
                    {disponibles.map(c => (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 0, borderRadius: 6, overflow: 'hidden', border: '1px solid #c8d5f8' }}>
                        <button onClick={() => agregarComponente(c.id)} style={{
                          padding: '6px 11px', border: 'none', cursor: 'pointer',
                          background: '#f0f4ff', color: '#1E3EBF', fontSize: 13, fontWeight: 500,
                        }}>
                          + {c.nombre}
                        </button>
                        <button
                          onClick={(e) => toggleFavorito(c.id, e)}
                          title={favoritos?.has(c.id) ? 'Quitar de clásicos' : 'Agregar a clásicos'}
                          style={{ padding: '6px 8px', border: 'none', cursor: 'pointer', borderLeft: '1px solid #c8d5f8', background: favoritos?.has(c.id) ? '#fef3c7' : '#f0f4ff', fontSize: 12 }}
                        >{favoritos?.has(c.id) ? '⭐' : '☆'}</button>
                      </div>
                    ))}
                    {agregadosEnCat.map(c => (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 0, borderRadius: 6, overflow: 'hidden', border: '1px solid #a8d5a2' }}>
                        <span style={{ padding: '6px 11px', background: '#f0fdf4', color: '#2A6E2A', fontSize: 13, fontWeight: 500 }}>
                          ✓ {c.nombre}
                        </span>
                        <button
                          onClick={(e) => toggleFavorito(c.id, e)}
                          title={favoritos?.has(c.id) ? 'Quitar de clásicos' : 'Agregar a clásicos'}
                          style={{ padding: '6px 8px', border: 'none', cursor: 'pointer', borderLeft: '1px solid #a8d5a2', background: favoritos?.has(c.id) ? '#fef3c7' : '#f0fdf4', fontSize: 12 }}
                        >{favoritos?.has(c.id) ? '⭐' : '☆'}</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Lista de ítems agregados */}
      {hayItems && (
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: '#888', margin: '10px 14px 0' }}>
            💡 Presioná <strong>🔍</strong> para buscar el precio actual automáticamente, o <strong>CP</strong>/<strong>ZG</strong> para ver en la tienda.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#2A6E2A', color: '#fff' }}>
                <th style={th}>Categoría</th>
                <th style={th}>Componente</th>
                <th style={th}>Ver precio</th>
                <th style={{ ...th, textAlign: 'center' }}>Cant.</th>
                <th style={{ ...th, textAlign: 'right' }}>Precio c/IVA</th>
                <th style={{ ...th, textAlign: 'right' }}>Subtotal</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const comp = components.find(c => c.id === item.componenteId)
                if (!comp) return null
                const precio = parseFloat(item.precioConIva) || 0
                const subtotalItem = precio * item.cantidad
                return (
                  <tr key={item.componenteId} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <td style={td}><span style={tagStyle}>{ALIASES[comp.categoria] || comp.categoria}</span></td>
                    <td style={td}>{comp.nombre}</td>
                    <td style={td}>
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        {comp.sku && (
                          <button
                            onClick={() => buscarPrecio(comp)}
                            disabled={buscandoPrecio[comp.id]}
                            title="Buscar precio actual en tiendas"
                            style={{
                              padding: '3px 8px', border: '1px solid #2A6E2A', borderRadius: 4,
                              background: buscandoPrecio[comp.id] ? '#f0fdf4' : '#fff',
                              color: '#2A6E2A', fontSize: 13, cursor: buscandoPrecio[comp.id] ? 'default' : 'pointer',
                              fontWeight: 600,
                            }}
                          >
                            {buscandoPrecio[comp.id] ? '⏳' : '🔍'}
                          </button>
                        )}
                        <a href={urlCP(comp)} target="_blank" rel="noreferrer" style={linkBtn('#e67e22')}>CP</a>
                        {urlZG(comp) && <a href={urlZG(comp)} target="_blank" rel="noreferrer" style={linkBtn('#8e44ad')}>ZG</a>}
                      </div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <input type="number" min={1} value={item.cantidad}
                        onChange={e => actualizarCantidad(item.componenteId, e.target.value)}
                        style={{ width: 50, padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', textAlign: 'center', fontSize: 13 }} />
                    </td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      <input type="number" min={0} value={item.precioConIva}
                        onChange={e => actualizarPrecio(item.componenteId, e.target.value)}
                        placeholder="$ precio"
                        style={{ width: 100, padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', textAlign: 'right', fontSize: 13 }} />
                    </td>
                    <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>
                      {subtotalItem > 0 ? formatMXN(subtotalItem) : '—'}
                    </td>
                    <td style={td}>
                      <button onClick={() => quitarItem(item.componenteId)} style={btnSmall('#c0392b')}>✕</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Totales y armado */}
      {hayItems && hayTotal && (
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 18, marginBottom: 16 }}>
          <h4 style={{ margin: '0 0 14px', color: '#333', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.4 }}>Totales</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
            <label style={{ ...labelStyle, flex: 1, minWidth: 180 }}>
              Costo de armado (s/IVA)
              <input type="number"
                placeholder={`Sugerido: $${armadoSugerido.toLocaleString('es-MX')}`}
                value={armadoOverride}
                onChange={e => setArmadoOverride(e.target.value)}
                style={inputStyle} />
              {subtotalSinIva < config.umbralPCBasica && subtotalSinIva > 0 && (
                <span style={{ color: '#e67e22', fontSize: 12, marginTop: 4 }}>⚠️ PC básica — sugerido: ${config.armadoBasico.toLocaleString('es-MX')}</span>
              )}
            </label>
            <label style={{ ...labelStyle, flex: 1, minWidth: 160 }}>
              Envío (MXN)
              <input type="number" placeholder="Ej: 150" value={envio} onChange={e => setEnvio(e.target.value)} style={inputStyle} />
            </label>
            {armadoOverride && (
              <button onClick={() => setArmadoOverride('')} style={{ ...btnSmall('#888'), alignSelf: 'flex-end', marginBottom: 6 }}>Resetear armado</button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, borderTop: '1px solid #eee', paddingTop: 12 }}>
            <span>Componentes c/IVA: <strong>{formatMXN(subtotalConIva)}</strong></span>
            <span>Armado c/IVA: <strong>{formatMXN(armadoConIva)}</strong></span>
            {costoEnvio > 0 && <span>Envío: <strong>{formatMXN(costoEnvio)}</strong></span>}
            <div style={{ background: '#1E3EBF', color: '#fff', borderRadius: 8, padding: '10px 24px', fontSize: 20, fontWeight: 700, marginTop: 6 }}>
              TOTAL: {formatMXN(total)}
            </div>
          </div>
        </div>
      )}

      {/* Presets */}
      {presets && presets.length > 0 && !hayItems && (
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <h4 style={{ margin: '0 0 12px', color: '#333', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.4 }}>📦 Cargar preset de build</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {presets.map(p => (
              <div key={p.id} style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: '1px solid #c8d5f8' }}>
                <button onClick={() => {
                  setDraft(d => ({ ...d, nombre: p.nombre, items: p.items.map(i => ({ ...i, precioConIva: '' })) }))
                }} style={{ padding: '7px 13px', background: '#f0f4ff', color: '#1E3EBF', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  📦 {p.nombre}
                </button>
                <button onClick={() => { if (confirm(`¿Eliminar preset "${p.nombre}"?`)) setPresets(presets.filter(x => x.id !== p.id)) }}
                  style={{ padding: '7px 8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderLeft: '1px solid #c8d5f8', cursor: 'pointer', fontSize: 12 }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Acciones — visible con solo tener items */}
      {hayItems && (
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 18, marginBottom: 16 }}>
          <h4 style={{ margin: '0 0 14px', color: '#333', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.4 }}>Acciones</h4>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {hayTotal && <button onClick={handlePDF} style={btnStyle('#1E3EBF')}>📄 Descargar PDF</button>}
            <button onClick={handleGuardar} style={btnStyle('#2A6E2A')}>💾 Guardar cotización</button>
            <button onClick={handleVendida} style={btnStyle('#e67e22')}>🤝 Guardar como vendida</button>
            <button onClick={() => {
              const nombrePreset = prompt('Nombre del preset (ej: PC Gaming Media):')
              if (!nombrePreset?.trim()) return
              const nuevo = { id: uuid(), nombre: nombrePreset.trim(), items: items.map(i => ({ componenteId: i.componenteId, cantidad: i.cantidad })) }
              setPresets([...(presets || []), nuevo])
              alert(`✅ Preset "${nombrePreset}" guardado.`)
            }} style={btnStyle('#8e44ad')}>📦 Guardar como preset</button>
            <button onClick={() => { if (confirm('¿Limpiar la cotización actual?')) resetDraft() }} style={btnStyle('#aaa')}>🗑️ Limpiar</button>
          </div>
          {!hayTotal && <p style={{ margin: '10px 0 0', fontSize: 12, color: '#9ca3af' }}>Ingresá los precios para poder descargar el PDF y ver el total.</p>}
        </div>
      )}

      {/* Panel de mensajes WhatsApp */}
      {hayItems && hayTotal && (
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ background: '#f8fafa', padding: '14px 20px', borderBottom: '1px solid #e0e0e0' }}>
            <span style={{ fontWeight: 700, color: '#374151', fontSize: 15 }}>💬 Mensaje al cliente</span>
          </div>
          <div style={{ padding: 18 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              {pls.map(p => (
                <button key={p.id} onClick={() => seleccionarPlantilla(p)} style={{
                  padding: '7px 14px', borderRadius: 20, border: '1px solid',
                  borderColor: plantillaActiva === p.id ? '#1E3EBF' : '#d1d5db',
                  background: plantillaActiva === p.id ? '#1E3EBF' : '#f9fafb',
                  color: plantillaActiva === p.id ? '#fff' : '#374151',
                  fontSize: 13, cursor: 'pointer', fontWeight: plantillaActiva === p.id ? 600 : 400,
                }}>
                  {p.label}
                </button>
              ))}
            </div>
            {plantillaActiva ? (
              <>
                <textarea
                  value={mensajeTexto}
                  onChange={e => setMensajeTexto(e.target.value)}
                  rows={6}
                  style={{ ...inputStyle, resize: 'vertical', marginBottom: 12, background: '#f9fafb', fontFamily: 'inherit' }}
                />
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={enviarWA} style={{ ...btnStyle('#25a244'), padding: '10px 22px' }}>
                    📲 Enviar por WhatsApp
                  </button>
                  <button onClick={copiarWA} style={btnSecondary}>📋 Copiar texto</button>
                  <button onClick={() => { setPlantillaActiva(null); setMensajeTexto('') }} style={{ ...btnSecondary, color: '#aaa' }}>✕ Cerrar</button>
                </div>
                {!clienteTel && (
                  <p style={{ fontSize: 12, color: '#e67e22', marginTop: 8 }}>⚠️ Ingresá el teléfono del cliente arriba para poder enviar por WhatsApp.</p>
                )}
              </>
            ) : (
              <p style={{ color: '#9ca3af', fontSize: 13, margin: 0 }}>Elegí una plantilla para ver el mensaje y editarlo antes de enviar.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const th = { padding: '10px 12px', textAlign: 'left', fontWeight: 600 }
const td = { padding: '8px 12px', borderBottom: '1px solid #eee' }
const inputStyle = { padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14, width: '100%', boxSizing: 'border-box', marginTop: 4 }
const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 13, fontWeight: 600, color: '#333' }
const tagStyle = { background: '#e8f0fe', color: '#1E3EBF', borderRadius: 4, padding: '2px 7px', fontSize: 12, fontWeight: 600 }
const btnStyle = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 6, padding: '9px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 })
const btnSmall = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 12 })
const btnSecondary = { background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, padding: '9px 16px', fontSize: 13, cursor: 'pointer' }
const linkBtn = (bg) => ({ background: bg, color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: 11, fontWeight: 600, textDecoration: 'none', display: 'inline-block' })
