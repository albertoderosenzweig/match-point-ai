'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    "https://pvlgppltohtckjevaqfn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bGdwcGx0b2h0Y2tqZXZhcWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODgwMzYsImV4cCI6MjA5NjE2NDAzNn0.oXwFUC9ywQe-kRnETpY_qx03Fg3AQpDFLMXNwPSVNZk"
  );
}

const INTAKE_QUESTIONS = [
  {
    id: 'courts',
    question: 'Bienvenido a Match Point AI! Soy tu asesor de club. Para recomendarte el plan ideal, tengo 3 preguntas rapidas. Primera: cuantas canchas tiene tu club?',
    options: ['1-2 canchas', '3-6 canchas', '7-12 canchas', '13 o mas canchas'],
  },
  {
    id: 'members',
    question: 'Perfecto! Segunda pregunta: cuantos socios activos tiene tu club?',
    options: ['Menos de 100', '100-300 socios', '300-1000 socios', 'Mas de 1000 socios'],
  },
  {
    id: 'tool',
    question: 'Ultima pregunta: que herramienta usas actualmente para gestionar tu club?',
    options: ['WhatsApp y hojas de calculo', 'Software generico (no especifico de padel)', 'Otra plataforma deportiva', 'No tengo sistema todavia'],
  },
];

const GUARDRAIL_KEYWORDS = [
  'clima', 'weather', 'receta', 'pelicula', 'musica', 'politica',
  'iphone', 'android', 'crypto', 'bitcoin', 'bolsa', 'citas',
  'restaurante', 'viaje', 'hotel', 'vuelo', 'amazon', 'netflix',
  'futbol', 'basket', 'beisbol', 'noticias',
];

const GUARDRAIL_RESPONSE = "Soy el asesor de clubes de Match Point AI, especializado en gestion de clubes de padel. Puedo ayudarte a encontrar el plan ideal para tu club, responder preguntas sobre funciones, precios y como Match Point AI puede ayudarte a crecer. Que te gustaria saber sobre la gestion de tu club de padel?";

function getRecommendation(answers: Record<string, string>): { plan: string; reason: string; price: string } {
  const courts = answers.courts || '';
  const members = answers.members || '';

  if (courts === '13 o mas canchas' || members === 'Mas de 1000 socios') {
    return {
      plan: 'Enterprise',
      price: '$5,500 MXN/mes',
      reason: 'Basado en el tamano de tu club, Enterprise es la opcion ideal. Obtienes canchas ilimitadas, analytics avanzado, soporte multi-sede, atencion 24/7 y el AI Agent completo para gestionar tu operacion.',
    };
  }
  if (courts === '7-12 canchas' || members === '300-1000 socios') {
    return {
      plan: 'Growth',
      price: '$2,400 MXN/mes',
      reason: 'Growth es el plan perfecto para tu club. Incluye hasta 12 canchas, dashboard de analytics avanzado, gestion de torneos, insights del Core AI Agent y soporte prioritario para ayudarte a escalar.',
    };
  }
  return {
    plan: 'Basic',
    price: '$900 MXN/mes',
    reason: 'Basic es el punto de partida ideal para tu club. Incluye reservas automatizadas, gestion de socios, dashboard de ocupacion y app para miembros. Todo lo que necesitas para dejar atras el WhatsApp.',
  };
}

function isOffTopic(text: string): boolean {
  const lower = text.toLowerCase();
  return GUARDRAIL_KEYWORDS.some(k => lower.includes(k));
}

function generateResponse(userText: string, answers: Record<string, string>): string {
  if (isOffTopic(userText)) return GUARDRAIL_RESPONSE;

  const lower = userText.toLowerCase();

  if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto') || lower.includes('plan')) {
    return 'Match Point AI tiene tres planes: Basic a $900 MXN/mes (hasta 6 canchas), Growth a $2,400 MXN/mes (hasta 12 canchas) y Enterprise a $5,500 MXN/mes (canchas ilimitadas). Todos los planes incluyen prueba gratuita sin tarjeta de credito. Quieres que te recomiende el mejor plan para tu club?';
  }
  if (lower.includes('funcion') || lower.includes('incluye') || lower.includes('caracteristica') || lower.includes('que tiene')) {
    return 'Match Point AI incluye: sistema de reservas automatizado, gestion de socios con alertas de renovacion, dashboard de analytics en tiempo real, gestion de torneos, Core AI Agent para insights y app movil para tus socios. Sobre cual funcion quieres saber mas?';
  }
  if (lower.includes('demo') || lower.includes('prueba') || lower.includes('probar') || lower.includes('gratis')) {
    return 'Excelente decision! Puedes iniciar una prueba gratuita en match-point-ai-lntz.vercel.app/pricing, sin tarjeta de credito. Si quieres una demo personalizada con nuestro equipo, puedes solicitarla desde la pagina de precios. Te explico que esperar en la demo?';
  }
  if (lower.includes('whatsapp') || lower.includes('excel') || lower.includes('hoja')) {
    return 'Es la historia mas comun! Gestionar un club de padel por WhatsApp genera dobles reservas, pagos perdidos y horas de trabajo manual cada dia. Match Point AI automatiza todo eso: reservas, recordatorios, pagos y renovaciones de socios, para que puedas enfocarte en tu club y no en tu telefono.';
  }
  if (lower.includes('si') || lower.includes('claro') || lower.includes('ok') || lower.includes('muestra') || lower.includes('adelante')) {
    const rec = getRecommendation(answers);
    return `Perfecto! Basado en tus respuestas, te recomiendo el plan ${rec.plan} a ${rec.price}. ${rec.reason} Puedes ver todos los detalles e iniciar tu prueba gratuita en match-point-ai-lntz.vercel.app/pricing. Tienes alguna otra pregunta?`;
  }

  return 'Buena pregunta sobre la gestion de clubes de padel. Match Point AI esta disenado para ayudar a clubes como el tuyo a automatizar operaciones y aumentar ingresos. Puedes contarme mas sobre que es lo que mas quieres mejorar en tu club? Asi puedo darte una respuesta mas precisa.';
}

type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  feedback?: 'up' | 'down' | null;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [intakeStep, setIntakeStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkpointShown, setCheckpointShown] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(0);

  useEffect(() => {
    addAssistantMessage(INTAKE_QUESTIONS[0].question);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function nextId() {
    msgId.current += 1;
    return msgId.current;
  }

  function addAssistantMessage(text: string) {
    setMessages(prev => [...prev, { id: nextId(), role: 'assistant', text, feedback: null }]);
  }

  function addUserMessage(text: string) {
    setMessages(prev => [...prev, { id: nextId(), role: 'user', text }]);
  }

  function handleOptionClick(option: string) {
    addUserMessage(option);
    const currentQuestion = INTAKE_QUESTIONS[intakeStep];
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const nextStep = intakeStep + 1;
      if (nextStep < INTAKE_QUESTIONS.length) {
        setIntakeStep(nextStep);
        addAssistantMessage(INTAKE_QUESTIONS[nextStep].question);
      } else {
        setIntakeStep(INTAKE_QUESTIONS.length);
        if (!checkpointShown) {
          setCheckpointShown(true);
          addAssistantMessage('Gracias! Basado en tus respuestas, tengo una recomendacion de plan lista para ti. Quieres que te muestre los detalles?');
        }
      }
    }, 800);
  }

  function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    addUserMessage(text);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = generateResponse(text, answers);
      addAssistantMessage(response);

      if (!sessionSaved && intakeStep >= INTAKE_QUESTIONS.length) {
        const rec = getRecommendation(answers);
        saveSession(answers, rec.plan, [...messages, { id: 0, role: 'user', text }, { id: 0, role: 'assistant', text: response }]);
      }
    }, 1000);
  }

  async function saveSession(ans: Record<string, string>, recommendation: string, msgs: Message[]) {
    const sb = getSupabase();
    await sb.from('chat_sessions').insert({
      answers: ans,
      recommendation,
      messages: msgs.map(m => ({ role: m.role, text: m.text })),
      feedback: null,
    });
    setSessionSaved(true);
  }

  async function handleFeedback(id: number, value: 'up' | 'down') {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, feedback: value } : m));
    const sb = getSupabase();
    await sb.from('chat_sessions').insert({
      answers,
      recommendation: getRecommendation(answers).plan,
      messages: [],
      feedback: value === 'up' ? 'positivo' : 'negativo',
    });
  }

  const currentQuestion = intakeStep < INTAKE_QUESTIONS.length ? INTAKE_QUESTIONS[intakeStep] : null;
  const showOptions = currentQuestion && messages.length > 0 && messages[messages.length - 1].role === 'assistant';

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">

      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-gray-950 font-bold text-sm">AI</div>
        <div>
          <p className="font-semibold text-white text-sm">Asistente Match Point AI</p>
          <p className="text-xs text-emerald-400">Asesor de Clubes - Respuesta Simulada</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
          <span className="text-xs text-gray-400">En linea</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-gray-950 font-bold text-xs">AI</div>
                  <span className="text-xs text-gray-500">Match Point AI</span>
                </div>
              )}
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-sm'
                  : 'bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'assistant' && msg.feedback === null && (
                <div className="flex gap-2 mt-2 ml-1">
                  <button onClick={() => handleFeedback(msg.id, 'up')} className="text-xs text-gray-500 hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-800">
                    Util
                  </button>
                  <button onClick={() => handleFeedback(msg.id, 'down')} className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-800">
                    No util
                  </button>
                </div>
              )}
              {msg.role === 'assistant' && msg.feedback === 'up' && (
                <p className="text-xs text-emerald-400 mt-1 ml-1">Gracias por tu feedback!</p>
              )}
              {msg.role === 'assistant' && msg.feedback === 'down' && (
                <p className="text-xs text-red-400 mt-1 ml-1">Gracias, mejoraremos esta respuesta.</p>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showOptions && (
        <div className="max-w-3xl mx-auto w-full px-4 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {currentQuestion.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-600 text-gray-200 px-4 py-3 rounded-xl transition-colors text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-800 px-4 py-4 max-w-3xl mx-auto w-full">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre Match Point AI..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-gray-950 font-bold px-5 py-3 rounded-xl transition-colors text-sm"
          >
            Enviar
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">Respuestas simuladas - Asistente Match Point AI v1.1</p>
      </div>

    </main>
  );
}
