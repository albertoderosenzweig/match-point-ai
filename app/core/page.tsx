'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CorePage() {
  const [intakeText, setIntakeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [extractedCore, setExtractedCore] = useState<any>(null);
  const [savedLogs, setSavedLogs] = useState<any[]>([]);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeText.trim()) return;

    setLoading(true);
    
    setTimeout(() => {
      setExtractedCore({
        propuesta_valor: "Predictive occupancy optimization for Padel courts using intelligent player matching.",
        pilares: ["Operational efficiency (94.2% usage)", "Member retention (A+ Score)", "Core Optimizer suggestion"],
        metricas_exito: "Critical reduction of empty slots in morning peak hours (08:00 - 09:30)."
      });
      setLoading(false);
    }, 1200);
  };

  const handleSaveToSupabase = async () => {
    if (!extractedCore) return;
    setSaving(true);

    try {
      const { data, error } = await supabase
        .from('core_outputs')
        .insert([{ intake_text: intakeText, extracted_core: extractedCore }])
        .select();

      if (error) {
        console.error("Save error:", error.message);
        alert(`Supabase Error: ${error.message}`);
      } else {
        const newLog = {
          id: data[0]?.id || Date.now(),
          created_at: new Date().toLocaleTimeString(),
          intake_text: intakeText,
          extracted_core: extractedCore
        };
        
        setSavedLogs([newLog, ...savedLogs]);
        alert("Success! Core Agent data saved to Supabase.");
        
        setIntakeText('');
        setExtractedCore(null);
      }
    } catch (err) {
      console.error(err);
      alert("Network error connecting to Supabase.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#f3f4f6', backgroundColor: '#0b0f12', borderRadius: '12px', marginTop: '20px' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' }}>
        <h1 style={{ color: '#a3e635', marginBottom: '10px', fontSize: '2rem', fontWeight: 'bold' }}>🧬 CENTRAL CONTROL MODULE — CORE AGENT</h1>
        <p style={{ color: '#9ca3af', margin: 0 }}>Week 1: Intelligent processing & DB integration</p>
      </header>

      <section style={{ marginBottom: '40px', background: '#111827', padding: '24px', borderRadius: '8px', border: '1px solid #374151' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#a3e635' }}>📥 Operations Intake</h2>
        <form onSubmit={handleExtract}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#d1d5db' }}>
            Enter operational description, special notes, or member data for core processing:
          </label>
          <textarea
            value={intakeText}
            onChange={(e) => setIntakeText(e.target.value)}
            placeholder="Example: Level 4.5, prefers backhand, requires high-demand slot optimization..."
            rows={5}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', backgroundColor: '#1f2937', color: '#fff', border: '1px solid #4b5563', boxSizing: 'border-box', marginBottom: '15px', fontSize: '1rem' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ background: '#a3e635', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            {loading ? 'Processing with AI...' : '⚡ Execute Core Agent'}
          </button>
        </form>
      </section>

      {extractedCore && (
        <section style={{ marginBottom: '40px', background: '#111827', padding: '24px', borderRadius: '8px', border: '2px solid #a3e635', boxShadow: '0 4px 20px rgba(163,230,53,0.15)' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#a3e635', marginTop: 0, marginBottom: '15px' }}>✨ Predictive Occupancy Analysis</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#9ca3af' }}>💡 Extracted Value Proposition:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#e5e7eb' }}>{extractedCore.propuesta_valor}</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#9ca3af' }}>🎯 Operational Pillars:</strong>
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px', color: '#e5e7eb' }}>
              {extractedCore.pilares.map((pilar: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{pilar}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#9ca3af' }}>📊 Metric Impact:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#a3e635', fontWeight: 'bold' }}>{extractedCore.metricas_exito}</p>
          </div>

          <button
            onClick={handleSaveToSupabase}
            disabled={saving}
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            {saving ? 'Saving...' : '💾 Save to Supabase (core_outputs)'}
          </button>
        </section>
      )}

      <section style={{ background: '#111827', padding: '24px', borderRadius: '8px', border: '1px solid #374151' }}>
        <h2 style={{ fontSize: '1.1rem', margin: '0 0 15px 0', color: '#9ca3af' }}>📋 Dashboard Preview (Real-Time)</h2>
        {savedLogs.length === 0 ? (
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Waiting for interaction. Successful records in `core_outputs` will be listed here.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedLogs.map((log) => (
              <div key={log.id} style={{ background: '#1f2937', padding: '16px', borderRadius: '6px', border: '1px solid #4b5563', fontSize: '0.9rem' }}>
                <span style={{ color: '#a3e635', fontSize: '0.8rem', fontWeight: 'bold' }}>⏱️ Saved Record: ID #{log.id}</span>
                <p style={{ margin: '8px 0 0 0', color: '#d1d5db' }}><strong style={{ color: '#9ca3af' }}>Input:</strong> "{log.intake_text.substring(0, 80)}..."</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}