import { useState } from 'react'

export default function Configuracion({ config, setConfig }) {
  const [form, setForm] = useState({ ...config })
  const [guardado, setGuardado] = useState(false)

  const guardar = () => {
    setConfig({
      ...form,
      umbralPCBasica: parseFloat(form.umbralPCBasica) || 15000,
      armadoBasico: parseFloat(form.armadoBasico) || 8000,
      armadoEstandar: parseFloat(form.armadoEstandar) || 5000,
      vigenciaDias: parseInt(form.vigenciaDias) || 7,
    })
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  return (
    <div style={{ padding: 24, maxWidth: 520 }}>
      <h2 style={{ color: '#1E3EBF', marginBottom: 20 }}>Configuración</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label style={labelStyle}>
          Nombre del negocio
          <input value={form.negocio} onChange={e => setForm({ ...form, negocio: e.target.value })} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Tu número de WhatsApp
          <input value={form.whatsapp || ''} onChange={e => setForm({ ...form, whatsapp: e.target.value })} style={inputStyle} placeholder="Ej: 526241581511 (con código de país, sin +)" />
          <span style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Se usa para el botón "Enviar por WhatsApp" en las cotizaciones</span>
        </label>

        <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
        <p style={{ margin: 0, fontWeight: 700, color: '#333' }}>Lógica de armado</p>
        <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
          Si el subtotal de componentes (sin IVA) es menor al umbral, se sugiere el armado básico en vez del estándar.
        </p>

        <label style={labelStyle}>
          Umbral PC básica (MXN sin IVA)
          <input type="number" value={form.umbralPCBasica} onChange={e => setForm({ ...form, umbralPCBasica: e.target.value })} style={inputStyle} />
          <span style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Si subtotal &lt; este valor → se usa el armado básico</span>
        </label>

        <label style={labelStyle}>
          Costo de armado básico (MXN sin IVA)
          <input type="number" value={form.armadoBasico} onChange={e => setForm({ ...form, armadoBasico: e.target.value })} style={inputStyle} />
          <span style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Para PCs de bajo costo</span>
        </label>

        <label style={labelStyle}>
          Costo de armado estándar (MXN sin IVA)
          <input type="number" value={form.armadoEstandar} onChange={e => setForm({ ...form, armadoEstandar: e.target.value })} style={inputStyle} />
          <span style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Para el resto de PCs</span>
        </label>

        <div style={{ background: '#f0f4ff', borderRadius: 8, padding: 12, fontSize: 13 }}>
          <strong>Con estos valores:</strong><br />
          Si subtotal &lt; ${parseFloat(form.umbralPCBasica || 0).toLocaleString('es-MX')} → armado = ${parseFloat(form.armadoBasico || 0).toLocaleString('es-MX')} + IVA<br />
          Si subtotal ≥ ${parseFloat(form.umbralPCBasica || 0).toLocaleString('es-MX')} → armado = ${parseFloat(form.armadoEstandar || 0).toLocaleString('es-MX')} + IVA
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
        <p style={{ margin: 0, fontWeight: 700, color: '#333' }}>Cotizaciones</p>

        <label style={labelStyle}>
          Vigencia de cotización (días)
          <input type="number" min="1" value={form.vigenciaDias ?? 7} onChange={e => setForm({ ...form, vigenciaDias: e.target.value })} style={inputStyle} />
          <span style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Aparece en el PDF y en el texto de WhatsApp</span>
        </label>

        <button onClick={guardar} style={btnStyle}>
          {guardado ? '✅ Guardado' : 'Guardar configuración'}
        </button>
      </div>
    </div>
  )
}

const inputStyle = { padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14, marginTop: 4, boxSizing: 'border-box' }
const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: 13, fontWeight: 600, color: '#333' }
const btnStyle = { background: '#1E3EBF', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', cursor: 'pointer', fontWeight: 700, fontSize: 15 }
