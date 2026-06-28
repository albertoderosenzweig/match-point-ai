'use client';

import Link from 'next/link';
import { useState } from 'react';

const STEPS = [
  {
    id: 1,
    tag: 'Semana 1 y 2',
    title: 'Core AI Agent + Research Dashboard',
    description: 'El punto de partida: un agente de IA que analiza el negocio de un club de padel y un dashboard de benchmarking con datos reales de competidores en Mexico.',
    features: ['Agente simulado con analisis de propuesta de valor', 'Dashboard de investigacion de mercado', 'Comparativa de competidores con datos reales'],
    link: '/core',
    linkLabel: 'Ver Core AI Agent',
    link2: '/research',
    link2Label: 'Ver Research Dashboard',
    color: 'emerald',
  },
  {
    id: 2,
    tag: 'Semana 3',
    title: 'Product + Pricing Simulator',
    description: 'Arquitectura del producto con dos segmentos de cliente claramente definidos y una calculadora de revenue interactiva con 5 sliders y persistencia en Supabase.',
    features: ['2 segmentos: Club Starter y Club Pro', '3 planes de precios en MXN', 'Calculadora de revenue con guardado en Supabase'],
    link: '/product',
    linkLabel: 'Ver Product Page',
    link2: '/pricing',
    link2Label: 'Ver Pricing + Calculadora',
    color: 'blue',
  },
  {
    id: 3,
    tag: 'Semana 4',
    title: 'Marketing Engine',
    description: 'Sistema completo de contenido de marketing: 10 posts, 3 video scripts, calendario de 14 dias, A/B tester de headlines y guardado de assets en Supabase.',
    features: ['10 social posts listos para publicar', '3 video scripts con estructura gancho/cuerpo/CTA', 'A/B tester con resultados guardados en Supabase'],
    link: '/marketing',
    linkLabel: 'Ver Marketing Engine',
    color: 'purple',
  },
  {
    id: 4,
    tag: 'Semana 5',
    title: 'Chat Assistant',
    description: 'Asistente publico con flujo de intake de 3 preguntas, logica de recomendacion de plan, guardrail para preguntas fuera de tema, checkpoint humano y feedback.',
    features: ['3 preguntas de intake guiadas', 'Recomendacion personalizada Basic/Growth/Enterprise', 'Guardrail + feedback guardado en Supabase'],
    link: '/chat',
    linkLabel: 'Ver Chat Assistant',
    color: 'orange',
  },
  {
    id: 5,
    tag: 'Semana 6',
    title: 'Dashboard + Docs + Demo',
    description: 'Integracion final: dashboard con datos reales de todas las tablas, biblioteca de prompts y build logs por semana, y este walkthrough guiado del producto completo.',
    features: ['Dashboard con datos reales de Supabase', 'Prompt library y build logs de 6 semanas', 'Mapa de agentes y roadmap Version 2'],
    link: '/dashboard',
    linkLabel: 'Ver Dashboard',
    link2: '/docs',
    link2Label: 'Ver Docs',
    color: 'emerald',
  },
];

const AGENT_MAP = [
  { id: 'core', label: 'Core AI Agent', desc: 'Analisis de negocio', week: 'S1-S2', x: 50, y: 20 },
  { id: 'research', label: 'Research Dashboard', desc: 'Benchmarking', week: 'S2', x: 200, y: 20 },
  { id: 'product', label: 'Product Page', desc: 'Segmentos + valor', week: 'S3', x: 350, y: 20 },
  { id: 'pricing', label: 'Pricing + Calc', desc: 'Revenue simulator', week: 'S3', x: 500, y: 20 },
  { id: 'marketing', label: 'Marketing Engine', desc: 'Contenido + A/B', week: 'S4', x: 125, y: 130 },
  { id: 'chat', label: 'Chat Assistant', desc: 'Intake + recomend.', week: 'S5', x: 350, y: 130 },
  { id: 'supabase', label: 'Supabase', desc: 'Base de datos', week: 'Core', x: 237, y: 230 },
];

const IMPACT = [
  { icon: 'Valor creado', items: ['Automatiza 3+ horas diarias de gestion manual por WhatsApp', 'Permite a clubes pequenos operar con datos reales sin contratar staff adicional', 'Calculadora de revenue ayuda a tomar decisiones de precio con datos', 'Chat advisor reduce friccion en el proceso de venta'] },
  { icon: 'Riesgos mitigados', items: ['Todas las respuestas del chat estan claramente etiquetadas como simuladas', 'Guardrail evita que el asistente responda fuera de su dominio', 'Sin procesamiento de pagos reales ni datos sensibles de usuarios', 'RLS activado en todas las tablas de Supabase'] },
  { icon: 'Limitaciones honestas', items: ['Gemini API no disponible en tier gratuito en Mexico — core sigue simulado', 'Sin autenticacion: cualquiera puede ver los datos del dashboard', 'Contenido de marketing es hardcoded, no generado por IA en tiempo real', 'Sin integracion con sistemas de reservas existentes'] },
];

const ROADMAP = [
  { version: 'V2.1', title: 'Gemini AI Integration', desc: 'Conectar Core AI Agent con Gemini API cuando este disponible en Mexico para respuestas reales en tiempo real.' },
  { version: 'V2.2', title: 'User Authentication', desc: 'Implementar auth con Supabase para que cada club tenga su propio dashboard privado con sus datos.' },
  { version: 'V2.3', title: 'Real Reservation System', desc: 'Modulo de reservas real con calendario, confirmaciones automaticas y recordatorios por WhatsApp API.' },
  { version: 'V2.4', title: 'Payment Integration', desc: 'Integrar Stripe o Conekta para cobros de membresias y reservas directamente en la plataforma.' },
  { version: 'V2.5', title: 'Mobile App', desc: 'App nativa para socios del club con reservas, pagos y notificaciones usando React Native.' },
];

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(1);

  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-500/50 bg-emerald-900/10',
    blue: 'border-blue-500/50 bg-blue-900/10',
    purple: 'border-purple-500/50 bg-purple-900/10',
    orange: 'border-orange-500/50 bg-orange-900/10',
  };

  const tagColorMap: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  const step = STEPS.find(s => s.id === activeStep)!;

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      <section className="pt-24 pb-12 px-6 text-center border-b border-gray-800">
        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-emerald-500/20">
          Demo Final - Semana 6
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Match Point AI <span className="text-emerald-400">completo</span></h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Walkthrough guiado de las 6 semanas del proyecto. Cada modulo construido, probado y desplegado.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-8">Recorrido por semana</h2>
        <div className="flex gap-2 mb-8 flex-wrap">
          {STEPS.map(s => (
            <button key={s.id} onClick={() => setActiveStep(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${activeStep === s.id ? 'bg-emerald-500 text-gray-950 border-emerald-500' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-emerald-600'}`}>
              {s.tag}
            </button>
          ))}
        </div>

        <div className={`rounded-2xl p-8 border-2 ${colorMap[step.color]}`}>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 border ${tagColorMap[step.color]}`}>{step.tag}</span>
          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>
          <ul className="space-y-2 mb-8">
            {step.features.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-emerald-400 mt-0.5">+</span>{f}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 flex-wrap">
            <Link href={step.link} className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm">
              {step.linkLabel}
            </Link>
            {step.link2 && (
              <Link href={step.link2} className="border border-gray-700 hover:border-gray-500 text-white px-6 py-3 rounded-xl transition-colors text-sm">
                {step.link2Label}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-2">Mapa de Agentes</h2>
        <p className="text-gray-400 text-sm mb-8">Como se conectan todos los modulos de Match Point AI.</p>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 overflow-x-auto">
          <svg viewBox="0 0 600 320" className="w-full max-w-2xl mx-auto">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 2L8 5L2 8" fill="none" stroke="#10b981" strokeWidth="1.5"/>
              </marker>
            </defs>
            <line x1="125" y1="55" x2="237" y2="215" stroke="#10b981" strokeWidth="1" strokeDasharray="4" markerEnd="url(#arr)" opacity="0.4"/>
            <line x1="350" y1="55" x2="237" y2="215" stroke="#10b981" strokeWidth="1" strokeDasharray="4" markerEnd="url(#arr)" opacity="0.4"/>
            <line x1="500" y1="55" x2="350" y2="215" stroke="#10b981" strokeWidth="1" strokeDasharray="4" markerEnd="url(#arr)" opacity="0.4"/>
            <line x1="125" y1="165" x2="237" y2="215" stroke="#10b981" strokeWidth="1" strokeDasharray="4" markerEnd="url(#arr)" opacity="0.4"/>
            <line x1="350" y1="165" x2="350" y2="215" stroke="#10b981" strokeWidth="1" strokeDasharray="4" markerEnd="url(#arr)" opacity="0.4"/>
            {AGENT_MAP.map(node => (
              <g key={node.id}>
                <rect x={node.x - 60} y={node.y} width="120" height="60" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
                <text x={node.x} y={node.y + 20} textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">{node.label}</text>
                <text x={node.x} y={node.y + 35} textAnchor="middle" fill="#9ca3af" fontSize="9">{node.desc}</text>
                <text x={node.x} y={node.y + 50} textAnchor="middle" fill="#6b7280" fontSize="8">{node.week}</text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-2">Impact Check</h2>
        <p className="text-gray-400 text-sm mb-8">Valor creado, riesgos mitigados y limitaciones honestas del proyecto.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMPACT.map((section, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <p className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">{section.icon}</p>
              <ul className="space-y-3">
                {section.items.map(item => (
                  <li key={item} className="text-sm text-gray-400 leading-relaxed flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5 shrink-0">-</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-2">Version 2 Roadmap</h2>
        <p className="text-gray-400 text-sm mb-8">Las siguientes 5 features planeadas para el proximo sprint.</p>
        <div className="space-y-4">
          {ROADMAP.map(item => (
            <div key={item.version} className="bg-gray-900 rounded-xl p-5 border border-gray-800 flex gap-4">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full shrink-0 h-fit mt-0.5">{item.version}</span>
              <div>
                <p className="font-semibold text-white mb-1">{item.title}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
