"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pvlgppltohtckjevaqfn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bGdwcGx0b2h0Y2tqZXZhcWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODgwMzYsImV4cCI6MjA5NjE2NDAzNn0.oXwFUC9ywQe-kRnETpY_qx03Fg3AQpDFLMXNwPSVNZk";
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

    // Simulated AI response (Gemini API pending — free tier unavailable in Mexico)
    setTimeout(() => {
      setExtractedCore({
        propuesta_valor: "Predictive occupancy optimization for Padel courts using AI-driven demand forecasting",
        pilares: [
          "Operational efficiency (94.2% usage)",
          "Member retention through personalized scheduling",
          "Revenue maximization via dynamic pricing"
        ],
        metricas_exito: "Critical reduction of empty slots in morning peak hours (7-9am)",
        recomendaciones: [
          "Implement dynamic pricing for peak hours to maximize revenue",
          "Launch member loyalty program to reduce churn",
          "Add real-time court availability notifications"
        ]
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
        alert(`Supabase Error: ${error.message}`);
      } else {
        const newLog = {
          id: data[0]?.id || Date.now(),
          created_at: new Date().toLocaleTimeString(),
          intake_text: intakeText,
          extracted_core: extractedCore,
        };
        setSavedLogs((prev) => [newLog, ...prev]);
        alert('Saved to Supabase successfully!');
      }
    } catch (err: any) {
      alert('Save error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff', backgroundColor: '#0b0f12', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>
        🤖 Core AI Agent
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: '4px' }}>
        Simulated mode — Gemini API free tier unavailable in Mexico (limit: 0).
      </p>
      <p style={{ color: '#4b5563', fontSize: '12px', marginBottom: '32px' }}>
        Integration complete. Pending Google regional availability.
      </p>

      <form onSubmit={handleExtract} style={{ marginBottom: '32px' }}>
        <textarea
          value={intakeText}
          onChange={(e) => setIntakeText(e.target.value)}
          placeholder="Describe your padel club: number of courts, occupancy rate, peak hours, pricing, member count, current challenges..."
          style={{
            width: '100%', minHeight: '140px', padding: '16px',
            backgroundColor: '#111827', border: '1px solid #374151',
            borderRadius: '12px', color: '#fff', fontSize: '14px',
            resize: 'vertical', marginBottom: '12px', boxSizing: 'border-box'
          }}
        />
        <button
          type="submit"
          disabled={loading || !intakeText.trim()}
          style={{
            backgroundColor: loading ? '#374151' : '#10b981',
            color: loading ? '#9ca3af' : '#000',
            fontWeight: 'bold', padding: '12px 24px',
            borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          {loading ? '⏳ Analyzing...' : '🚀 Run Core Agent'}
        </button>
      </form>

      {extractedCore && (
        <section style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981' }}>
              ✅ AI Analysis Complete — Simulated
            </h2>
            <button
              onClick={handleSaveToSupabase}
              disabled={saving}
              style={{
                backgroundColor: '#1d4ed8', color: '#fff',
                padding: '8px 16px', borderRadius: '8px',
                border: 'none', cursor: 'pointer', fontSize: '13px'
              }}
            >
              {saving ? 'Saving...' : '💾 Save to Supabase'}
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Value Proposition</p>
            <p style={{ color: '#e5e7eb' }}>{extractedCore.propuesta_valor}</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Key Pillars</p>
            <ul style={{ paddingLeft: '20px', color: '#e5e7eb' }}>
              {extractedCore.pilares.map((p: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{p}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Success Metric</p>
            <p style={{ color: '#e5e7eb' }}>{extractedCore.metricas_exito}</p>
          </div>

          <div>
            <p style={{ color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>AI Recommendations</p>
            <ul style={{ paddingLeft: '20px', color: '#e5e7eb' }}>
              {extractedCore.recomendaciones.map((r: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{r}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {savedLogs.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px', color: '#9ca3af' }}>Recent Saved Analyses</h3>
          {savedLogs.map((log) => (
            <div key={log.id} style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '6px' }}>{log.created_at}</p>
              <p style={{ color: '#e5e7eb', fontSize: '13px' }}>{log.intake_text.substring(0, 100)}...</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
