'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

function getSupabase() {
  return createClient(
    "https://pvlgppltohtckjevaqfn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bGdwcGx0b2h0Y2tqZXZhcWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODgwMzYsImV4cCI6MjA5NjE2NDAzNn0.oXwFUC9ywQe-kRnETpY_qx03Fg3AQpDFLMXNwPSVNZk"
  );
}

export default function DashboardPage() {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const sb = getSupabase();
      const [s, a, c] = await Promise.all([
        sb.from('revenue_scenarios').select('*').order('created_at', { ascending: false }).limit(5),
        sb.from('marketing_assets').select('*').order('created_at', { ascending: false }).limit(5),
        sb.from('chat_sessions').select('*').order('created_at', { ascending: false }).limit(5),
      ]);
      if (s.data) setScenarios(s.data);
      if (a.data) setAssets(a.data);
      if (c.data) setSessions(c.data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="pt-24 pb-10 px-6 text-center border-b border-gray-800">
        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-emerald-500/20">
          Dashboard - Semana 6
        </span>
        <h1 className="text-4xl font-bold mb-3">Datos en <span className="text-emerald-400">tiempo real</span></h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Registros reales de todas las tablas de Supabase generados durante el proyecto.</p>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-4xl font-bold text-emerald-400 mb-1">{scenarios.length}</p>
              <p className="text-sm text-gray-400">Escenarios de revenue</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-4xl font-bold text-emerald-400 mb-1">{assets.length}</p>
              <p className="text-sm text-gray-400">Assets de marketing</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-4xl font-bold text-emerald-400 mb-1">{sessions.length}</p>
              <p className="text-sm text-gray-400">Sesiones de chat</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Revenue Scenarios <span className="text-gray-500 text-sm font-normal ml-2">Ultimos 5 registros</span></h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-400">
                  <tr>
                    <th className="text-left px-4 py-3">Nombre</th>
                    <th className="text-left px-4 py-3">Segmento</th>
                    <th className="text-left px-4 py-3">Plan</th>
                    <th className="text-left px-4 py-3">Revenue Anual</th>
                    <th className="text-left px-4 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {scenarios.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Sin registros todavia</td></tr>
                  ) : scenarios.map(s => (
                    <tr key={s.id} className="hover:bg-gray-800/50">
                      <td className="px-4 py-3 text-white">{s.name || '-'}</td>
                      <td className="px-4 py-3 text-gray-300">{s.segment || '-'}</td>
                      <td className="px-4 py-3"><span className="bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded-full text-xs">{s.plan || '-'}</span></td>
                      <td className="px-4 py-3 text-white font-semibold">{s.annual_revenue ? `$${Number(s.annual_revenue).toLocaleString()} MXN` : '-'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(s.created_at).toLocaleDateString('es-MX')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Marketing Assets <span className="text-gray-500 text-sm font-normal ml-2">Ultimos 5 registros</span></h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-400">
                  <tr>
                    <th className="text-left px-4 py-3">Tipo</th>
                    <th className="text-left px-4 py-3">Contenido</th>
                    <th className="text-left px-4 py-3">A/B Winner</th>
                    <th className="text-left px-4 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {assets.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-500">Sin registros todavia</td></tr>
                  ) : assets.map(a => (
                    <tr key={a.id} className="hover:bg-gray-800/50">
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${a.type === 'ab_result' ? 'bg-purple-900/40 text-purple-400' : 'bg-emerald-900/40 text-emerald-400'}`}>{a.type}</span></td>
                      <td className="px-4 py-3 text-gray-300 max-w-xs truncate">{a.content}</td>
                      <td className="px-4 py-3 text-yellow-400 text-xs">{a.ab_winner ? `Variante ${a.ab_winner}` : '-'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(a.created_at).toLocaleDateString('es-MX')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Chat Sessions <span className="text-gray-500 text-sm font-normal ml-2">Ultimas 5 sesiones</span></h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-400">
                  <tr>
                    <th className="text-left px-4 py-3">Recomendacion</th>
                    <th className="text-left px-4 py-3">Feedback</th>
                    <th className="text-left px-4 py-3">Canchas</th>
                    <th className="text-left px-4 py-3">Socios</th>
                    <th className="text-left px-4 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {sessions.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Sin registros todavia</td></tr>
                  ) : sessions.map(c => (
                    <tr key={c.id} className="hover:bg-gray-800/50">
                      <td className="px-4 py-3"><span className="bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded-full text-xs">{c.recommendation || '-'}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${c.feedback === 'positivo' ? 'bg-green-900/40 text-green-400' : c.feedback === 'negativo' ? 'bg-red-900/40 text-red-400' : 'bg-gray-800 text-gray-500'}`}>{c.feedback || 'sin feedback'}</span></td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{c.answers?.courts || '-'}</td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{c.answers?.members || '-'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(c.created_at).toLocaleDateString('es-MX')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}
