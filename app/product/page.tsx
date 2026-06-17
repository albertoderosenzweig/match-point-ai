"use client";

import Link from "next/link";

const segments = [
  {
    id: "starter",
    label: "Club Starter",
    emoji: "🎾",
    tagline: "Para clubes que están comenzando a digitalizarse",
    profile: "2–6 canchas · hasta 300 socios · 1 administrador",
    pains: [
      "WhatsApp para reservas (caos total)",
      "Excel para llevar control de pagos",
      "Sin visibilidad de ocupación ni ingresos",
    ],
    gains: [
      "App de reservas lista en 48 horas",
      "Dashboard de ingresos en tiempo real",
      "Notificaciones automáticas a socios",
    ],
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
  },
  {
    id: "pro",
    label: "Club Pro",
    emoji: "🏆",
    tagline: "Para clubes establecidos que buscan escalar",
    profile: "7–20 canchas · 300–2000 socios · equipo de gestión",
    pains: [
      "Software genérico que no entiende el padel",
      "Datos dispersos sin inteligencia accionable",
      "Torneos imposibles de coordinar manualmente",
    ],
    gains: [
      "IA que predice demanda y optimiza precios",
      "Gestión de torneos integrada",
      "Reportes automáticos para dirección",
    ],
    color: "from-violet-600 to-indigo-700",
    accent: "violet",
  },
];

const features = [
  {
    icon: "📅",
    title: "Reservas Inteligentes",
    desc: "Motor de reservas con detección de conflictos, listas de espera automáticas y cancelaciones sin fricción.",
  },
  {
    icon: "💳",
    title: "Pagos & Membresías",
    desc: "Cobro recurrente, control de membresías por categoría y conciliación automática de ingresos.",
  },
  {
    icon: "🤖",
    title: "Core AI Agent",
    desc: "El agente central analiza patrones de ocupación y sugiere acciones para maximizar tu revenue.",
  },
  {
    icon: "🏅",
    title: "Torneos",
    desc: "Crea, gestiona y comunica torneos sin hojas de cálculo. Brackets, resultados y ranking automáticos.",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "KPIs clave en tiempo real: ocupación, ingresos por cancha, socios activos y churn prediction.",
  },
  {
    icon: "📲",
    title: "App para Socios",
    desc: "PWA que los socios instalan en su celular. Reservas, historial y notificaciones push.",
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur z-10">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Match<span className="text-emerald-400">Point</span> AI
        </Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/product" className="text-white font-medium">Producto</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Precios</Link>
          <Link href="/research" className="hover:text-white transition-colors">Research</Link>
          <Link href="/core" className="hover:text-white transition-colors">Core AI</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-emerald-500/20">
          Gestión de Clubes de Padel con IA
        </span>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Tu club, en piloto{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            automático
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Match Point AI centraliza reservas, pagos, torneos y análisis en una
          sola plataforma. Menos WhatsApp, más padel.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/pricing"
            className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Ver Planes y Precios →
          </Link>
          <Link
            href="/core"
            className="border border-white/20 hover:border-white/40 px-6 py-3 rounded-lg transition-colors text-gray-300"
          >
            Probar el AI Agent
          </Link>
        </div>
      </section>

      {/* Segmentos */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 text-center mb-3">
          ¿Para quién es?
        </h2>
        <h3 className="text-3xl font-bold text-center mb-12">
          Dos segmentos, una solución
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {segments.map((seg) => (
            <div
              key={seg.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/8 transition-colors"
            >
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${seg.color} text-white text-sm font-semibold px-3 py-1 rounded-full mb-4`}>
                <span>{seg.emoji}</span>
                <span>{seg.label}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{seg.profile}</p>
              <p className="text-lg font-medium mb-6">{seg.tagline}</p>

              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">
                  Problemas actuales
                </p>
                <ul className="space-y-1">
                  {seg.pains.map((p) => (
                    <li key={p} className="text-sm text-gray-400 flex gap-2">
                      <span className="text-red-400 mt-0.5">✕</span> {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Con Match Point AI
                </p>
                <ul className="space-y-1">
                  {seg.gains.map((g) => (
                    <li key={g} className="text-sm text-gray-300 flex gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span> {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 text-center mb-3">
          Funcionalidades
        </h2>
        <h3 className="text-3xl font-bold text-center mb-12">
          Todo lo que necesita tu club
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 transition-colors"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-semibold mb-2">{f.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border border-emerald-500/20 p-12">
          <h3 className="text-3xl font-bold mb-4">
            ¿Cuánto puede generar tu club?
          </h3>
          <p className="text-gray-400 mb-8">
            Usa nuestra calculadora de revenue para ver el impacto real en tus
            ingresos.
          </p>
          <Link
            href="/pricing"
            className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Calcular mi Revenue →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-gray-600 text-sm">
        Match Point AI · Proyecto Semana 3 · Ibero Negocios Inteligentes · Prof. Patricia Navarro
      </footer>
    </div>
  );
}
