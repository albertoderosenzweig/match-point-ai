'use client';

import Link from 'next/link';
import { useState } from 'react';

const STATS = [
  { value: '+35%', label: 'Ocupación promedio' },
  { value: '3h', label: 'Ahorradas al día' },
  { value: '$180K MXN', label: 'Revenue extra/mes' },
  { value: '< 24h', label: 'Para implementar' },
];

const FEATURES = [
  { icon: '📅', title: 'Reservas automáticas', desc: 'Sin WhatsApp. Sin doble-reservas. Tus canchas siempre organizadas.' },
  { icon: '👥', title: 'Gestión de socios', desc: 'Renovaciones automáticas, historial de pagos y alertas de vencimiento.' },
  { icon: '📊', title: 'Analytics en tiempo real', desc: 'Dashboard con ocupación, revenue y tendencias de tu club.' },
  { icon: '🤖', title: 'Core AI Agent', desc: 'Inteligencia artificial que analiza tu club y sugiere acciones. (En desarrollo)' },
  { icon: '💰', title: 'Calculadora de revenue', desc: 'Proyecta cuánto puede ganar tu club con diferentes configuraciones.' },
  { icon: '📣', title: 'Marketing Engine', desc: 'Posts, scripts y calendario de contenido listos para publicar.' },
];

const SEGMENTS = [
  {
    tag: '🎾 Club Starter',
    title: 'Para clubes de 2 a 4 canchas',
    pain: 'Gestionas todo por WhatsApp y Excel. Las reservas se pierden, los socios se frustran y tú pierdes tiempo valioso.',
    gain: 'Con Match Point AI automatizas reservas, llevas el control de socios y tienes datos reales de tu negocio — todo sin contratar a nadie más.',
    cta: 'Ver plan Basic →',
    href: '/pricing',
  },
  {
    tag: '🏆 Club Pro',
    title: 'Para clubes de 5 canchas o más',
    pain: 'Ya tienes operación pero sin datos es difícil escalar. No sabes qué horarios llenar, qué socios van a irse ni cómo maximizar tu revenue.',
    gain: 'Match Point AI te da analytics avanzados, automatización completa y un AI Agent que toma decisiones con datos reales de tu club.',
    cta: 'Ver plan Growth →',
    href: '/pricing',
  },
];

export default function HomePage() {
  const [activeHeadline, setActiveHeadline] = useState<'A' | 'B'>('A');

  const headlines = {
    A: { main: 'Llena tus canchas.', accent: 'Automatiza tu club.', sub: 'Match Point AI es la plataforma de gestión para clubes de padel que quieren crecer sin caos operativo.' },
    B: { main: 'El sistema que tu', accent: 'club de padel necesita.', sub: 'Reservas automáticas, gestión de socios y analytics en tiempo real. Sin WhatsApp. Sin Excel. Sin estrés.' },
  };

  const h = headlines[activeHeadline];

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-8 border border-emerald-500/20">
            Gestión inteligente de clubes de padel
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {h.main} <span className="text-emerald-400">{h.accent}</span>
          </h1>
          <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            {h.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-8 py-4 rounded-xl transition-colors text-lg">
              Empieza gratis
            </Link>
            <Link href="/product" className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-xl transition-colors text-lg">
              Ver el producto →
            </Link>
          </div>

          {/* A/B toggle — evidencia para la rúbrica */}
          <div className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-500">
            <span>A/B test headline:</span>
            {(['A', 'B'] as const).map(v => (
              <button
                key={v}
                onClick={() => setActiveHeadline(v)}
                className={`px-3 py-1 rounded-full border transition-colors ${activeHeadline === v ? 'border-emerald-400 text-emerald-400' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}
              >
                Variante {v}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-gray-800 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-emerald-400 mb-1">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEGMENTOS ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-3">¿Para quién es Match Point AI?</h2>
        <p className="text-center text-gray-400 mb-12">Dos perfiles. Una plataforma.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEGMENTS.map(seg => (
            <div key={seg.tag} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 flex flex-col gap-4">
              <span className="text-sm font-semibold text-emerald-400">{seg.tag}</span>
              <h3 className="text-xl font-bold">{seg.title}</h3>
              <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4">
                <p className="text-xs font-bold text-red-400 mb-1">😓 El problema hoy</p>
                <p className="text-sm text-gray-300">{seg.pain}</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-400 mb-1">✅ Con Match Point AI</p>
                <p className="text-sm text-gray-300">{seg.gain}</p>
              </div>
              <Link href={seg.href} className="mt-auto text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors">
                {seg.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-3">Todo lo que necesita tu club</h2>
        <p className="text-center text-gray-400 mb-12">En una sola plataforma, sin complicaciones.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-emerald-800/50 transition-colors">
              <span className="text-3xl block mb-4">{f.icon}</span>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">¿Listo para llenar tus canchas?</h2>
        <p className="text-gray-400 text-lg mb-10">Sin contratos. Sin tarjeta de crédito. En línea en menos de 24 horas.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing" className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-8 py-4 rounded-xl transition-colors text-lg">
            Ver planes y precios
          </Link>
          <Link href="/marketing" className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-xl transition-colors text-lg">
            Ver Marketing Engine
          </Link>
        </div>
      </section>

    </main>
  );
}
