'use client';

import { useState } from 'react';

const PROMPTS = [
  { week: 'S1-S2', title: 'Core AI Agent + Research Dashboard', prompt: 'Soy Alberto de Rosenzweig, estudiante de la Ibero en Negocios Inteligentes y Comercio Digital. Proyecto: Match Point AI — app para gestion de clubes de padel. Stack: Next.js 16, TypeScript, Tailwind, Supabase, Vercel. Semana 1-2: crear /core con agente simulado y /research con benchmarking dashboard. Solo herramientas gratuitas.' },
  { week: 'S3', title: 'Product + Pricing Simulator', prompt: 'Semana 3 requiere: /product y /pricing pages, calculador de revenue, 3 pricing tiers en MXN, 2 segmentos de clientes (Club Starter y Club Pro), guardar escenarios en Supabase. Incluir tabla de supuestos con 8 parametros. Entrega el domingo.' },
  { week: 'S4', title: 'Marketing Engine', prompt: 'Crear /marketing page con: brand system con target persona, 10 social posts con botones copiar/guardar, 3 video scripts en acordeon con estructura gancho/cuerpo/CTA, calendario de 14 dias, A/B tester con 2 tests que guarden resultados en Supabase, y panel de assets guardados.' },
  { week: 'S5', title: 'Public Chatbot / Guided Assistant', prompt: 'Crear /chat page con: chat UI con burbujas de mensajes, 3 preguntas de intake con opciones seleccionables, logica de recomendacion Basic/Growth/Enterprise segun respuestas, guardrail para preguntas fuera de tema, checkpoint humano antes de recomendar, botones de feedback Util/No util que guarden en Supabase.' },
  { week: 'S6', title: 'Dashboard + Demo + Docs', prompt: 'Crear 3 paginas finales: /dashboard que muestre datos reales de revenue_scenarios, marketing_assets y chat_sessions de Supabase; /demo con walkthrough guiado por semanas, mapa de agentes SVG, impact check y Version 2 roadmap; /docs con prompt library y build logs de las 6 semanas.' },
  { week: 'Fix', title: 'Supabase URL Error Fix', prompt: 'La pagina da error supabaseUrl is required en Next.js 16 Turbopack. El archivo .env.local existe y tiene los valores correctos. Fix: mover el createClient() dentro de una funcion getSupabase() que se llame en runtime, no al cargar el modulo.' },
];

const BUILD_LOGS = [
  {
    week: 'Semana 1-2',
    title: 'Core AI Agent + Research Dashboard',
    status: 'Completado',
    pages: ['/core', '/research'],
    highlights: ['Agente simulado con setTimeout (Gemini pendiente por limitacion regional)', 'Dashboard de benchmarking con datos de competidores en Mexico', 'RLS habilitado en core_outputs y research_outputs'],
    issues: ['Gemini API free tier con quota 0 en Mexico — revertido a modo simulado', 'RLS deshabilitado inicialmente — corregido en Semana 3'],
  },
  {
    week: 'Semana 3',
    title: 'Product + Pricing Simulator',
    status: 'Completado',
    pages: ['/product', '/pricing'],
    highlights: ['3 tiers de precios en MXN: Basic $900, Growth $2400, Enterprise $5500', 'Calculadora con 5 sliders y guardado en Supabase', 'Toggle mensual/anual con -20%'],
    issues: ['Error supabaseUrl is required — resuelto hardcodeando credenciales en lib/supabase.ts', 'Carpeta lib creada en lugar incorrecto — recreada desde terminal'],
  },
  {
    week: 'Semana 4',
    title: 'Marketing Engine + Homepage Upgrade',
    status: 'Completado',
    pages: ['/marketing', '/'],
    highlights: ['10 posts + 3 scripts + calendario 14 dias', 'A/B tester con resultados guardados en Supabase', 'Homepage actualizado con 2 segmentos y stats bar'],
    issues: ['Error supabaseUrl en /marketing — fix: getSupabase() function', 'Caracteres UTF-8 corruptos por PowerShell BOM — resuelto usando solo ASCII'],
  },
  {
    week: 'Semana 5',
    title: 'Public Chatbot / Guided Assistant',
    status: 'Completado',
    pages: ['/chat'],
    highlights: ['Intake flow con 3 preguntas y opciones seleccionables', 'Guardrail detecta 20+ keywords fuera de tema', 'Feedback guardado en chat_sessions'],
    issues: ['Pantalla negra en movil — resuelto esperando deploy completo de Vercel', 'Version inicial en ingles — traducida a espanol en segundo commit'],
  },
  {
    week: 'Semana 6',
    title: 'Integrated Agentic Venture',
    status: 'En progreso',
    pages: ['/dashboard', '/demo', '/docs'],
    highlights: ['Dashboard con datos reales de 3 tablas de Supabase', 'Walkthrough guiado con mapa de agentes SVG', 'Prompt library y build logs completos'],
    issues: [],
  },
];

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'prompts' | 'logs'>('prompts');
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  function copyPrompt(text: string, i: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPrompt(i);
      setTimeout(() => setCopiedPrompt(null), 2000);
    });
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      <section className="pt-24 pb-10 px-6 text-center border-b border-gray-800">
        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-emerald-500/20">
          Docs - Semana 6
        </span>
        <h1 className="text-4xl font-bold mb-3">Prompt Library <span className="text-emerald-400">+ Build Logs</span></h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Todos los prompts usados con Claude y el registro de construccion de las 6 semanas.</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <div className="flex gap-2 border-b border-gray-800 mb-8">
          <button onClick={() => setActiveTab('prompts')} className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'prompts' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>
            Prompt Library ({PROMPTS.length})
          </button>
          <button onClick={() => setActiveTab('logs')} className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'logs' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>
            Build Logs ({BUILD_LOGS.length} semanas)
          </button>
        </div>

        {activeTab === 'prompts' && (
          <div className="space-y-4 pb-12">
            {PROMPTS.map((prompt, i) => (
              <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full">{prompt.week}</span>
                    <p className="font-semibold text-white text-sm">{prompt.title}</p>
                  </div>
                  <button onClick={() => copyPrompt(prompt.prompt, i)} className="text-xs text-gray-500 hover:text-emerald-400 transition-colors px-3 py-1 rounded-lg hover:bg-gray-800 border border-gray-700">
                    {copiedPrompt === i ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed bg-gray-800/50 rounded-lg p-4 font-mono">{prompt.prompt}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6 pb-12">
            {BUILD_LOGS.map((log, i) => (
              <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full">{log.week}</span>
                    <p className="font-semibold text-white">{log.title}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${log.status === 'Completado' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>{log.status}</span>
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {log.pages.map(page => (
                    <span key={page} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-lg font-mono">{page}</span>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Lo que se construyo</p>
                    <ul className="space-y-1">
                      {log.highlights.map(h => (
                        <li key={h} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5 shrink-0">+</span>{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {log.issues.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Issues resueltos</p>
                      <ul className="space-y-1">
                        {log.issues.map(issue => (
                          <li key={issue} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-yellow-400 mt-0.5 shrink-0">!</span>{issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
