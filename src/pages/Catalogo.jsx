import { useState } from 'react'
import { v4 as uuid } from 'uuid'

const CATEGORIAS = ['CPU', 'GPU', 'RAM', 'Motherboard', 'SSD M.2', 'SSD SATA', 'HDD', 'PSU', 'Case', 'Cooler', 'Otro']
const ALIASES = { CPU: 'Procesador', GPU: 'Tarjeta de Video', RAM: 'Memoria RAM', Motherboard: 'Placa Madre', 'SSD M.2': 'SSD M.2 NVMe', 'SSD SATA': 'SSD SATA 2.5"', HDD: 'Disco Duro HDD', PSU: 'Fuente de Poder', Case: 'Gabinete', Cooler: 'Enfriamiento' }

const VACIO = { nombre: '', sku: '', categoria: 'CPU', grupo: '', precio: '', tienda: '', urlCyberpuerta: '', urlZegucom: '', notas: '' }

export default function Catalogo({ components, setComponents }) {
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(VACIO)
  const [busqueda, setBusqueda] = useState('')
  const [abiertas, setAbiertas] = useState(() => new Set(CATEGORIAS))

  const abrirNuevo = () => { setForm(VACIO); setEditando('nuevo') }
  const abrirEditar = (c) => { setForm({ ...c, precio: String(c.precio) }); setEditando(c.id) }
  const cerrar = () => setEditando(null)

  const toggleCat = (cat) => {
    setAbiertas(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const expandirTodo = () => setAbiertas(new Set(CATEGORIAS))
  const colapsarTodo = () => setAbiertas(new Set())

  const guardar = () => {
    if (!form.nombre.trim() || !form.precio) return
    const precio = parseFloat(form.precio)
    if (isNaN(precio)) return
    if (editando === 'nuevo') {
      setComponents([...components, { ...form, precio, id: uuid(), updatedAt: new Date().toISOString().slice(0, 10) }])
    } else {
      const original = components.find(c => c.id === editando)
      const historial = precio !== original?.precio && original?.precio
        ? { precioAnterior: original.precio, fechaAnterior: original.updatedAt }
        : { precioAnterior: original?.precioAnterior, fechaAnterior: original?.fechaAnterior }
      setComponents(components.map(c => c.id === editando
        ? { ...form, precio, id: editando, updatedAt: new Date().toISOString().slice(0, 10), ...historial }
        : c))
    }
    cerrar()
  }

  const eliminar = (id) => {
    if (!confirm('¿Eliminar este componente?')) return
    setComponents(components.filter(c => c.id !== id))
  }


  const filtrados = components
    .filter(c => !busqueda || c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || (c.sku || '').toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => {
      const catOrder = CATEGORIAS
      const ca = catOrder.indexOf(a.categoria), cb = catOrder.indexOf(b.categoria)
      if (ca !== cb) return ca - cb
      const ga = a.grupo || '', gb = b.grupo || ''
      if (ga !== gb) return ga.localeCompare(gb, 'es')
      return a.nombre.localeCompare(b.nombre, 'es')
    })

  const porCategoria = CATEGORIAS.map(cat => ({
    cat,
    label: ALIASES[cat] || cat,
    items: filtrados.filter(c => c.categoria === cat),
  })).filter(g => g.items.length > 0)

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, color: '#1E3EBF' }}>Catálogo de Componentes</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={abrirNuevo} style={btnStyle('#2A6E2A')}>+ Agregar</button>
        </div>
      </div>


      {/* Búsqueda + controles */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          placeholder="Buscar por nombre o SKU..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: 200 }}
        />
        <button onClick={expandirTodo} style={btnControl}>Expandir todo</button>
        <button onClick={colapsarTodo} style={btnControl}>Colapsar todo</button>
      </div>

      {porCategoria.length === 0 && (
        <p style={{ color: '#888' }}>No hay componentes. Agregá uno con el botón de arriba.</p>
      )}

      {/* Acordeón por categoría */}
      {porCategoria.map(({ cat, label, items }) => {
        const abierta = abiertas.has(cat)
        return (
          <div key={cat} style={{ marginBottom: 10, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
            {/* Header de categoría */}
            <button
              onClick={() => toggleCat(cat)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', background: abierta ? '#1E3EBF' : '#f0f4ff',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                color: abierta ? '#fff' : '#1E3EBF', transition: 'background 0.15s',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 14 }}>
                {abierta ? '▾' : '▸'} {label}
              </span>
              <span style={{
                background: abierta ? 'rgba(255,255,255,0.25)' : '#1E3EBF',
                color: '#fff', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 600
              }}>
                {items.length} {items.length === 1 ? 'componente' : 'componentes'}
              </span>
            </button>

            {/* Tabla de componentes */}
            {abierta && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f5f7ff' }}>
                      <th style={th}>Nombre</th>
                      <th style={th}>Grupo</th>
                      <th style={th}>SKU</th>
                      <th style={{ ...th, textAlign: 'right' }}>Precio s/IVA</th>
                      <th style={{ ...th, textAlign: 'right' }}>Precio c/IVA</th>
                      <th style={{ ...th, textAlign: 'center' }}>Ver online</th>
                      <th style={th}>Act.</th>
                      <th style={th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((c, i) => (
                      <tr key={c.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                        <td style={td}><strong>{c.nombre}</strong></td>
                        <td style={{ ...td, color: '#777', fontSize: 12 }}>{c.grupo || '—'}</td>
                        <td style={{ ...td, fontFamily: 'monospace', fontSize: 11, color: '#555' }}>{c.sku || '—'}</td>
                        <td style={{ ...td, textAlign: 'right' }}>{c.precio ? `$${c.precio.toLocaleString('es-MX')}` : '—'}</td>
                        <td style={{ ...td, textAlign: 'right', fontWeight: 600, color: '#1E3EBF' }}>
                          {c.precio ? `$${Math.round(c.precio * 1.16).toLocaleString('es-MX')}` : '—'}
                          {c.precioAnterior && c.precio ? (
                            <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 400, color: c.precio > c.precioAnterior ? '#dc2626' : '#16a34a' }}
                              title={`Antes: $${Math.round(c.precioAnterior * 1.16).toLocaleString('es-MX')} (${c.fechaAnterior})`}>
                              {c.precio > c.precioAnterior ? '▲' : '▼'}
                            </span>
                          ) : null}
                        </td>
                        <td style={{ ...td, textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                            {c.urlCyberpuerta
                              ? <a href={c.urlCyberpuerta} target="_blank" rel="noreferrer" style={linkBtn('#e67e22')}>CP</a>
                              : <span style={{ color: '#ddd', fontSize: 11 }}>—</span>}
                            {c.urlZegucom && <a href={c.urlZegucom} target="_blank" rel="noreferrer" style={linkBtn('#8e44ad')}>ZG</a>}
                          </div>
                        </td>
                        <td style={{ ...td, color: '#aaa', fontSize: 11 }}>{c.updatedAt || '—'}</td>
                        <td style={td}>
                          <button onClick={() => abrirEditar(c)} style={btnSmall('#1E3EBF')}>Editar</button>
                          {' '}
                          <button onClick={() => eliminar(c.id)} style={btnSmall('#c0392b')}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      })}

      {/* Modal edición */}
      {editando && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ marginTop: 0, color: '#1E3EBF' }}>{editando === 'nuevo' ? 'Nuevo componente' : 'Editar componente'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label style={labelStyle}>
                Nombre *
                <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} style={inputStyle} placeholder="Ej: AMD Ryzen 7 5700X" />
              </label>
              <label style={labelStyle}>
                Categoría
                <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} style={inputStyle}>
                  {CATEGORIAS.map(c => <option key={c} value={c}>{ALIASES[c] || c} ({c})</option>)}
                </select>
              </label>
              <label style={labelStyle}>
                SKU / Número de parte
                <input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} style={inputStyle} placeholder="Ej: 100-100000926WOF" />
              </label>
              <label style={labelStyle}>
                Precio sin IVA (MXN) *
                <input type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} style={inputStyle} placeholder="Ej: 3419" />
              </label>
              <label style={labelStyle}>
                Grupo (subclasificación)
                <input value={form.grupo || ''} onChange={e => setForm({ ...form, grupo: e.target.value })} style={inputStyle} placeholder="Ej: RTX 5060, AM4 DDR4, 750W" />
              </label>
              <label style={labelStyle}>
                Tienda
                <input value={form.tienda} onChange={e => setForm({ ...form, tienda: e.target.value })} style={inputStyle} placeholder="Ej: Cyberpuerta" />
              </label>
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
                Notas
                <input value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} style={inputStyle} placeholder="Opcional" />
              </label>
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
                URL Cyberpuerta
                <input value={form.urlCyberpuerta} onChange={e => setForm({ ...form, urlCyberpuerta: e.target.value })} style={inputStyle} placeholder="https://www.cyberpuerta.mx/..." />
              </label>
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
                URL Zegucom (opcional)
                <input value={form.urlZegucom} onChange={e => setForm({ ...form, urlZegucom: e.target.value })} style={inputStyle} placeholder="https://www.zegucom.com.mx/..." />
              </label>
            </div>
            {form.precio && !isNaN(parseFloat(form.precio)) && (
              <p style={{ margin: '12px 0 0', color: '#2A6E2A', fontWeight: 600 }}>
                Precio con IVA: ${Math.round(parseFloat(form.precio) * 1.16).toLocaleString('es-MX')} MXN
              </p>
            )}
            <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={cerrar} style={btnStyle('#888')}>Cancelar</button>
              <button onClick={guardar} style={btnStyle('#2A6E2A')}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const th = { padding: '9px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#555', borderBottom: '1px solid #e8ecf8' }
const td = { padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }
const inputStyle = { padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14, width: '100%', boxSizing: 'border-box', marginTop: 4 }
const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 13, fontWeight: 600, color: '#333' }
const modalOverlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }
const modalBox = { background: '#fff', borderRadius: 10, padding: 28, width: '90%', maxWidth: 580, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }
const btnStyle = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 })
const btnSmall = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 4, padding: '4px 9px', cursor: 'pointer', fontSize: 12 })
const btnControl = { background: '#fff', border: '1px solid #ccc', borderRadius: 6, padding: '7px 12px', cursor: 'pointer', fontSize: 13, color: '#555' }
const linkBtn = (bg) => ({ background: bg, color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: 11, fontWeight: 600, textDecoration: 'none', display: 'inline-block' })
