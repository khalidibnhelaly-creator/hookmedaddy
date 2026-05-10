export function AwarenessPyramidVisual() {
  const stages = [
    { name: 'Most Aware', desc: 'Knows your product. Needs the push.', width: 30, color: '#C8430F' },
    { name: 'Product Aware', desc: 'Knows the product. Comparing.', width: 46, color: '#D8551F' },
    { name: 'Solution Aware', desc: 'Knows solutions exist. Searching.', width: 62, color: '#E26733' },
    { name: 'Problem Aware', desc: 'Feels the problem. No solution yet.', width: 78, color: '#EC7847' },
    { name: 'Unaware', desc: 'No idea a problem exists.', width: 94, color: '#F4895A' },
  ]
  return (
    <div style={{ background: 'var(--bg2)', borderRadius: 4, padding: '40px 32px', margin: '32px 0', border: '1px solid var(--border)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8, textAlign: 'center' }}>Schwartz Pyramid of Awareness</div>
      <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', marginBottom: 28 }}>Five buyer states. Each requires a fundamentally different message.</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {stages.map((s, i) => (
          <div key={s.name} style={{ width: `${s.width}%`, display: 'flex' }}>
            <div style={{
              flex: 1,
              background: s.color,
              color: 'white',
              padding: '14px 18px',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, opacity: 0.7 }}>0{5 - i}</span>
                <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.02em' }}>{s.name}</span>
              </div>
              <span style={{ fontSize: 12, opacity: 0.85, textAlign: 'right' }}>{s.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.04em' }}>
        <span>← Cold audience</span>
        <span>Warm audience →</span>
      </div>
    </div>
  )
}

export function StageDiagram({ stage, position, exampleHook }: { stage: string; position: 1 | 2 | 3 | 4 | 5; exampleHook: string }) {
  const colors = ['#F4895A', '#EC7847', '#E26733', '#D8551F', '#C8430F']
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--border)',
      borderRadius: 4,
      padding: '24px 28px',
      margin: '20px 0',
      borderLeft: `4px solid ${colors[position - 1]}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: colors[position - 1] }}>0{position}</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)' }}>Stage {position}: {stage}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontStyle: 'italic', lineHeight: 1.45, color: 'var(--ink)', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        &ldquo;{exampleHook}&rdquo;
      </div>
    </div>
  )
}
