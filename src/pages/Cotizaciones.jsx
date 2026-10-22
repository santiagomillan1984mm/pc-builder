import { useState } from 'react'
import { generarPDF } from '../lib/exportPDF'
import ModalContrato from '../components/ModalContrato'
import { generarTextoWhatsapp } from '../lib/exportWhatsapp'
import { formatMXN } from '../lib/pricing'

const ALIASES = { CPU: 'Procesador', GPU: 'Tarjeta de Video', RAM: 'Memoria RAM', Motherboard: 'Placa Madre', 'SSD M.2': 'SSD M.2 NVMe', 'SSD SATA': 'SSD SATA 2.5"', HDD: 'Disco Duro HDD', PSU: 'Fuente de Poder', Case: 'Gabinete', Cooler: 'Enfriamiento', Otro: 'Otro' }

function getPrecioItem(item) {
  return parseFloat(item.precioConIva) || 0
}

function fechaVencimiento(quote, config) {
  const dias = config?.vigenciaDias || 7
  const base = new Date(quote.creadoEn || Date.now())
  base.setDate(base.getDate() + dias)
  return base
}

function estaVencida(quote, config) {
  return !quote.vendida && fechaVencimiento(quote, config) < new Date()
}

// ── Resumen del mes ──────────────────────────────────────
function ResumenMes({ quotes }) {
  const ahora = new Date()
  const mes = ahora.getMonth()
  const anio = ahora.getFullYear()
  const delMes = quotes.filter(q => {
    const f = new Date(q.creadoEn)
    return f.getMonth() === mes && f.getFullYear() === anio
  })
  const vendidas = delMes.filter(q => q.vendida)
  const totalVendido = vendidas.reduce((s, q) => s + (q.total || 0), 0)
  const totalCotizado = delMes.reduce((s, q) => s + (q.total || 0), 0)

  // Componente más cotizado del mes
  const conteo = {}
  delMes.forEach(q => q.items?.forEach(i => { conteo[i.componenteId] = (conteo[i.componenteId] || 0) + (i.cantidad || 1) }))
  const topId = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0]?.[0]

  const nombreMes = ahora.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })

  return (
    <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 18, marginBottom: 20 }}>
      <h4 style={{ margin: '0 0 14px', color: '#1E3EBF', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        📊 Resumen — {nombreMes}
      </h4>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Stat label="Cotizaciones" valor={delMes.length} color="#1E3EBF" />
        <Stat label="Vendidas" valor={vendidas.length} color="#2A6E2A" />
        <Stat label="Total vendido" valor={formatMXN(totalVendido)} color="#2A6E2A" />
        <Stat label="Total cotizado" valor={formatMXN(totalCotizado)} color="#555" />
        {topId && <Stat label="Más cotizado" valor={`×${conteo[topId]}`} color="#8e44ad" sub={topId} />}
      </div>
    </div>
  )
}

function Stat({ label, valor, color, sub }) {
  return (
    <div style={{ background: '#f8faff', border: '1px solid #e8edf8', borderRadius: 8, padding: '10px 16px', minWidth: 120 }}>
      <div style={{ fontSize: 11, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color, marginTop: 2 }}>{valor}</div>
      {sub && <div style={{ fontSize: 10, color: '#aaa', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{sub}</div>}
    </div>
  )
}

// ── Vista de comparación ─────────────────────────────────
function VistaComparacion({ q1, q2, components, onCerrar }) {
  const CAT_ORDER = ['CPU', 'GPU', 'RAM', 'Motherboard', 'SSD M.2', 'SSD SATA', 'HDD', 'PSU', 'Case', 'Cooler', 'Otro']
  const todasIds = new Set([...q1.items.map(i => i.componenteId), ...q2.items.map(i => i.componenteId)])
  const filas = [...todasIds].map(id => {
    const comp = components.find(c => c.id === id)
    const i1 = q1.items.find(i => i.componenteId === id)
    const i2 = q2.items.find(i => i.componenteId === id)
    return { comp, i1, i2 }
  }).sort((a, b) => {
    const ca = CAT_ORDER.indexOf(a.comp?.categoria), cb = CAT_ORDER.indexOf(b.comp?.categoria)
    return ca - cb
  })

  return (
    <div style={{ background: '#fff', border: '2px solid #1E3EBF', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ background: '#1E3EBF', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700 }}>⚖️ Comparando builds</span>
        <button onClick={onCerrar} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>✕ Cerrar</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f0f4ff' }}>
              <th style={th}>Categoría / Componente</th>
              <th style={{ ...th, textAlign: 'center', color: '#1E3EBF' }}>{q1.nombre}</th>
              <th style={{ ...th, textAlign: 'center', color: '#2A6E2A' }}>{q2.nombre}</th>
            </tr>
          </thead>
          <tbody>
            {filas.map(({ comp, i1, i2 }, idx) => (
              <tr key={comp?.id || idx} style={{ background: idx % 2 === 0 ? '#fafbff' : '#fff' }}>
                <td style={td}>
                  <span style={{ background: '#e8f0fe', color: '#1E3EBF', borderRadius: 4, padding: '1px 6px', fontSize: 11, fontWeight: 600, marginRight: 6 }}>{ALIASES[comp?.categoria] || comp?.categoria}</span>
                  {comp?.nombre || 'Desconocido'}
                </td>
                <td style={{ ...td, textAlign: 'center' }}>
                  {i1 ? <span style={{ color: '#1E3EBF', fontWeight: 600 }}>{getPrecioItem(i1) > 0 ? formatMXN(getPrecioItem(i1) * i1.cantidad) : `×${i1.cantidad}`}</span>
                    : <span style={{ color: '#ddd' }}>—</span>}
                </td>
                <td style={{ ...td, textAlign: 'center' }}>
                  {i2 ? <span style={{ color: '#2A6E2A', fontWeight: 600 }}>{getPrecioItem(i2) > 0 ? formatMXN(getPrecioItem(i2) * i2.cantidad) : `×${i2.cantidad}`}</span>
                    : <span style={{ color: '#ddd' }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: '#f0f4ff', fontWeight: 700 }}>
              <td style={{ ...td, fontWeight: 700 }}>TOTAL</td>
              <td style={{ ...td, textAlign: 'center', color: '#1E3EBF', fontSize: 15 }}>{formatMXN(q1.total)}</td>
              <td style={{ ...td, textAlign: 'center', color: '#2A6E2A', fontSize: 15 }}>{formatMXN(q2.total)}</td>
            </tr>
            <tr style={{ background: '#fff' }}>
              <td style={{ ...td, color: '#888', fontSize: 12 }}>Diferencia</td>
              <td colSpan={2} style={{ ...td, textAlign: 'center', fontWeight: 700, color: Math.abs(q1.total - q2.total) > 0 ? '#e67e22' : '#888' }}>
                {q1.total !== q2.total
                  ? `${q1.total > q2.total ? q1.nombre : q2.nombre} es ${formatMXN(Math.abs(q1.total - q2.total))} más caro`
                  : 'Mismo precio'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default function Cotizaciones({ quotes, setQuotes, components, config, setDraft, setPagina }) {
  const [contratoDe, setContratoDe] = useState(null)
  const [filtro, setFiltro] = useState('activas')
  const [busqueda, setBusqueda] = useState('')
  const [plantillaActiva, setPlantillaActiva] = useState(null)
  const [mensajeTexto, setMensajeTexto] = useState('')
  const [seleccionados, setSeleccionados] = useState([])
  const [comparando, setComparando] = useState(false)
  const [expandidoNotas, setExpandidoNotas] = useState({})

  const marcarVendida = (id) => setQuotes(quotes.map(q => q.id === id ? { ...q, vendida: true } : q))
  const marcarActiva = (id) => setQuotes(quotes.map(q => q.id === id ? { ...q, vendida: false } : q))
  const eliminar = (id) => { if (!confirm('¿Eliminar esta cotización?')) return; setQuotes(quotes.filter(q => q.id !== id)) }

  const duplicar = (q) => {
    if (!setDraft || !setPagina) return
    setDraft({
      nombre: q.nombre + ' (copia)',
      clienteNombre: q.cliente?.nombre || '',
      clienteTel: q.cliente?.telefono || '',
      items: q.items.map(i => ({ ...i })),
      armadoOverride: '',
      envio: String(q.costoEnvio || ''),
      notas: q.notas || '',
    })
    setPagina('nueva-cotizacion')
  }

  const seleccionar = (id) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 2 ? [...prev, id] : [prev[1], id]
    )
  }

  const cerrarMensaje = () => { setPlantillaActiva(null); setMensajeTexto('') }

  const seleccionarPlantilla = (quoteId, p) => {
    setPlantillaActiva({ quoteId, plantillaId: p.id })
    setMensajeTexto(p.texto)
  }

  const enviarWA = (q) => {
    const tel = q.cliente?.telefono?.replace(/\D/g, '')
    if (!tel) { alert('Esta cotización no tiene teléfono del cliente.'); return }
    window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(mensajeTexto)}`, '_blank')
  }

  const copiarWA = () => { navigator.clipboard.writeText(mensajeTexto); alert('¡Texto copiado!') }

  const plantillasPara = (q) => {
    const nombre = q.cliente?.nombre?.split(' ')[0] || q.cliente?.nombre || 'Cliente'
    const anticipo = q.total ? `$${Math.round(q.total / 2).toLocaleString('es-MX')}` : '50%'
    return [
      { id: 'cotizacion', label: '📋 Cotización', texto: generarTextoWhatsapp(q, components, config) },
      { id: 'anticipo', label: '💰 Pedir anticipo', texto: `Hola ${nombre}! Perfecto, queda confirmada tu PC 🙌\n\nPara arrancar necesito el 50% de anticipo: *${anticipo}*.\nUna vez confirmado el pago, la PC queda lista en 7 a 10 días hábiles.\n\n¿Cómo preferís pagar? (transferencia o efectivo). Saludos!` },
      { id: 'seguimiento', label: '🔔 Seguimiento', texto: `Hola ${nombre}! Te quería consultar si pudiste ver la cotización que te mandé para tu PC. Quedo a disposición para cualquier duda o ajuste. Saludos!` },
      { id: 'precios', label: '⚠️ Precios actualizados', texto: `Hola ${nombre}! Te aviso que los precios de algunos componentes se actualizaron. Te mando la cotización con los valores al día de hoy 👇` },
      { id: 'lista', label: '🖥️ PC lista', texto: `Hola ${nombre}! Tu PC ya está armada y lista! 🎉\n\nEl saldo restante es *${anticipo}* (50% final).\nCoordinamos para el retiro/entrega cuando gustes. Saludos!` },
      { id: 'libre', label: '✏️ Mensaje libre', texto: `Hola ${nombre}! ` },
    ]
  }

  const visible = [...quotes]
    .reverse()
    .filter(q => {
      if (filtro === 'activas') return !q.vendida
      if (filtro === 'vendidas') return q.vendida
      return true
    })
    .filter(q => {
      if (!busqueda.trim()) return true
      const b = busqueda.toLowerCase()
      return q.nombre?.toLowerCase().includes(b) || q.cliente?.nombre?.toLowerCase().includes(b)
    })

  const totalActivas = quotes.filter(q => !q.vendida).length
  const totalVendidas = quotes.filter(q => q.vendida).length

  const q1 = seleccionados[0] ? quotes.find(q => q.id === seleccionados[0]) : null
  const q2 = seleccionados[1] ? quotes.find(q => q.id === seleccionados[1]) : null

  if (quotes.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h2 style={{ color: '#1E3EBF' }}>Cotizaciones</h2>
        <p style={{ color: '#888' }}>No hay cotizaciones guardadas todavía.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      {contratoDe && <ModalContrato quote={contratoDe} components={components} config={config} onCerrar={() => setContratoDe(null)} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, color: '#1E3EBF' }}>Cotizaciones</h2>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { id: 'activas', label: `Activas (${totalActivas})` },
            { id: 'vendidas', label: `Vendidas (${totalVendidas})` },
            { id: 'todas', label: 'Todas' },
          ].map(f => (
            <button key={f.id} onClick={() => setFiltro(f.id)} style={{
              padding: '7px 14px', borderRadius: 6, border: '1px solid',
              borderColor: filtro === f.id ? '#1E3EBF' : '#d1d5db',
              background: filtro === f.id ? '#1E3EBF' : '#fff',
              color: filtro === f.id ? '#fff' : '#374151',
              fontWeight: filtro === f.id ? 600 : 400, cursor: 'pointer', fontSize: 13,
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Resumen del mes */}
      <ResumenMes quotes={quotes} />

      {/* Barra de búsqueda + comparar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          placeholder="Buscar por nombre o cliente…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
        />
        {seleccionados.length > 0 && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#6b7280' }}>{seleccionados.length}/2 seleccionadas</span>
            {seleccionados.length === 2 && (
              <button onClick={() => setComparando(true)} style={{ background: '#1E3EBF', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                ⚖️ Comparar
              </button>
            )}
            <button onClick={() => setSeleccionados([])} style={{ background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, padding: '7px 12px', cursor: 'pointer', fontSize: 13 }}>Cancelar</button>
          </div>
        )}
      </div>

      {/* Vista comparación */}
      {comparando && q1 && q2 && (
        <VistaComparacion q1={q1} q2={q2} components={components} onCerrar={() => { setComparando(false); setSeleccionados([]) }} />
      )}

      {visible.length === 0 && <p style={{ color: '#888' }}>No hay cotizaciones en esta categoría.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {visible.map(q => {
          const pls = plantillasPara(q)
          const panelAbierto = plantillaActiva?.quoteId === q.id
          const vencida = estaVencida(q, config)
          const vence = fechaVencimiento(q, config)
          const estaSeleccionada = seleccionados.includes(q.id)
          const notasExpandidas = expandidoNotas[q.id]

          return (
            <div key={q.id} style={{ border: `2px solid ${estaSeleccionada ? '#1E3EBF' : q.vendida ? '#a8d5a2' : vencida ? '#fca5a5' : '#ddd'}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>

              {/* Encabezado */}
              <div style={{ background: q.vendida ? '#2A6E2A' : vencida ? '#dc2626' : '#1E3EBF', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={estaSeleccionada} onChange={() => seleccionar(q.id)}
                    style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#fff' }} title="Seleccionar para comparar" />
                  <div>
                    <strong style={{ fontSize: 16 }}>{q.nombre}</strong>
                    {q.vendida && <span style={{ marginLeft: 10, background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '2px 10px', fontSize: 12 }}>🤝 Vendida</span>}
                    {vencida && <span style={{ marginLeft: 10, background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '2px 10px', fontSize: 12 }}>⏰ Vencida</span>}
                    {!vencida && !q.vendida && <span style={{ marginLeft: 10, opacity: 0.7, fontSize: 12 }}>vence {vence.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</span>}
                    {q.cliente?.nombre && <span style={{ marginLeft: 10, opacity: 0.85, fontSize: 13 }}>👤 {q.cliente.nombre}</span>}
                    {q.cliente?.telefono && <span style={{ marginLeft: 8, opacity: 0.7, fontSize: 12 }}>📱 {q.cliente.telefono}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, opacity: 0.75 }}>{new Date(q.creadoEn).toLocaleDateString('es-MX')}</span>
                  <span style={{ background: '#fff', color: q.vendida ? '#2A6E2A' : '#1E3EBF', fontWeight: 700, borderRadius: 6, padding: '4px 12px', fontSize: 15 }}>
                    {formatMXN(q.total)}
                  </span>
                </div>
              </div>

              {/* Tabla de ítems */}
              <div style={{ padding: '12px 16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 12 }}>
                  <thead>
                    <tr style={{ background: '#f0f4ff' }}>
                      <th style={th}>Categoría</th>
                      <th style={th}>Componente</th>
                      <th style={{ ...th, textAlign: 'center' }}>Cant.</th>
                      <th style={{ ...th, textAlign: 'right' }}>Precio c/IVA</th>
                      <th style={{ ...th, textAlign: 'right' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {q.items.map(item => {
                      const comp = components.find(c => c.id === item.componenteId)
                      if (!comp) return (
                        <tr key={item.componenteId}>
                          <td colSpan={5} style={{ ...td, color: '#999', fontStyle: 'italic' }}>Componente eliminado del catálogo</td>
                        </tr>
                      )
                      const precio = getPrecioItem(item)
                      return (
                        <tr key={item.componenteId}>
                          <td style={td}><span style={tagStyle}>{ALIASES[comp.categoria] || comp.categoria}</span></td>
                          <td style={td}>{comp.nombre}</td>
                          <td style={{ ...td, textAlign: 'center' }}>{item.cantidad}</td>
                          <td style={{ ...td, textAlign: 'right' }}>{precio > 0 ? formatMXN(precio) : '—'}</td>
                          <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{precio > 0 ? formatMXN(precio * item.cantidad) : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                {/* Resumen totales */}
                <div style={{ fontSize: 13, color: '#555', marginBottom: q.notas ? 8 : 12 }}>
                  Componentes: <strong>{formatMXN(q.subtotalConIva)}</strong>
                  {' · '}Armado: <strong>{formatMXN(q.armadoConIva)}</strong>
                  {q.costoEnvio > 0 && <> · Envío: <strong>{formatMXN(q.costoEnvio)}</strong></>}
                  {' · '}TOTAL: <strong style={{ color: q.vendida ? '#2A6E2A' : '#1E3EBF', fontSize: 15 }}>{formatMXN(q.total)}</strong>
                </div>

                {/* Notas */}
                {q.notas && (
                  <div style={{ marginBottom: 12 }}>
                    <button onClick={() => setExpandidoNotas(p => ({ ...p, [q.id]: !p[q.id] }))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#6b7280', padding: 0 }}>
                      📝 Notas {notasExpandidas ? '▲' : '▼'}
                    </button>
                    {notasExpandidas && (
                      <div style={{ marginTop: 4, background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#78350f' }}>
                        {q.notas}
                      </div>
                    )}
                  </div>
                )}

                {/* Botones de acción */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: panelAbierto ? 16 : 0 }}>
                  <button onClick={async () => await generarPDF(q, components, config)} style={btnStyle('#1E3EBF')}>📄 PDF</button>
                  <button onClick={() => {
                    const tel = q.cliente?.telefono?.replace(/\D/g, '')
                    if (!tel) { alert('Esta cotización no tiene teléfono del cliente.'); return }
                    generarPDF(q, components, config)
                    const texto = generarTextoWhatsapp(q, components, config)
                    setTimeout(() => window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(texto)}`, '_blank'), 400)
                  }} style={btnStyle('#25a244')}>📲 WA + PDF</button>
                  <button onClick={() => {
                    if (panelAbierto) { cerrarMensaje(); return }
                    setPlantillaActiva(null); setMensajeTexto('')
                    setTimeout(() => seleccionarPlantilla(q.id, pls[0]), 0)
                  }} style={btnStyle('#555')}>💬 {panelAbierto ? 'Cerrar' : 'Mensaje'}</button>
                  <button onClick={() => setContratoDe(q)} style={btnStyle('#0f766e')}>📝 Contrato</button>
                  <button onClick={() => duplicar(q)} style={btnStyle('#8e44ad')}>📋 Duplicar</button>
                  {!q.vendida
                    ? <button onClick={() => marcarVendida(q.id)} style={btnStyle('#e67e22')}>🤝 Vendida</button>
                    : <button onClick={() => marcarActiva(q.id)} style={btnStyle('#888')}>↩ Activas</button>
                  }
                  <button onClick={() => eliminar(q.id)} style={btnStyle('#c0392b')}>🗑️</button>
                </div>

                {/* Panel de mensajes */}
                {panelAbierto && (
                  <div style={{ background: '#f8fafb', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                      {pls.map(p => (
                        <button key={p.id} onClick={() => seleccionarPlantilla(q.id, p)} style={{
                          padding: '6px 12px', borderRadius: 16, border: '1px solid',
                          borderColor: plantillaActiva?.plantillaId === p.id ? '#1E3EBF' : '#d1d5db',
                          background: plantillaActiva?.plantillaId === p.id ? '#1E3EBF' : '#fff',
                          color: plantillaActiva?.plantillaId === p.id ? '#fff' : '#374151',
                          fontSize: 12, cursor: 'pointer',
                        }}>{p.label}</button>
                      ))}
                    </div>
                    <textarea value={mensajeTexto} onChange={e => setMensajeTexto(e.target.value)} rows={6}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13, resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 10, background: '#fff' }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => enviarWA(q)} style={{ ...btnStyle('#25a244'), padding: '9px 20px' }}>📲 Enviar por WhatsApp</button>
                      <button onClick={copiarWA} style={btnSecondary}>📋 Copiar</button>
                      <button onClick={cerrarMensaje} style={{ ...btnSecondary, color: '#aaa' }}>✕ Cerrar</button>
                    </div>
                    {!q.cliente?.telefono && (
                      <p style={{ fontSize: 12, color: '#e67e22', marginTop: 8 }}>⚠️ Esta cotización no tiene teléfono del cliente guardado.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const th = { padding: '8px 12px', textAlign: 'left', fontWeight: 600 }
const td = { padding: '6px 12px', borderBottom: '1px solid #eee' }
const tagStyle = { background: '#e8f0fe', color: '#1E3EBF', borderRadius: 4, padding: '2px 7px', fontSize: 12, fontWeight: 600 }
const btnStyle = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 })
const btnSecondary = { background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }

