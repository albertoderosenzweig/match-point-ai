'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const globalBenchmarks = [
  { name: 'World Padel Tour', country: 'Spain', metric: '500K+ spectators/year', insight: 'Monetizes through streaming rights and premium court branding.', tag: 'Global Leader', tagBg: '#E6F1FB', tagColor: '#0C447C' },
  { name: 'Padel Nuestro', country: 'Spain', metric: '200+ locations', insight: 'Franchise model with AI-driven court availability optimization.', tag: 'Franchise', tagBg: '#EAF3DE', tagColor: '#3B6D11' },
  { name: 'Bullpadel Academy', country: 'UAE', metric: '98% court utilization', insight: 'Dynamic pricing by hour drops empty slots to near zero.', tag: 'Pricing Model', tagBg: '#FAEEDA', tagColor: '#854F0B' },
  { name: 'Club de Padel Paris', country: 'France', metric: '4.8★ retention score', insight: 'AI matchmaking increased member retention by 34% in 12 months.', tag: 'AI Matching', tagBg: '#EEEDFE', tagColor: '#3C3489' },
  { name: 'Padel Haus', country: 'USA', metric: '$2.1M ARR', insight: 'Membership tiers with predictive demand forecasting per court.', tag: 'Revenue Model', tagBg: '#E1F5EE', tagColor: '#085041' },
];

const competitors = [
  { name: 'Padel MX', type: 'Direct Competitor', courts: 8, pricing: '$350/hr', tech: 'Basic app', gap: 'No AI matching' },
  { name: 'Club Deportivo Chapultepec', type: 'Direct Competitor', courts: 6, pricing: '$280/hr', tech: 'WhatsApp booking', gap: 'Manual scheduling' },
  { name: 'Padel Factory CDMX', type: 'Direct Competitor', courts: 12, pricing: '$400/hr', tech: 'Website form', gap: 'No occupancy optimization' },
  { name: 'Palacio de los Deportes', type: 'Substitute', courts: 20, pricing: '$150/hr', tech: 'None', gap: 'Multi-sport, no specialization' },
  { name: 'Smart Fit Racquet', type: 'Substitute', courts: 4, pricing: '$120/hr', tech: 'Mobile app', gap: 'Low quality courts' },
  { name: 'Tennis CDMX', type: 'Substitute', courts: 15, pricing: '$200/hr', tech: 'Basic CRM', gap: 'Different sport audience' },
  { name: 'Padel Point Polanco', type: 'Direct Competitor', courts: 5, pricing: '$380/hr', tech: 'Instagram DMs', gap: 'Zero digital infrastructure' },
  { name: 'Club Reforma Athletic', type: 'Substitute', courts: 3, pricing: '$450/hr', tech: 'Phone booking', gap: 'Premium but no tech stack' },
];

const risks = [
  { label: 'Competitor adopts AI first', quadrant: 'critical' },
  { label: 'Court availability data inaccuracy', quadrant: 'critical' },
  { label: 'Low tech adoption by managers', quadrant: 'monitor' },
  { label: 'Mobile UX friction', quadrant: 'monitor' },
  { label: 'Key staff turnover', quadrant: 'contingency' },
  { label: 'Supabase pricing increase', quadrant: 'accept' },
];

export default function ResearchPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
   useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('research_outputs')
        .select('id, saved_at, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setLogs(data);
    };
    fetchLogs();
  }, [saved]);
  const filtered = competitors.filter(c => {
    const matchType = filter === 'All' || c.type === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('research_outputs').insert([{
        benchmarks: globalBenchmarks,
        competitors,
        risks,
        saved_at: new Date().toISOString(),
      }]);
      if (error) alert(`Supabase error: ${error.message}`);
      else setSaved(true);
    } catch { alert('Network error.'); }
    finally { setSaving(false); }
  };

  const quadrantConfig: Record<string, { label: string; bg: string; color: string; border: string }> = {
    critical: { label: 'Critical', bg: '#FCEBEB', color: '#A32D2D', border: '#F09595' },
    monitor: { label: 'Monitor', bg: '#FAEEDA', color: '#854F0B', border: '#EF9F27' },
    contingency: { label: 'Contingency', bg: '#E6F1FB', color: '#185FA5', border: '#85B7EB' },
    accept: { label: 'Accept', bg: '#EAF3DE', color: '#3B6D11', border: '#97C459' },
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#f3f4f6', backgroundColor: '#0b0f12', borderRadius: 12, marginTop: 20 }}>

      <header style={{ marginBottom: 40, borderBottom: '1px solid #1f2937', paddingBottom: 20 }}>
        <h1 style={{ color: '#a3e635', fontSize: '2rem', fontWeight: 'bold', marginBottom: 8 }}>Research + Benchmarking Dashboard</h1>
        <p style={{ color: '#9ca3af', margin: 0 }}>Week 2: Competitive intelligence module — Match Point AI</p>
      </header>

      {/* GLOBAL BENCHMARKS */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#a3e635', fontSize: '1.1rem', marginBottom: 16 }}>5 Global Benchmark Examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {globalBenchmarks.map((b, i) => (
            <div key={i} style={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{b.name}</strong>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: b.tagBg, color: b.tagColor }}>{b.tag}</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4 }}>{b.country}</p>
              <p style={{ color: '#a3e635', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: 8 }}>{b.metric}</p>
              <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: 1.5 }}>{b.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEXICO LOCALIZATION */}
      <section style={{ marginBottom: 40, background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: 24 }}>
        <h2 style={{ color: '#a3e635', fontSize: '1.1rem', marginBottom: 16 }}>Mexico Market Localization</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { stat: '340%', label: 'Padel court growth in CDMX (2020–2025)' },
            { stat: '78%', label: 'Clubs still use WhatsApp or phone for bookings' },
            { stat: '$380 MXN', label: 'Average peak-hour court rate in Polanco/Santa Fe' },
          ].map((m, i) => (
            <div key={i} style={{ background: '#1f2937', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#a3e635', fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>{m.stat}</p>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: 4 }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPETITOR TABLE */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#a3e635', fontSize: '1.1rem', marginBottom: 16 }}>8 Competitors + Substitutes</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: '8px 12px', borderRadius: 6, background: '#1f2937', border: '1px solid #4b5563', color: '#fff', fontSize: '0.9rem' }}
          />
          {['All', 'Direct Competitor', 'Substitute'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
                background: filter === f ? '#a3e635' : '#1f2937', color: filter === f ? '#000' : '#9ca3af' }}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#1f2937', color: '#9ca3af' }}>
                {['Name', 'Type', 'Courts', 'Pricing', 'Tech', 'Gap'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '10px 14px', color: '#fff', fontWeight: 'bold' }}>{c.name}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6,
                      background: c.type === 'Direct Competitor' ? '#FCEBEB' : '#FAEEDA',
                      color: c.type === 'Direct Competitor' ? '#A32D2D' : '#854F0B' }}>{c.type}</span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#d1d5db' }}>{c.courts}</td>
                  <td style={{ padding: '10px 14px', color: '#a3e635', fontWeight: 'bold' }}>{c.pricing}</td>
                  <td style={{ padding: '10px 14px', color: '#d1d5db' }}>{c.tech}</td>
                  <td style={{ padding: '10px 14px', color: '#9ca3af', fontSize: '0.8rem' }}>{c.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RISK MAP */}
      <section style={{ marginBottom: 40, background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: 24 }}>
        <h2 style={{ color: '#a3e635', fontSize: '1.1rem', marginBottom: 16 }}>Risk Map</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {Object.entries(quadrantConfig).map(([key, q]) => (
            <div key={key} style={{ borderRadius: 8, padding: 16, background: q.bg, border: `0.5px solid ${q.border}` }}>
              <p style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: 8, color: q.color, textTransform: 'uppercase' }}>{q.label}</p>
              {risks.filter(r => r.quadrant === key).map((r, i) => (
                <p key={i} style={{ fontSize: '0.82rem', margin: '4px 0', color: q.color }}>• {r.label}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SAVE */}
      <section style={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: 24, textAlign: 'center' }}>
        <h2 style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: 12 }}>Save Research Record to Supabase</h2>
        {saved ? (
          <p style={{ color: '#a3e635', fontWeight: 'bold' }}>Research saved successfully to research_outputs table!</p>
        ) : (
          <button onClick={handleSave} disabled={saving}
            style={{ background: '#10b981', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
            {saving ? 'Saving...' : 'Save Research Output'}
          </button>
        )}
      </section>
{/* DASHBOARD WIDGET */}
<section style={{ marginTop: 24, background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: 24 }}>
  <h2 style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: 12 }}>
    Recent Research Records
  </h2>
  {logs.length === 0 ? (
    <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>No records saved yet.</p>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {logs.map((log) => (
        <div key={log.id} style={{ background: '#1f2937', padding: '12px 16px', borderRadius: 6, border: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#a3e635', fontSize: '0.8rem', fontWeight: 'bold' }}>
            Record #{log.id}
          </span>
          <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
            {new Date(log.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )}
</section>
    </div>
  );
}