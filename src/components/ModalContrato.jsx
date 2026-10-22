import { useState } from 'react'
import { generarContrato, CONTRATO_DEFAULTS, sumarDiasHabiles } from '../lib/exportContrato'

const btnStyle = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 })
const btnSecondary = { background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }

// Ventana para completar los datos del contrato antes de imprimirlo
export default function ModalContrato({ quote, components, config, onCerrar }) {
  const hoyISO = new Date().toISOString().slice(0, 10)
  const base = { ...CONTRATO_DEFAULTS, ...config }
  const [d, setD] = useState({
    nombre: quote.cliente?.nombre || '',
    telefono: quote.cliente?.telefono || '',
    correo: '',
    anticipoPct: base.anticipoPct,
    diasPiezas: base.diasPiezas,
    diasArmado: base.diasArmado,
    fechaFirma: hoyISO,
    notas: '',
  })
  const set = k => e => setD(p => ({ ...p, [k]: e.target.value }))
  const total = Number(quote.total) || 0
  const anticipo = Math.round(total * Number(d.anticipoPct || 0) / 100)
  const entrega = sumarDiasHabiles(sumarDiasHabiles(new Date(d.fechaFirma + 'T12:00:00'), Number(d.diasPiezas || 0)), Number(d.diasArmado || 0))
  const fmt = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
  const datos = { cliente: { nombre: d.nombre.trim(), telefono: d.telefono.trim(), correo: d.correo.trim() }, anticipoPct: Number(d.anticipoPct), diasPiezas: Number(d.diasPiezas), diasArmado: Number(d.diasArmado), fechaFirma: d.fechaFirma, notas: d.notas }
  const inp = { width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, fontFamily: 'inherit' }
  const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }
  return (
    <div onClick={onCerrar} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 520, maxHeight: '92vh', overflowY: 'auto', padding: 20, fontFamily: 'system-ui, sans-serif' }}>
        <h3 style={{ margin: '0 0 4px', color: '#0f766e' }}>📝 Contrato de compra y armado</h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: '#6b7280' }}>{quote.nombre} · Total {fmt(total)}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>Nombre del cliente</label><input value={d.nombre} onChange={set('nombre')} style={inp} /></div>
          <div><label style={lbl}>Teléfono</label><input value={d.telefono} onChange={set('telefono')} style={inp} /></div>
          <div><label style={lbl}>Correo (opcional)</label><input value={d.correo} onChange={set('correo')} style={inp} /></div>
          <div><label style={lbl}>Anticipo (%)</label><input type="number" value={d.anticipoPct} onChange={set('anticipoPct')} style={inp} /></div>
          <div><label style={lbl}>Fecha de firma</label><input type="date" value={d.fechaFirma} onChange={set('fechaFirma')} style={inp} /></div>
          <div><label style={lbl}>Días hábiles piezas</label><input type="number" value={d.diasPiezas} onChange={set('diasPiezas')} style={inp} /></div>
          <div><label style={lbl}>Días hábiles armado</label><input type="number" value={d.diasArmado} onChange={set('diasArmado')} style={inp} /></div>
          <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>Acuerdos adicionales (opcional)</label><textarea value={d.notas} onChange={set('notas')} rows={2} style={{ ...inp, resize: 'vertical' }} placeholder="Ej: incluye instalación de Windows y drivers" /></div>
        </div>
        <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: 8, padding: 10, marginTop: 12, fontSize: 13, color: '#134e4a' }}>
          Anticipo: <strong>{fmt(anticipo)}</strong> · Saldo al entregar: <strong>{fmt(total - anticipo)}</strong><br />
          Entrega estimada: <strong>{entrega.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</strong> · Garantía de armado: <strong>{base.garantiaArmadoDias} días</strong>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          <button onClick={() => generarContrato(quote, components, config, datos, 'imprimir')} style={{ ...btnStyle('#0f766e'), padding: '10px 16px', fontSize: 14 }}>🖨️ Imprimir</button>
          <button onClick={() => generarContrato(quote, components, config, datos, 'descargar')} style={{ ...btnStyle('#1E3EBF'), padding: '10px 16px', fontSize: 14 }}>⬇️ Descargar PDF</button>
          <button onClick={onCerrar} style={{ ...btnSecondary, padding: '10px 16px' }}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
