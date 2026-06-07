'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializamos el cliente de Supabase directamente con tus variables de entorno públicas de Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CorePage() {
  const [intakeText, setIntakeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [extractedCore, setExtractedCore] = useState<any>(null);
  const [savedLogs, setSavedLogs] = useState<any[]>([]);

  // ⚡ Ejecución simulada del Agente Generativo
  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeText.trim()) return;

    setLoading(true);
    
    setTimeout(() => {
      setExtractedCore({
        propuesta_valor: "Optimización predictiva de la ocupación en canchas de pádel mediante emparejamiento inteligente de jugadores.",
        pilares: ["Eficiencia operativa (94.2% uso)", "Retención de miembros (Score A+)", "Sugerencia del optimizador Core"],
        metricas_exito: "Reducción crítica de ventanas muertas en horarios matutinos (08:00 - 09:30)."
      });
      setLoading(false);
    }, 1200);
  };

  // 💾 CONEXIÓN REAL A SUPABASE (Tabla: core_outputs)
  const handleSaveToSupabase = async () => {
    if (!extractedCore) return;
    setSaving(true);

    try {
      const { data, error } = await supabase
        .from('core_outputs')
        .insert([
          {
            intake_text: intakeText,
            extracted_core: extractedCore // Se guarda directo en formato JSON o Texto
          }
        ])
        .select();

      if (error) {
        console.error("Error al guardar:", error.message);
        alert(`Error de Supabase: ${error.message}`);
      } else {
        // Si se guarda con éxito, lo agregamos al historial visual (Dashboard Preview)
        const newLog = {
          id: data[0]?.id || Date.now(),
          created_at: new Date().toLocaleTimeString(),
          intake_text: intakeText,
          extracted_core: extractedCore
        };
        
        setSavedLogs([newLog, ...savedLogs]);
        alert("¡Éxito! Los datos del Core Agent se guardaron en la tabla core_outputs de Supabase.");
        
        // Limpiamos los campos para dejar la interfaz lista para el siguiente ingreso
        setIntakeText('');
        setExtractedCore(null);
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un problema de red al conectar con Supabase.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#f3f4f6', backgroundColor: '#0b0f12', borderRadius: '12px', marginTop: '20px' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' }}>
        <h1 style={{ color: '#a3e635', marginBottom: '10px', fontSize: '2rem', fontWeight: 'bold' }}>🧬 MÓDULO DE CONTROL CENTRAL — CORE AGENT</h1>
        <p style={{ color: '#9ca3af', margin: 0 }}>Semana 1: Procesamiento inteligente e integración con Base de Datos</p>
      </header>

      {/* 🧱 1. INTAKE FORM */}
      <section style={{ marginBottom: '40px', background: '#111827', padding: '24px', borderRadius: '8px', border: '1px solid #374151' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#a3e635' }}>📥 Intake de Operaciones</h2>
        <form onSubmit={handleExtract}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#d1d5db' }}>
            Ingrese la descripción operativa, notas especiales o datos del miembro para el procesamiento del núcleo:
          </label>
          <textarea
            value={intakeText}
            onChange={(e) => setIntakeText(e.target.value)}
            placeholder="Ejemplo: Nivel de juego 4.5, prefiere revés, requiere optimización en bloque de horario de alta demanda..."
            rows={5}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', backgroundColor: '#1f2937', color: '#fff', border: '1px solid #4b5563', boxSizing: 'border-box', marginBottom: '15px', fontSize: '1rem' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ background: '#a3e635', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            {loading ? 'Procesando con IA...' : '⚡ Ejecutar Agente Core'}
          </button>
        </form>
      </section>

      {/* 🖼️ 2. CORE EXTRACTION OUTPUT CARD */}
      {extractedCore && (
        <section style={{ marginBottom: '40px', background: '#111827', padding: '24px', borderRadius: '8px', border: '2px solid #a3e635', boxShadow: '0 4px 20px rgba(163,230,53,0.15)' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#a3e635', marginTop: 0, marginBottom: '15px' }}>✨ Análisis Predictivo de Ocupación (Core Card)</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#9ca3af' }}>💡 Propuesta de Valor Extraída:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#e5e7eb' }}>{extractedCore.propuesta_valor}</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#9ca3af' }}>🎯 Pilares Operativos:</strong>
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px', color: '#e5e7eb' }}>
              {extractedCore.pilares.map((pilar: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{pilar}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#9ca3af' }}>📊 Impacto en Métricas:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#a3e635', fontWeight: 'bold' }}>{extractedCore.metricas_exito}</p>
          </div>

          {/* 🧱 SAVE BUTTON */}
          <button
            onClick={handleSaveToSupabase}
            disabled={saving}
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            {saving ? 'Guardando...' : '💾 Guardar en Supabase (core_outputs)'}
          </button>
        </section>
      )}

      {/* 📊 3. DASHBOARD PREVIEW */}
      <section style={{ background: '#111827', padding: '24px', borderRadius: '8px', border: '1px solid #374151' }}>
        <h2 style={{ fontSize: '1.1rem', margin: '0 0 15px 0', color: '#9ca3af' }}>📋 Vista Previa del Tablero (Dashboard Real-Time)</h2>
        {savedLogs.length === 0 ? (
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Esperando interacción. Los registros exitosos en `core_outputs` se listarán aquí.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedLogs.map((log) => (
              <div key={log.id} style={{ background: '#1f2937', padding: '16px', borderRadius: '6px', border: '1px solid #4b5563', fontSize: '0.9rem' }}>
                <span style={{ color: '#a3e635', fontSize: '0.8rem', fontWeight: 'bold' }}>⏱️ Registro Guardado: ID #{log.id}</span>
                <p style={{ margin: '8px 0 0 0', color: '#d1d5db' }}><strong style={{ color: '#9ca3af' }}>Input:</strong> "{log.intake_text.substring(0, 80)}..."</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}// Verificación de sincronización
