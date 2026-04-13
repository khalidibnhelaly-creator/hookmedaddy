'use client'
import * as XLSX from 'xlsx'

interface Hook {
  id: number
  hook: string
  hook_type: string
  mechanic: string
}

interface Anatomy {
  first_word_function: string
  tension_point: string
  forbidden_trigger: string
  cta_alignment: string
}

interface OutputData {
  awareness_stage?: string
  platform?: string
  hooks?: Hook[]
  top_hook?: { hook: string; why: string }
  caption?: string
  cta?: string
  visual_brief?: string
  why_it_works?: string
  ab_variants?: Array<{ variant: string; hook: string; hook_type: string }>
  anatomy?: Anatomy | null
}

interface Props {
  output: OutputData | OutputData[]
  productName?: string
}

export default function ExportButton({ output, productName }: Props) {

  const buildRows = (data: OutputData) => {
    const rows: Record<string, string>[] = []

    // Top hook
    if (data.top_hook?.hook) {
      rows.push({
        'Section': 'Top Hook',
        'Content': data.top_hook.hook,
        'Notes': data.top_hook.why || '',
        'Stage': data.awareness_stage || '',
        'Platform': data.platform || '',
      })
    }

    // All hooks
    if (data.hooks && data.hooks.length > 0) {
      data.hooks.forEach((h, i) => {
        rows.push({
          'Section': `Hook ${i + 1}`,
          'Content': h.hook,
          'Notes': `${h.hook_type} — ${h.mechanic}`,
          'Stage': data.awareness_stage || '',
          'Platform': data.platform || '',
        })
      })
    }

    // A/B variants
    if (data.ab_variants && data.ab_variants.length > 0) {
      data.ab_variants.forEach(v => {
        rows.push({
          'Section': `Variant ${v.variant}`,
          'Content': v.hook,
          'Notes': v.hook_type,
          'Stage': data.awareness_stage || '',
          'Platform': data.platform || '',
        })
      })
    }

    // Caption
    if (data.caption) {
      rows.push({
        'Section': 'Caption',
        'Content': data.caption,
        'Notes': '',
        'Stage': data.awareness_stage || '',
        'Platform': data.platform || '',
      })
    }

    // CTA
    if (data.cta) {
      rows.push({
        'Section': 'CTA',
        'Content': data.cta,
        'Notes': '',
        'Stage': data.awareness_stage || '',
        'Platform': data.platform || '',
      })
    }

    // Visual brief
    if (data.visual_brief) {
      rows.push({
        'Section': 'Visual Brief',
        'Content': data.visual_brief,
        'Notes': '',
        'Stage': data.awareness_stage || '',
        'Platform': data.platform || '',
      })
    }

    // Why it works
    if (data.why_it_works) {
      rows.push({
        'Section': 'Why It Works',
        'Content': data.why_it_works,
        'Notes': '',
        'Stage': data.awareness_stage || '',
        'Platform': data.platform || '',
      })
    }

    // Anatomy
    if (data.anatomy) {
      Object.entries(data.anatomy).forEach(([k, v]) => {
        rows.push({
          'Section': `Anatomy — ${k.replace(/_/g, ' ')}`,
          'Content': v,
          'Notes': '',
          'Stage': data.awareness_stage || '',
          'Platform': data.platform || '',
        })
      })
    }

    return rows
  }

  const handleExport = () => {
    const allRows: Record<string, string>[] = []

    if (Array.isArray(output)) {
      output.forEach(stage => {
        allRows.push(...buildRows(stage))
        allRows.push({ 'Section': '---', 'Content': '', 'Notes': '', 'Stage': '', 'Platform': '' })
      })
    } else {
      allRows.push(...buildRows(output))
    }

    const ws = XLSX.utils.json_to_sheet(allRows)

    // Column widths
    ws['!cols'] = [
      { wch: 28 },
      { wch: 80 },
      { wch: 50 },
      { wch: 24 },
      { wch: 20 },
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Copy Stack')

    const filename = `hookmedaddy_${(productName || 'export').toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.xlsx`
    XLSX.writeFile(wb, filename)
  }

  return (
    <button
      onClick={handleExport}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        background: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all .15s',
      }}
      onMouseOver={e => (e.currentTarget.style.background = 'var(--bg2)')}
      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1v8M3 6l3.5 3.5L10 6M1 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Export Excel
    </button>
  )
}
