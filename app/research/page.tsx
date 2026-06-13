'use client';

import { useState } from 'react';
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
        <div style={{