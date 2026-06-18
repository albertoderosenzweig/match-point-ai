"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase, type RevenueScenario } from "@/lib/supabase";

// ─── Pricing Tiers ───────────────────────────────────────────────────────────
const tiers = [
  {
    id: "basic",
    name: "Basic",
    emoji: "🎾",
    segment: "Club Starter",
    price: 900,
    priceAnnual: 720,
    description: "Para clubes pequeños que quieren dejar el caos del WhatsApp.",
    features: [
      "Hasta 6 canchas",
      "App de reservas para socios",
      "Dashboard de ocupación",
      "Notificaciones automáticas",
      "Soporte por email",
      "—",
      "—",
    ],
    cta: "Empezar gratis 14 días",
    highlight: false,
    color: "border-white/10",
    badge: null,
  },
  {
    id: "growth",
    name: "Growth",
    emoji: "🚀",
    segment: "Club Starter / Pro",
    price: 2400,
    priceAnnual: 1920,
    description: "Para clubes en crecimiento que quieren datos y automatización.",
    features: [
      "Hasta 12 canchas",
      "App de reservas para socios",
      "Dashboard avanzado + analytics",
      "Notificaciones automáticas",
      "Soporte prioritario",
      "Gestión de torneos",
      "Core AI Agent (insights básicos)",
    ],
    cta: "Empezar con Growth",
    highlight: true,
    color: "border-emerald-500",
    badge: "Más popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    emoji: "🏆",
    segment: "Club Pro",
    price: 5500,
    priceAnnual: 4400,
    description: "Para clubes premium que quieren IA predictiva y control total.",
    features: [
      "Canchas ilimitadas",
      "App de reservas para socios",
      "Dashboard ejecutivo + BI",
      "Notificaciones + campañas",
      "Soporte 24/7 + onboarding",
      "Torneos avanzados + ranking",
      "Core AI Agent completo + predicción de demanda",
    ],
    cta: "Hablar con ventas",
    highlight: false,
    color: "border-white/10",
    badge: null,
  },
];

// ─── Revenue Calculator ───────────────────────────────────────────────────────
type CalcState = {
  segment: "starter" | "pro";
  plan: "basic" | "growth" | "enterprise";
  num_courts: number;
  occupancy_rate: number;
  avg_price_per_hour: number;
  monthly_members: number;
  membership_fee: number;
};

const PLAN_FEE: Record<string, number> = {
  basic: 49,
  growth: 129,
  enterprise: 299,
};

const HOURS_PER_MONTH = 30 * 10; // 10h/day avg available

function calcRevenue(state: CalcState) {
  const courtHours = state.num_courts * HOURS_PER_MONTH * (state.occupancy_rate / 100);
  const bookingRevenue = courtHours * state.avg_price_per_hour;
  const membershipRevenue = state.monthly_members * state.membership_fee;
  const totalMonthly = bookingRevenue + membershipRevenue;
  const annualRevenue = totalMonthly * 12;
  const platformFee = PLAN_FEE[state.plan] * 12;
  const netRevenue = annualRevenue - platformFee;
  const roi = platformFee > 0 ? ((netRevenue / platformFee) * 100).toFixed(0) : "∞";
  return { bookingRevenue, membershipRevenue, totalMonthly, annualRevenue, platformFee, netRevenue, roi };
}

function fmt(n: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [calc, setCalc] = useState<CalcState>({
    segment: "starter",
    plan: "basic",
    num_courts: 4,
    occupancy_rate: 60,
    avg_price_per_hour: 350,
    monthly_members: 80,
    membership_fee: 500,
  });
  const [scenarioName, setScenarioName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [scenarios, setScenarios] = useState<RevenueScenario[]>([]);
  const [loadingScenarios, setLoadingScenarios] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const results = calcRevenue(calc);

  // Load saved scenarios
  const loadScenarios = useCallback(async () => {
    setLoadingScenarios(true);
    try {
      const { data, error } = await supabase
        .from("revenue_scenarios")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      setScenarios(data || []);
      setDbError(null);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Error cargando escenarios";
      setDbError(message);
    } finally {
      setLoadingScenarios(false);
    }
  }, []);

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

  const saveScenario = async () => {
    if (!scenarioName.trim()) {
      alert("Ponle un nombre al escenario antes de guardar.");
      return;
    }
    setSaving(true);
    try {
      const scenario: RevenueScenario = {
        name: scenarioName.trim(),
        segment: calc.segment,
        plan: calc.plan,
        num_courts: calc.num_courts,
        occupancy_rate: calc.occupancy_rate,
        avg_price_per_hour: calc.avg_price_per_hour,
        monthly_members: calc.monthly_members,
        membership_fee: calc.membership_fee,
        monthly_revenue: results.totalMonthly,
        annual_revenue: results.annualRevenue,
        platform_fee: results.platformFee,
        net_revenue: results.netRevenue,
      };
      const { error } = await supabase.from("revenue_scenarios").insert([scenario]);
      if (error) throw error;
      setSaved(true);
      setScenarioName("");
      await loadScenarios();
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Error al guardar";
      setDbError(message);
    } finally {
      setSaving(false);
    }
  };

  const updateCalc = (key: keyof CalcState, value: string | number) => {
    setCalc((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur z-10">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Match<span className="text-emerald-400">Point</span> AI
        </Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/product" className="hover:text-white transition-colors">Producto</Link>
          <Link href="/pricing" className="text-white font-medium">Precios</Link>
          <Link href="/research" className="hover:text-white transition-colors">Research</Link>
          <Link href="/core" className="hover:text-white transition-colors">Core AI</Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Planes simples,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            resultados reales
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto mb-8">
          Sin contratos anuales forzados. Cancela cuando quieras.
        </p>

        {/* Toggle anual/mensual */}
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1 text-sm">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-full transition-colors ${!annual ? "bg-white text-gray-900 font-semibold" : "text-gray-400"}`}
          >
            Mensual
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 rounded-full transition-colors ${annual ? "bg-white text-gray-900 font-semibold" : "text-gray-400"}`}
          >
            Anual <span className="text-emerald-400">−20%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border p-8 flex flex-col ${tier.color} ${
                tier.highlight ? "bg-emerald-950/30" : "bg-white/3"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-2xl mb-1">{tier.emoji}</div>
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{tier.segment}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">
                    ${annual ? tier.priceAnnual : tier.price}
                  </span>
                  <span className="text-gray-400 text-sm">MXN/mes</span>
                </div>
                {annual && (
                  <p className="text-xs text-emerald-400">
                    Facturado anualmente (${tier.priceAnnual * 12} MXN/año)
                  </p>
                )}
                <p className="text-sm text-gray-400 mt-3">{tier.description}</p>
              </div>

              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className={`text-sm flex gap-2 ${f === "—" ? "text-gray-600" : "text-gray-300"}`}>
                    <span className={f === "—" ? "text-gray-700" : "text-emerald-400"}>
                      {f === "—" ? "—" : "✓"}
                    </span>
                    {f !== "—" && f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => updateCalc("plan", tier.id as CalcState["plan"])}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                  tier.highlight
                    ? "bg-emerald-500 hover:bg-emerald-400 text-gray-950"
                    : "border border-white/20 hover:border-white/40 text-white"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Revenue Calculator ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3">
            Calculadora de Revenue
          </h2>
          <h3 className="text-3xl font-bold">
            ¿Cuánto puede generar tu club?
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
            <h4 className="font-semibold text-lg mb-2">Configura tu club</h4>

            {/* Segment */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
                Segmento
              </label>
              <div className="flex gap-2">
                {(["starter", "pro"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateCalc("segment", s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      calc.segment === s
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {s === "starter" ? "🎾 Starter" : "🏆 Pro"}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
                Plan
              </label>
              <div className="flex gap-2">
                {(["basic", "growth", "enterprise"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => updateCalc("plan", p)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors border capitalize ${
                      calc.plan === p
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            {[
              { key: "num_courts", label: "Número de canchas", min: 1, max: 20, unit: "canchas", step: 1 },
              { key: "occupancy_rate", label: "Ocupación promedio", min: 10, max: 100, unit: "%", step: 5 },
              { key: "avg_price_per_hour", label: "Precio por hora", min: 100, max: 1000, unit: "MXN", step: 50 },
              { key: "monthly_members", label: "Socios activos", min: 0, max: 2000, unit: "socios", step: 10 },
              { key: "membership_fee", label: "Cuota mensual de socio", min: 0, max: 2000, unit: "MXN", step: 50 },
            ].map(({ key, label, min, max, unit, step }) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-300">{label}</label>
                  <span className="text-sm font-semibold text-emerald-400">
                    {calc[key as keyof CalcState]} {unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={calc[key as keyof CalcState] as number}
                  onChange={(e) => updateCalc(key as keyof CalcState, Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-8">
              <p className="text-sm text-gray-400 mb-1">Revenue mensual estimado</p>
              <p className="text-5xl font-bold text-emerald-400 mb-1">
                {fmt(results.totalMonthly)}
              </p>
              <p className="text-xs text-gray-500">MXN / mes</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs text-gray-500 mb-1">Reservas / mes</p>
                <p className="text-2xl font-bold">{fmt(results.bookingRevenue)}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs text-gray-500 mb-1">Membresías / mes</p>
                <p className="text-2xl font-bold">{fmt(results.membershipRevenue)}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs text-gray-500 mb-1">Revenue anual</p>
                <p className="text-2xl font-bold">{fmt(results.annualRevenue)}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs text-gray-500 mb-1">Costo plataforma/año</p>
                <p className="text-2xl font-bold text-gray-300">{fmt(results.platformFee)}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Revenue neto anual</p>
                <p className="text-3xl font-bold text-emerald-400">{fmt(results.netRevenue)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">ROI de la plataforma</p>
                <p className="text-3xl font-bold text-emerald-400">{results.roi}x</p>
              </div>
            </div>

            {/* Save Scenario */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-sm font-medium mb-3">Guardar este escenario</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nombre del escenario…"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveScenario()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={saveScenario}
                  disabled={saving}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-gray-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {saving ? "…" : saved ? "✓" : "Guardar"}
                </button>
              </div>
              {dbError && (
                <p className="text-xs text-red-400 mt-2">
                  ⚠ {dbError.includes("does not exist") 
                    ? "Tabla no encontrada. Crea revenue_scenarios en Supabase (ver README)." 
                    : dbError}
                </p>
              )}
              {saved && (
                <p className="text-xs text-emerald-400 mt-2">✓ Escenario guardado en Supabase</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Saved Scenarios */}
      {(scenarios.length > 0 || loadingScenarios) && (
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Escenarios guardados
            {loadingScenarios && <span className="text-xs text-gray-500">cargando…</span>}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left py-2 pr-4">Nombre</th>
                  <th className="text-left py-2 pr-4">Segmento</th>
                  <th className="text-left py-2 pr-4">Plan</th>
                  <th className="text-right py-2 pr-4">Rev. mensual</th>
                  <th className="text-right py-2">Rev. neto anual</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-3 pr-4 font-medium">{s.name}</td>
                    <td className="py-3 pr-4 capitalize text-gray-400">{s.segment}</td>
                    <td className="py-3 pr-4 capitalize text-gray-400">{s.plan}</td>
                    <td className="py-3 pr-4 text-right text-emerald-400">{fmt(s.monthly_revenue)}</td>
                    <td className="py-3 text-right text-emerald-400">{fmt(s.net_revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {[
            ["¿Hay contrato mínimo?", "No. Puedes cancelar en cualquier momento desde tu panel. Sin letra chica."],
            ["¿Incluye migración de datos?", "En los planes Growth y Enterprise te ayudamos a migrar tus datos existentes sin costo adicional."],
            ["¿Puedo cambiar de plan?", "Sí, en cualquier momento. El cobro se prorratea automáticamente."],
            ["¿Qué moneda se cobra?", "Los precios están en MXN. La calculadora muestra estimados en MXN."],
          ].map(([q, a]) => (
            <details key={q as string} className="group border border-white/10 rounded-xl p-5">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                {q}
                <span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Assumptions Table ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3">
            Supuestos del Modelo
          </h2>
          <h3 className="text-3xl font-bold">Assumptions Table</h3>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
            Los valores default de la calculadora están basados en benchmarks del mercado de padel en México.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left py-3 pr-4">Variable</th>
                <th className="text-left py-3 pr-4">Valor default</th>
                <th className="text-left py-3 pr-4">Rango posible</th>
                <th className="text-left py-3">Fuente / Justificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  variable: "Horas disponibles / día",
                  default: "10 hrs",
                  range: "8 – 14 hrs",
                  source: "Horario típico de clubes CDMX (7am–9pm)",
                },
                {
                  variable: "Días al mes",
                  default: "30 días",
                  range: "28 – 31 días",
                  source: "Promedio mensual estándar",
                },
                {
                  variable: "Número de canchas",
                  default: "4 canchas",
                  range: "1 – 20 canchas",
                  source: "Club Starter promedio en México",
                },
                {
                  variable: "Ocupación promedio",
                  default: "60%",
                  range: "10% – 100%",
                  source: "Benchmark industria padel LATAM (Playtomic 2024)",
                },
                {
                  variable: "Precio por hora",
                  default: "$350 MXN",
                  range: "$100 – $1,000 MXN",
                  source: "Precio promedio canchas CDMX (Google Maps + Playtomic)",
                },
                {
                  variable: "Socios activos",
                  default: "80 socios",
                  range: "0 – 2,000 socios",
                  source: "Club mediano en México",
                },
                {
                  variable: "Cuota mensual socio",
                  default: "$500 MXN",
                  range: "$0 – $2,000 MXN",
                  source: "Membresías típicas clubes deportivos CDMX",
                },
                {
                  variable: "Descuento plan anual",
                  default: "20%",
                  range: "—",
                  source: "Estándar SaaS (Stripe, HubSpot, Notion)",
                },
              ].map((row) => (
                <tr key={row.variable} className="hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-4 font-medium text-white">{row.variable}</td>
                  <td className="py-3 pr-4 text-emerald-400 font-semibold">{row.default}</td>
                  <td className="py-3 pr-4 text-gray-400">{row.range}</td>
                  <td className="py-3 text-gray-400 text-xs leading-relaxed">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-600 mt-4 text-center">
          * Los valores son estimados con fines demostrativos. Cada club debe ajustar según su operación real.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-gray-600 text-sm">
        Match Point AI · Proyecto Semana 3 · Ibero Negocios Inteligentes · Prof. Patricia Navarro
      </footer>
    </div>
  );
}
