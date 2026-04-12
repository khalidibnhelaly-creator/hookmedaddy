'use client'
import { useState } from 'react'

const PLATFORMS = ['Facebook Feed','Facebook Reel','Instagram Feed','Instagram Reel','TikTok','YouTube Shorts','Twitter/X','LinkedIn','Email','SMS','Amazon Listing','Google Shopping']
const CATEGORIES = ['Beauty & Skincare','Food & Beverage','Fashion & Apparel','Health & Wellness','Home & Living','Pet Products','Fitness & Sports','Tech & Gadgets','Baby & Kids','Jewellery & Accessories','Other']
const AUDIENCES = ['Women 25-34','Women 35-50','Men 25-40','Men 40-55','Parents with young children','Fitness enthusiasts','Small business owners','Students','Health-conscious consumers','Luxury buyers','Budget shoppers','Other']
const FRUSTRATIONS = ['Wasting money on products that don\'t work','Not seeing results fast enough','Confusing or misleading claims','Low quality for the price paid','Complicated to use','Hard to find reliable options','Overwhelmed by too many choices','Paying for things that are not what they seem','Other']
const STAGES = [
  { value: 'stage_1', label: 'Stage 1 — Unaware (60%)' },
  { value: 'stage_2', label: 'Stage 2 — Problem Aware (20%)' },
  { value: 'stage_3', label: 'Stage 3 — Solution Aware (10%)' },
  { value: 'stage_4', label: 'Stage 4 — Product Aware (7%)' },
  { value: 'stage_5', label: 'Stage 5 — Most Aware (3%)' },
  { value: 'all_5_stages', label: 'All 5 Stages at once (Pro+)' },
]
const CONTEXTS = ['No campaign context','Product launch','Black Friday / Cyber Monday','Eid / Ramadan','Christmas / New Year','Back to school','Mother\'s Day','Valentine\'s Day','Restock announcement','Flash sale','New year new you']
const FORMATS = ['Single image post','Carousel','Short-form video / Reel','Long-form video','Story','Email newsletter','Product listing','Search ad']
const CONTENT_TYPES = [{ value: 'social_post', label: 'Social post + caption' },{ value: 'video_script', label: 'Video / reel script (+40 credits)' }]
const TONES = ['Direct and confident','Warm and conversational','Bold and provocative','Quiet and authoritative','Energetic and punchy','Empathetic and understanding']

const s: React.CSSProperties = {
  width: '100%', padding: '10px 14px', fontSize: 13, fontFamily: 'var(--font-sans)',
  border: '1px solid var(--border)', borderRadius: 2, background: 'var(--bg)',
  color: 'var(--ink)', outline: 'none', appearance: 'none' as const,
}
const label: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 6 }

interface Props { onGenerate: (data: Record<string, string>) => void; loading: boolean }

export default function GeneratorForm({ onGenerate, loading }: Props) {
  const [form, setForm] = useState<Record<string, string>>({
    productName: '', productCategory: '', productDescription: '', coreTransformation: '',
    price: '', campaignContext: 'No campaign context', targetAudience: '', frustration: '',
    deepDesire: '', awarenessLevel: 'stage_1', platform: 'Instagram Reel',
    contentFormat: 'Short-form video / Reel', contentType: 'social_post', tone: 'Direct and confident',
    ctaGoal: 'awareness', geoMarket: 'global',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => { e.preventDefault(); onGenerate(form) }

  return (
    <form onSubmit={submit}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, padding: 32, marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Group A — Your product</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div><label style={label}>Product name *</label><input style={s} required value={form.productName} onChange={set('productName')} placeholder="e.g. Sundarbans Raw Honey" /></div>
          <div><label style={label}>Category *</label><select style={s} value={form.productCategory} onChange={set('productCategory')} required><option value="">Select category</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={label}>What it does *</label>
          <textarea style={{ ...s, resize: 'vertical', minHeight: 72 }} required value={form.productDescription} onChange={set('productDescription')} placeholder="Single-origin, unprocessed honey from mangrove forests" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={label}>Core transformation</label><input style={s} value={form.coreTransformation} onChange={set('coreTransformation')} placeholder="From adulterated to real, pure honey" /></div>
          <div><label style={label}>Price point</label><input style={s} value={form.price} onChange={set('price')} placeholder="e.g. $24 / 250g" /></div>
        </div>
      </div>

      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, padding: 32, marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Group B — Your audience</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div><label style={label}>Target audience *</label><select style={s} value={form.targetAudience} onChange={set('targetAudience')} required><option value="">Select audience</option>{AUDIENCES.map(a => <option key={a}>{a}</option>)}</select></div>
          <div><label style={label}>Primary frustration *</label><select style={s} value={form.frustration} onChange={set('frustration')} required><option value="">Select frustration</option>{FRUSTRATIONS.map(f => <option key={f}>{f}</option>)}</select></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={label}>What they deeply want</label><input style={s} value={form.deepDesire} onChange={set('deepDesire')} placeholder="To finally trust what they are eating" /></div>
          <div><label style={label}>Awareness stage *</label><select style={s} value={form.awarenessLevel} onChange={set('awarenessLevel')}>{STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}</select></div>
        </div>
      </div>

      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, padding: 32, marginBottom: 32 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Group C — Platform and format</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div><label style={label}>Platform *</label><select style={s} value={form.platform} onChange={set('platform')}>{PLATFORMS.map(p => <option key={p}>{p}</option>)}</select></div>
          <div><label style={label}>Content format</label><select style={s} value={form.contentFormat} onChange={set('contentFormat')}>{FORMATS.map(f => <option key={f}>{f}</option>)}</select></div>
          <div><label style={label}>Content type</label><select style={s} value={form.contentType} onChange={set('contentType')}>{CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={label}>Campaign context</label><select style={s} value={form.campaignContext} onChange={set('campaignContext')}>{CONTEXTS.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label style={label}>Tone of voice</label><select style={s} value={form.tone} onChange={set('tone')}>{TONES.map(t => <option key={t}>{t}</option>)}</select></div>
        </div>
      </div>

      <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? 'var(--faint)' : 'var(--accent)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, padding: '15px 32px', border: 'none', borderRadius: 2, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.02em' }}>
        {loading ? 'Generating your copy stack...' : 'Generate copy stack'}
      </button>
    </form>
  )
}
