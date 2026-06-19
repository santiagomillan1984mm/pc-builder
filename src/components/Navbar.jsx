export default function Navbar({ pagina, setPagina }) {
  const links = [
    { id: 'catalogo', label: '📦 Catálogo' },
    { id: 'nueva-cotizacion', label: '➕ Nueva Cotización' },
    { id: 'cotizaciones', label: '📋 Cotizaciones' },
    { id: 'upgrades', label: '🔧 Upgrades' },
    { id: 'config', label: '⚙️ Configuración' },
  ]

  return (
    <nav style={{ background: '#1E3EBF', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 8, height: 56 }}>
      <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginRight: 24 }}>CaboGamespot</span>
      {links.map(l => (
        <button
          key={l.id}
          onClick={() => setPagina(l.id)}
          style={{
            background: pagina === l.id ? '#2A6E2A' : 'transparent',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '6px 14px',
            cursor: 'pointer',
            fontWeight: pagina === l.id ? 700 : 400,
            fontSize: 14,
          }}
        >
          {l.label}
        </button>
      ))}
    </nav>
  )
}
