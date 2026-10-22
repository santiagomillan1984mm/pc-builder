import { useState, useMemo, useRef } from 'react'
import { buscarComponentes } from '../lib/baseComponentes'

const CATEGORIAS = ['CPU', 'GPU', 'RAM', 'Motherboard', 'SSD M.2', 'SSD SATA', 'HDD', 'PSU', 'Case', 'Cooler', 'Otro']
const ETIQUETA = { Case: 'Gabinete', Cooler: 'Disipador', PSU: 'Fuente', GPU: 'Tarjeta de video', Motherboard: 'Tarjeta madre', CPU: 'Procesador' }

// Adivina la categoría de algo escrito a mano
function adivinarCategoria(t) {
  const s = t.toLowerCase()
  if (/ddr[345]|\bram\b|memoria/.test(s)) return 'RAM'
  if (/rtx|gtx|\brx ?\d|radeon|geforce|arc b/.test(s)) return 'GPU'
  if (/ryzen|core i\d|core ultra|intel i\d/.test(s)) return 'CPU'
  if (/\d{3,4} ?w\b|fuente|psu/.test(s)) return 'PSU'
  if (/[abhxz]\d{3}m?\b|motherboard|tarjeta madre/.test(s)) return 'Motherboard'
  if (/nvme|m\.2|ssd/.test(s)) return 'SSD M.2'
  if (/gabinete|case/.test(s)) return 'Case'
  if (/disipador|cooler|liquid|aio|\d{3} ?mm/.test(s)) return 'Cooler'
  return 'Otro'
}

export default function BuscadorComponentes({ components, onElegir }) {
  const [texto, setTexto] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [activo, setActivo] = useState(0)
  const [manual, setManual] = useState(null) // { nombre, categoria }
  const inputRef = useRef(null)

  const resultados = useMemo(() => buscarComponentes(texto, components, 10), [texto, components])
  const opciones = texto.trim().length >= 2 ? [...resultados, { tipo: 'manual' }] : []

  const limpiar = () => { setTexto(''); setActivo(0); setManual(null); inputRef.current?.focus() }

  const elegir = (op) => {
    if (op.tipo === 'manual') { setManual({ nombre: texto.trim(), categoria: adivinarCategoria(texto) }); setAbierto(false); return }
    onElegir(op)
    limpiar()
  }

  const onKey = (e) => {
    if (!opciones.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActivo(a => Math.min(a + 1, opciones.length - 1)); setAbierto(true) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActivo(a => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); elegir(opciones[activo] || opciones[0]) }
    else if (e.key === 'Escape') setAbierto(false)
  }

  return (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      <input
        ref={inputRef}
        value={texto}
        onChange={e => { setTexto(e.target.value); setAbierto(true); setActivo(0); setManual(null) }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 150)}
        onKeyDown={onKey}
        placeholder="🔍 Escribe para buscar: ej. cooler master 850, b550 tomahawk, 16gb ddr5, 5060 ti…"
        style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', fontSize: 15, border: '2px solid #1E3EBF', borderRadius: 8, outline: 'none' }}
      />

      {abierto && opciones.length > 0 && (
        <div style={{ position: 'absolute', zIndex: 30, left: 0, right: 0, top: '100%', marginTop: 4, background: '#fff', border: '1px solid #c8d5f8', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,.15)', maxHeight: 380, overflowY: 'auto' }}>
          {opciones.map((op, i) => op.tipo === 'manual' ? (
            <div key="manual" onMouseDown={() => elegir(op)} onMouseEnter={() => setActivo(i)}
              style={{ padding: '10px 14px', cursor: 'pointer', background: i === activo ? '#fef3c7' : '#fffbeb', borderTop: '1px solid #eee', fontSize: 14, color: '#92400e', fontWeight: 600 }}>
              ➕ Agregar "{texto.trim()}" escrito a mano
            </div>
          ) : (
            <div key={op.id} onMouseDown={() => elegir(op)} onMouseEnter={() => setActivo(i)}
              style={{ padding: '8px 14px', cursor: 'pointer', background: i === activo ? '#eef2ff' : '#fff', display: 'flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1E3EBF', background: '#e0e7ff', borderRadius: 4, padding: '2px 6px', minWidth: 62, textAlign: 'center' }}>
                {ETIQUETA[op.categoria] || op.categoria}
              </span>
              <span style={{ flex: 1 }}>
                <b>{op.nombre}</b>
                {op.notas && <span style={{ color: '#6b7280', fontSize: 12 }}> · {op.notas}</span>}
              </span>
              {op.origen === 'catalogo'
                ? <span style={{ fontSize: 11, color: '#059669' }}>en tu catálogo{op.precio ? ` · $${Math.round(op.precio * 1.16).toLocaleString('es-MX')}` : ''}</span>
                : <span style={{ fontSize: 11, color: '#9ca3af' }}>base de datos</span>}
            </div>
          ))}
        </div>
      )}

      {manual && (
        <div style={{ marginTop: 8, padding: 12, background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 14 }}>
          <input value={manual.nombre} onChange={e => setManual({ ...manual, nombre: e.target.value })}
            style={{ flex: '1 1 240px', padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14 }} />
          <select value={manual.categoria} onChange={e => setManual({ ...manual, categoria: e.target.value })}
            style={{ padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14 }}>
            {CATEGORIAS.map(c => <option key={c} value={c}>{ETIQUETA[c] ? `${ETIQUETA[c]} (${c})` : c}</option>)}
          </select>
          <button disabled={!manual.nombre.trim()} onClick={() => { onElegir({ origen: 'manual', nombre: manual.nombre.trim(), categoria: manual.categoria, grupo: '', notas: '' }); limpiar() }}
            style={{ padding: '7px 14px', background: '#1E3EBF', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>
            Agregar
          </button>
          <button onClick={() => setManual(null)} style={{ padding: '7px 10px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>Cancelar</button>
        </div>
      )}
    </div>
  )
}
