'use client';

import { useState } from 'react';

export default function CorePage() {
  const [intakeText, setIntakeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedCore, setExtractedCore] = useState<any>(null);
  const [savedLogs, setSavedLogs] = useState<any[]>([]);

  // Función simulada para probar la interfaz (Cumple Gate 1 y 2 visual)
  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeText.trim()) return;

    setLoading(true);
    
    // Simulamos la respuesta del Agente Generativo por ahora para probar el diseño
    setTimeout(() => {
      setExtractedCore({
        propuesta_valor: "Optimización inteligente de tiempos y canchas de Pádel.",
        pilares: ["Eficiencia en reservas", "Automatización de estados", "Experiencia del jugador"],
        metricas_exito: "Reducción del 40% en canchas vacías en horas pico."
      });
      setLoading(false);
    }, 1500);
  };

  const handleSaveToSupabase = () => {
    if (!extractedCore) return;
    
    // Guardamos localmente en el estado para simular el Dashboard Preview por hoy
    const newLog = {
      id: Date.now(),
      created_at: new Date().toLocaleTimeString(),
      intake_text: intakeText,
      extracted_core: extractedCore
    };
    
    setSavedLogs([newLog, ...savedLogs]);
    alert("¡Evidencia guardada! Esto simula el guardado en la tabla core_outputs");
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ marginBottom: '40px', borderBottom: '2px solid #eaeaea', paddingBottom: '20px' }}>
        <h1 style={{ color: '#0070f3', marginBottom: '10px' }}>🧬 Match Point AI — Generative Core Agent</h1>
        <p style={{ color: '#666', margin: 0 }}>Semana 1: Extracción y Estructuración del Núcleo del Proyecto</p>
      </header>

      {/* 🧱 1. INTAKE FORM */}
      <section style={{ marginBottom: '40px', background: '#f9f9f9', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>📥 Formulario de Entrada (Intake Form)</h2>
        <form onSubmit={handleExtract}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#444' }}>
            Pega aquí la metodología, manifiesto o idea base de tu club de Pádel:
          </label>
          <textarea
            value={intakeText}
            onChange={(e) => setIntakeText(e.target.value)}
            placeholder="Ejemplo: Nuestro modelo de gestión busca automatizar las reservas de las canchas de pádel para evitar tiempos muertos, permitiendo a los miembros estatus VIP reservar con prioridad usando IA..."
            rows={6}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '15px', fontSize: '1rem' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ background: '#0070f3', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            {loading ? 'Procesando con IA...' : '⚡ Ejecutar Agente Core'}
          </button>
        </form>
      </section>

      {/* 🖼️ 2. CORE EXTRACTION OUTPUT CARD */}
      {extractedCore && (
        <section style={{ marginBottom: '40px', background: '#fff', padding: '24px', borderRadius: '8px', border: '2px solid #0070f3', boxShadow: '0 4px 12px rgba(0,112,243,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#0070f3', marginTop: 0, marginBottom: '15px' }}>✨ Tarjeta de Extracción Núcleo (Core Output Card)</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong>💡 Propuesta de Valor:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#555' }}>{extractedCore.propuesta_valor}</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>🎯 Pilares Fundamentales:</strong>
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px', color: '#555' }}>
              {extractedCore.pilares.map((pilar: string, i: number) => (
                <li key={i}>{pilar}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong>📊 Métricas de Éxito Estimadas:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#555' }}>{extractedCore.metricas_exito}</p>
          </div>

          {/* 🧱 SAVE BUTTON */}
          <button
            onClick={handleSaveToSupabase}
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            💾 Guardar en Supabase (core_outputs)
          </button>
        </section>
      )}

      {/* 📊 3. DASHBOARD PREVIEW */}
      <section style={{ background: '#f5f5f5', padding: '24px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2 style={{ fontSize: '1.1rem', margin: '0 0 15px 0', color: '#444' }}>📋 Vista Previa del Tablero (Dashboard Preview)</h2>
        {savedLogs.length === 0 ? (
          <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>No hay registros guardados en esta sesión todavía.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedLogs.map((log) => (
              <div key={log.id} style={{ background: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #e0e0e0', fontSize: '0.9rem' }}>
                <span style={{ color: '#888', fontSize: '0.8rem' }}>⏱️ {log.created_at}</span>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Texto ingresado: <span style={{ fontWeight: 'normal', color: '#666' }}>{log.intake_text.substring(0, 60)}...</span></p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}