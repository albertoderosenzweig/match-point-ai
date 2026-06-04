"use client";

import React, { useState } from 'react';

// Estructura de datos para simular el historial guardado en la base de datos (Supabase)
interface HistoryRecord {
  id: string;
  date: string;
  admin: string;
  member: string;
  court: string;
  action: string;
  status: 'completado' | 'pendiente';
}

export default function CorePage() {
  // Estado para el formulario de entrada del administrador
  const [formData, setFormData] = useState({
    memberName: '',
    courtNumber: 'Pista 1',
    timeSlot: '08:00 - 09:30',
    matchType: 'Clase Privada',
    notes: ''
  });

  // Datos simulados (Mock Data) para la tabla de historial inferior
  const [history, setHistory] = useState<HistoryRecord[]>([
    { id: '1', date: '2026-05-28', admin: 'Carlos M.', member: 'Alejandro Galán', court: 'Pista Cristal 1', action: 'Reserva Premium', status: 'completado' },
    { id: '2', date: '2026-05-28', admin: 'Carlos M.', member: 'Abigail Rodríguez', court: 'Pista Central', action: 'Optimización de Horario', status: 'completado' },
    { id: '3', date: '2026-05-27', admin: 'Sofía R.', member: 'Arturo Coello', court: 'Pista Panorámica 2', action: 'Asignación de Partner AI', status: 'pendiente' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Simulación de guardado: Datos enviados al motor de IA y listos para Supabase.');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 md:p-10 selection:bg-lime-400 selection:text-black">
      
      {/* HEADER PRINCIPAL */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-lime-400 font-mono font-bold">Módulo de Control Central</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            MATCH POINT <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">AI</span>
          </h1>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 font-mono font-bold text-sm">
            AD
          </div>
          <div>
            <p className="text-xs text-neutral-400 leading-none">Administrador</p>
            <p className="text-sm font-medium text-neutral-200">Club Panel</p>
          </div>
        </div>
      </header>

      {/* DASHBOARD GRID: FORMULARIO (IZQUIERDA) | METRICAS AI (DERECHA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO DE CAPTURA */}
        <div className="lg:col-span-5 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            Intake de Operaciones
          </h2>
          <p className="text-xs text-neutral-400 mb-6">Registre los datos del miembro para el procesamiento inteligente de horarios.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Nombre del Miembro</label>
              <input 
                type="text" 
                placeholder="Ej. Juan Lebrón" 
                value={formData.memberName}
                onChange={(e) => setFormData({...formData, memberName: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-lime-400 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Pista Sugerida</label>
                <select 
                  value={formData.courtNumber}
                  onChange={(e) => setFormData({...formData, courtNumber: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-lime-400 transition-colors"
                >
                  <option>Pista Central</option>
                  <option>Pista Cristal 1</option>
                  <option>Pista Panorámica 2</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Bloque de Horario</label>
                <select 
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-lime-400 transition-colors"
                >
                  <option>08:00 - 09:30</option>
                  <option>09:30 - 11:00</option>
                  <option>18:30 - 20:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Tipo de Match / Actividad</label>
              <div className="grid grid-cols-3 gap-2">
                {['Clase Privada', 'Open Match', 'Torneo interno'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, matchType: type})}
                    className={`py-2 px-1 text-xs rounded-md border font-medium transition-all ${
                      formData.matchType === type 
                        ? 'bg-lime-400 text-black border-lime-400 shadow-md shadow-lime-400/20' 
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Notas Especiales o Preferencias de Rival</label>
              <textarea 
                rows={3} 
                placeholder="Nivel de juego 4.5, prefiere revés, requiere hidratación premium..." 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-lime-400 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-black font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-lg shadow-lime-500/10 flex items-center justify-center gap-2 group"
            >
              Procesar con Match Point AI
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: DASHBOARD DE ANALISIS DE IA (PREMIUM MOCKUP) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          
          {/* CARD DE DIAGNÓSTICO IA */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-lime-400/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono bg-neutral-800 text-neutral-300 px-2 py-1 rounded tracking-wider uppercase border border-neutral-700">
                  Estado: Esperando Input Completo
                </span>
                <h3 className="text-lg font-bold text-white mt-3">Análisis Predictivo de Ocupación</h3>
              </div>
              <div className="bg-lime-400/10 text-lime-400 font-mono text-xs px-2 py-1 rounded border border-lime-400/20">
                Modelo v2.4-Padel
              </div>
            </div>

            {/* METRICAS PRE-RENDERIZADAS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg">
                <p className="text-xs font-mono text-neutral-400 mb-1">EFICIENCIA DE USO</p>
                <p className="text-2xl font-bold text-white font-mono">94.2%</p>
                <span className="text-[10px] text-lime-400 font-medium">↑ +3.1% optimizado</span>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg">
                <p className="text-xs font-mono text-neutral-400 mb-1">PARTNERS DISPONIBLES</p>
                <p className="text-2xl font-bold text-white font-mono">14</p>
                <span className="text-[10px] text-neutral-400 font-medium">Nivel 3.0 a 5.0</span>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg">
                <p className="text-xs font-mono text-neutral-400 mb-1">SCORE DE RETENCION</p>
                <p className="text-2xl font-bold text-lime-400 font-mono">A+</p>
                <span className="text-[10px] text-emerald-400 font-medium">Riesgo de churn bajo</span>
              </div>
            </div>

            {/* RECOMENDACIÓN DE LA IA STRUCTURADA */}
            <div className="bg-neutral-950 border border-neutral-800/80 rounded-lg p-4">
              <p className="text-xs font-mono text-lime-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400"></span>
                Sugerencia del Optimizador Core:
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                El bloque seleccionado <strong className="text-white">08:00 - 09:30</strong> presenta alta demanda cruzada. Para maximizar el engagement del club, la IA sugiere emparejar al jugador con el bloque de retos abiertos de las <span className="text-lime-400 font-medium">18:30 hrs</span>, liberando espacio para entrenamientos técnicos matutinos.
              </p>
            </div>
          </div>

          {/* MENSAJE DE ARQUITECTURA (RECORDATORIO ESCOLAR) */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 flex items-center gap-3">
            <div className="text-xl">💡</div>
            <p className="text-xs text-neutral-400 leading-normal">
              <strong className="text-neutral-200">Nota de Arquitectura Semanal:</strong> Los datos simulados en este panel demuestran la estructura de la UI antes de acoplar las llamadas directas a la API e iniciar las escrituras estructuradas en Supabase.
            </p>
          </div>

        </div>
      </div>

      {/* SECCIÓN INFERIOR: HISTORIAL DE REGISTROS (TABLA DE BASE DE DATOS) */}
      <section className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Historial de Decisiones Almacenadas</h3>
            <p className="text-xs text-neutral-400">Últimos registros sincronizados y procesados en la base de datos central.</p>
          </div>
          <div className="text-xs font-mono text-neutral-500">
            Mostrando 3 registros en tiempo real
          </div>
        </div>

        {/* TABLA RESPONSIVA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 text-xs font-mono uppercase bg-neutral-900/50">
                <th className="py-3 px-4 font-medium">Fecha</th>
                <th className="py-3 px-4 font-medium">Operador Admin</th>
                <th className="py-3 px-4 font-medium">Miembro</th>
                <th className="py-3 px-4 font-medium">Cancha / Pista</th>
                <th className="py-3 px-4 font-medium">Acción de IA</th>
                <th className="py-3 px-4 font-medium text-right">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {history.map((record) => (
                <tr key={record.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-neutral-400">{record.date}</td>
                  <td className="py-3.5 px-4 text-neutral-300 font-medium">{record.admin}</td>
                  <td className="py-3.5 px-4 text-white font-semibold">{record.member}</td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    <span className="bg-neutral-900 px-2 py-1 rounded text-xs border border-neutral-800 text-neutral-300">
                      {record.court}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-lime-400">{record.action}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      record.status === 'completado' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'completado' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}