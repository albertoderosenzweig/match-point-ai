'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    "https://pvlgppltohtckjevaqfn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bGdwcGx0b2h0Y2tqZXZhcWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODgwMzYsImV4cCI6MjA5NjE2NDAzNn0.oXwFUC9ywQe-kRnETpY_qx03Fg3AQpDFLMXNwPSVNZk"
  );
}

const SOCIAL_POSTS = [
  { id: 1, tag: 'ðŸŽ¾ Engagement', text: 'Â¿SabÃ­as que el 70% de los turnos vacÃ­os en clubes de padel se deben a una mala gestiÃ³n de reservas? Match Point AI lo resuelve en minutos. Â¿CuÃ¡ntas canchas tienes tÃº sin llenar? ðŸ‘‡' },
  { id: 2, tag: 'ðŸ“Š Dato', text: 'Los clubes que usan automatizaciÃ³n de reservas aumentan su ocupaciÃ³n un 35% en el primer mes. Â¿Sigues gestionando todo por WhatsApp? Hay una mejor forma. #PadelBusiness' },
  { id: 3, tag: 'ðŸš€ Producto', text: 'Match Point AI: la primera plataforma de gestiÃ³n de clubes de padel con inteligencia artificial. Reservas, socios, analytics y mÃ¡s â€” todo en un solo lugar.' },
  { id: 4, tag: 'ðŸ’¡ Tip', text: 'Tip para dueÃ±os de clubes: Configura recordatorios automÃ¡ticos 24h antes de cada turno. Reduce cancelaciones tardÃ­as hasta un 40%. Match Point AI lo hace por ti.' },
  { id: 5, tag: 'ðŸ™‹ Testimonial', text: '"Antes perdÃ­amos 3 horas al dÃ­a en WhatsApp coordinando reservas. Con Match Point AI lo resolvemos en 20 minutos." â€” Club Padel Norte, CDMX' },
  { id: 6, tag: 'ðŸŽ¯ CTA', text: 'Â¿Tu club tiene mÃ¡s de 4 canchas? El plan Growth de Match Point AI fue diseÃ±ado para ti. Analytics en tiempo real + automatizaciÃ³n de socios. Empieza gratis hoy. ðŸ”—' },
  { id: 7, tag: 'ðŸ“… Calendario', text: 'Semana completa sin huecos en tus canchas. Con nuestro sistema de reservas inteligente, optimizas horarios automÃ¡ticamente y maximizas tu revenue mensual. #PadelManagement' },
  { id: 8, tag: 'ðŸ† Diferenciador', text: 'La diferencia entre un club amateur y uno profesional no estÃ¡ en las canchas â€” estÃ¡ en cÃ³mo gestionas tu negocio. Match Point AI es tu ventaja competitiva.' },
  { id: 9, tag: 'ðŸ“± Feature', text: 'Nuevo en Match Point AI: Dashboard de socios activos con alertas de renovaciÃ³n automÃ¡tica. Nunca pierdas un socio por falta de seguimiento. Â¿Ya lo probaste?' },
  { id: 10, tag: 'ðŸŒŸ Cierre', text: '3 cosas que los mejores clubes de padel tienen en comÃºn: datos en tiempo real, reservas automatizadas y socios felices. Match Point AI te da las tres. PruÃ©balo gratis. ðŸŽ¾' },
];

const VIDEO_SCRIPTS = [
  {
    id: 1,
    title: 'ðŸŽ¬ Script 1 â€” "El Problema"',
    hook: 'GANCHO (0-5s): Muestra un telÃ©fono explotando de mensajes de WhatsApp. Voz en off: "Â¿CuÃ¡ntas horas al dÃ­a pierdes gestionando tu club por WhatsApp?"',
    body: 'CUERPO (5-40s): Muestra el caos de reservas manuales: canchas doble-reservadas, pagos olvidados, socios frustrados. Contrasta con un dashboard limpio de Match Point AI donde todo fluye solo.',
    cta: 'CTA (40-60s): "Match Point AI automatiza tu club en 24 horas. Empieza gratis en matchpointai.com. Porque tu tiempo vale mÃ¡s que un grupo de WhatsApp."',
  },
  {
    id: 2,
    title: 'ðŸŽ¬ Script 2 â€” "El Before/After"',
    hook: 'GANCHO (0-5s): Split screen. Izquierda: dueÃ±o de club estresado con papel y Excel. Derecha: mismo dueÃ±o tomando cafÃ© mientras el dashboard trabaja solo.',
    body: 'CUERPO (5-40s): NarraciÃ³n: "Antes: 3 horas diarias en reservas manuales, socios que no renuevan, canchas vacÃ­as los martes. DespuÃ©s de Match Point AI: ocupaciÃ³n al 85%, renovaciones automÃ¡ticas, revenue 35% arriba."',
    cta: 'CTA (40-60s): "Â¿CuÃ¡l versiÃ³n quieres ser tÃº? Prueba Match Point AI gratis este mes. Sin tarjeta de crÃ©dito. Sin contratos. Solo resultados."',
  },
  {
    id: 3,
    title: 'ðŸŽ¬ Script 3 â€” "El Tour del Producto"',
    hook: 'GANCHO (0-5s): "Te muestro cÃ³mo un club de padel en CDMX aumentÃ³ su revenue $180,000 MXN al mes. Todo con una sola herramienta."',
    body: 'CUERPO (5-40s): Screencast del dashboard: reservas en tiempo real, calculadora de revenue, gestiÃ³n de socios, alertas automÃ¡ticas. Voz tranquila explicando cada secciÃ³n en 8 segundos.',
    cta: 'CTA (40-60s): "Este es Match Point AI. El sistema que tu club necesita para dejar de improvisar y empezar a crecer. Link en bio para tu demo gratis."',
  },
];

const CALENDAR_DAYS = [
  { day: 1, type: 'post', content: 'Post problema WhatsApp (Post #1)' },
  { day: 2, type: 'video', content: 'Video Script #1 â€” El Problema' },
  { day: 3, type: 'post', content: 'Post dato 35% ocupaciÃ³n (Post #2)' },
  { day: 4, type: 'rest', content: 'â€” Descanso â€”' },
  { day: 5, type: 'post', content: 'Post lanzamiento producto (Post #3)' },
  { day: 6, type: 'post', content: 'Post tip recordatorios (Post #4)' },
  { day: 7, type: 'video', content: 'Video Script #2 â€” Before/After' },
  { day: 8, type: 'post', content: 'Post testimonial (Post #5)' },
  { day: 9, type: 'rest', content: 'â€” Descanso â€”' },
  { day: 10, type: 'post', content: 'Post CTA plan Growth (Post #6)' },
  { day: 11, type: 'post', content: 'Post calendario (Post #7)' },
  { day: 12, type: 'video', content: 'Video Script #3 â€” Tour Producto' },
  { day: 13, type: 'post', content: 'Post diferenciador (Post #8)' },
  { day: 14, type: 'post', content: 'Post cierre + CTA final (Post #10)' },
];

const AB_TESTS = [
  { id: 'ab1', label: 'A/B Test 1 â€” Hero Headline', variantA: 'ðŸŽ¾ Llena tus canchas. Automatiza tu club.', variantB: 'ðŸš€ El sistema de gestiÃ³n que tu club de padel necesita.' },
  { id: 'ab2', label: 'A/B Test 2 â€” CTA Button', variantA: 'Empieza gratis', variantB: 'Ver demo ahora' },
];

export default function MarketingPage() {
  const [copied, setCopied] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(null);
  const [abWinners, setAbWinners] = useState<Record<string, string>>({});
  const [abSaved, setAbSaved] = useState<Record<string, boolean>>({});
  const [savedAssets, setSavedAssets] = useState<any[]>([]);
  const [postSaved, setPostSaved] = useState<Record<number, boolean>>({});

  useEffect(() => { loadSavedAssets(); }, []);

  async function loadSavedAssets() {
    const sb = getSupabase();
    const { data } = await sb.from('marketing_assets').select('*').order('created_at', { ascending: false }).limit(5);
    if (data) setSavedAssets(data);
  }

  function copyToClipboard(text: string, id: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  async function savePost(post: typeof SOCIAL_POSTS[0]) {
    const sb = getSupabase();
    const { error } = await sb.from('marketing_assets').insert({ type: 'social_post', content: post.text });
    if (!error) { setPostSaved(prev => ({ ...prev, [post.id]: true })); loadSavedAssets(); }
  }

  async function selectAbWinner(testId: string, winner: string) {
    setAbWinners(prev => ({ ...prev, [testId]: winner }));
    const sb = getSupabase();
    const { error } = await sb.from('marketing_assets').insert({ type: 'ab_result', content: `Test: ${testId}`, ab_winner: winner });
    if (!error) { setAbSaved(prev => ({ ...prev, [testId]: true })); loadSavedAssets(); }
  }

  const typeColors: Record<string, string> = {
    post: 'bg-emerald-900/40 border-emerald-700/50',
    video: 'bg-purple-900/40 border-purple-700/50',
    rest: 'bg-gray-800/40 border-gray-700/50',
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      <section className="pt-24 pb-16 px-6 text-center border-b border-gray-800">
        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-emerald-500/20">Marketing Engine â€” Semana 4</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contenido que <span className="text-emerald-400">convierte</span></h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Posts, scripts, calendario y A/B tests para llenar tus canchas.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-8">ðŸŽ¨ Brand System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Target Persona</p>
            <p className="font-semibold text-white mb-1">Carlos, 42 aÃ±os</p>
            <p className="text-sm text-gray-400">DueÃ±o de club con 4-8 canchas en CDMX/MTY. Usa WhatsApp para todo. Quiere crecer pero no tiene tiempo para el caos operativo.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Tono de Marca</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>âœ… Directo y prÃ¡ctico</p><p>âœ… Datos sobre promesas</p><p>âœ… EmpÃ¡tico con el dueÃ±o</p><p>âŒ Sin jerga tÃ©cnica</p><p>âŒ Sin exageraciones</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Paleta de Color</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-emerald-400" /><span className="text-sm text-gray-300">Emerald â€” CTA</span></div>
              <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-gray-950 border border-gray-700" /><span className="text-sm text-gray-300">Gray 950 â€” Fondo</span></div>
              <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-white" /><span className="text-sm text-gray-300">White â€” Texto</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-2">ðŸ“± 10 Social Posts</h2>
        <p className="text-gray-400 text-sm mb-8">Listos para publicar. Copia o guarda en Supabase.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIAL_POSTS.map(post => (
            <div key={post.id} className="bg-gray-900 rounded-xl p-5 border border-gray-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-emerald-400">{post.tag}</span>
              <p className="text-sm text-gray-300 leading-relaxed flex-1">{post.text}</p>
              <div className="flex gap-2 mt-1">
                <button onClick={() => copyToClipboard(post.text, post.id)} className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
                  {copied === post.id ? 'âœ… Copiado' : 'ðŸ“‹ Copiar'}
                </button>
                <button onClick={() => savePost(post)} disabled={postSaved[post.id]} className="flex-1 text-xs bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 py-2 rounded-lg transition-colors disabled:opacity-50">
                  {postSaved[post.id] ? 'âœ… Guardado' : 'ðŸ’¾ Guardar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-2">ðŸŽ¬ 3 Video Scripts</h2>
        <p className="text-gray-400 text-sm mb-8">Estructura gancho / cuerpo / CTA para videos de 60 segundos.</p>
        <div className="space-y-4">
          {VIDEO_SCRIPTS.map(script => (
            <div key={script.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button onClick={() => setExpandedScript(expandedScript === script.id ? null : script.id)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-800/50 transition-colors">
                <span className="font-semibold text-white">{script.title}</span>
                <span className="text-gray-400 text-xl">{expandedScript === script.id ? 'âˆ’' : '+'}</span>
              </button>
              {expandedScript === script.id && (
                <div className="px-6 pb-6 space-y-3 border-t border-gray-800 pt-4">
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3"><p className="text-xs font-bold text-yellow-400 mb-1">GANCHO</p><p className="text-sm text-gray-300">{script.hook}</p></div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3"><p className="text-xs font-bold text-blue-400 mb-1">CUERPO</p><p className="text-sm text-gray-300">{script.body}</p></div>
                  <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-3"><p className="text-xs font-bold text-emerald-400 mb-1">CTA</p><p className="text-sm text-gray-300">{script.cta}</p></div>
                  <button onClick={() => copyToClipboard(`${script.hook}\n\n${script.body}\n\n${script.cta}`, script.id + 100)} className="w-full text-xs bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
                    {copied === script.id + 100 ? 'âœ… Copiado' : 'ðŸ“‹ Copiar script completo'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-2">ðŸ“… Calendario 14 DÃ­as</h2>
        <p className="text-gray-400 text-sm mb-8">Plan de publicaciÃ³n diario para el lanzamiento.</p>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {CALENDAR_DAYS.map(item => (
            <div key={item.day} className={`rounded-xl p-3 border text-center ${typeColors[item.type]}`}>
              <p className="text-xs text-gray-400 mb-1">DÃ­a {item.day}</p>
              <p className="text-xs text-white leading-snug">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-800 inline-block" /> Post</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-800 inline-block" /> Video</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-700 inline-block" /> Descanso</span>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-2">ðŸ§ª A/B Headline Tester</h2>
        <p className="text-gray-400 text-sm mb-8">Selecciona el ganador. El resultado se guarda en Supabase.</p>
        <div className="space-y-6">
          {AB_TESTS.map(test => (
            <div key={test.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <p className="text-sm font-semibold text-gray-300 mb-4">{test.label}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[test.variantA, test.variantB].map((variant, i) => {
                  const label = i === 0 ? 'A' : 'B';
                  const isWinner = abWinners[test.id] === label;
                  return (
                    <button key={label} onClick={() => selectAbWinner(test.id, label)} disabled={!!abWinners[test.id]}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${isWinner ? 'border-emerald-400 bg-emerald-900/30' : abWinners[test.id] ? 'border-gray-700 bg-gray-800/30 opacity-50' : 'border-gray-700 bg-gray-800/50 hover:border-emerald-600'}`}>
                      <span className="text-xs font-bold text-gray-400 block mb-2">Variante {label}</span>
                      <p className="text-sm text-white">{variant}</p>
                      {isWinner && <span className="mt-2 inline-block text-xs text-emerald-400 font-semibold">ðŸ† Ganador seleccionado</span>}
                    </button>
                  );
                })}
              </div>
              {abSaved[test.id] && <p className="text-xs text-emerald-400 mt-3">âœ… Resultado guardado en Supabase</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-2">ðŸ—„ï¸ Assets Guardados en Supabase</h2>
        <p className="text-gray-400 text-sm mb-8">Ãšltimos 5 elementos guardados.</p>
        {savedAssets.length === 0 ? (
          <p className="text-gray-500 text-sm">TodavÃ­a no hay assets guardados. Guarda un post o selecciona un ganador A/B arriba.</p>
        ) : (
          <div className="space-y-3">
            {savedAssets.map(asset => (
              <div key={asset.id} className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-start justify-between gap-4">
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mr-2 ${asset.type === 'ab_result' ? 'bg-purple-900/40 text-purple-400' : 'bg-emerald-900/40 text-emerald-400'}`}>
                    {asset.type === 'ab_result' ? 'ðŸ§ª A/B Result' : 'ðŸ“± Social Post'}
                  </span>
                  {asset.ab_winner && <span className="text-xs text-yellow-400">Ganador: Variante {asset.ab_winner}</span>}
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">{asset.content}</p>
                </div>
                <span className="text-xs text-gray-600 whitespace-nowrap">{new Date(asset.created_at).toLocaleDateString('es-MX')}</span>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}


