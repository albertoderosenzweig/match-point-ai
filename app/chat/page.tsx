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
    question: 'Welcome to Match Point AI! I am your club advisor. To recommend the right plan, I have 3 quick questions. First: how many courts does your club have?',
    options: ['1-2 courts', '3-6 courts', '7-12 courts', '13 or more courts'],
  },
  {
    id: 'members',
    question: 'Great! Second question: how many active members does your club have?',
    options: ['Less than 100', '100-300 members', '300-1000 members', 'More than 1000 members'],
  },
  {
    id: 'tool',
    question: 'Last question: what tool are you currently using to manage your club?',
    options: ['WhatsApp and spreadsheets', 'Generic software (not padel-specific)', 'Another sports platform', 'No system yet'],
  },
];

const GUARDRAIL_KEYWORDS = [
  'weather', 'sports score', 'recipe', 'movie', 'music', 'politics',
  'iphone', 'android', 'crypto', 'bitcoin', 'stock', 'dating',
  'restaurant', 'travel', 'hotel', 'flight', 'amazon', 'netflix',
];

const GUARDRAIL_RESPONSE = "I am Match Point AI's club advisor, specialized in padel club management. I can help you find the right plan for your club, answer questions about features, pricing, and how Match Point AI can help you grow. What would you like to know about managing your padel club?";

function getRecommendation(answers: Record<string, string>): { plan: string; reason: string; price: string } {
  const courts = answers.courts || '';
  const members = answers.members || '';

  if (courts === '13 or more courts' || members === 'More than 1000 members') {
    return {
      plan: 'Enterprise',
      price: '$5,500 MXN/month',
      reason: 'Based on your club size, Enterprise is the right fit. You get unlimited courts, advanced analytics, multi-location support, 24/7 dedicated support, and full AI Agent capabilities to manage your large operation.',
    };
  }
  if (courts === '7-12 courts' || members === '300-1000 members') {
    return {
      plan: 'Growth',
      price: '$2,400 MXN/month',
      reason: 'Growth is the perfect plan for your club. You get up to 12 courts, advanced analytics dashboard, tournament management, Core AI Agent insights, and priority support to help you scale.',
    };
  }
  return {
    plan: 'Basic',
    price: '$900 MXN/month',
    reason: 'Basic is the ideal starting point for your club. You get automated reservations, member management, occupancy dashboard, and app for members — everything you need to leave WhatsApp behind.',
  };
}

function isOffTopic(text: string): boolean {
  const lower = text.toLowerCase();
  return GUARDRAIL_KEYWORDS.some(k => lower.includes(k));
}

function generateResponse(userText: string, answers: Record<string, string>, step: number): string {
  if (isOffTopic(userText)) return GUARDRAIL_RESPONSE;

  const lower = userText.toLowerCase();

  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('pricing')) {
    return 'Match Point AI offers three plans: Basic at $900 MXN/month (up to 6 courts), Growth at $2,400 MXN/month (up to 12 courts), and Enterprise at $5,500 MXN/month (unlimited courts). All plans include a free trial with no credit card required. Would you like me to recommend the best plan for your club?';
  }
  if (lower.includes('feature') || lower.includes('include') || lower.includes('what can')) {
    return 'Match Point AI includes: automated reservation system, member management with renewal alerts, real-time analytics dashboard, tournament management, Core AI Agent for insights, and a mobile app for your members. Which feature would you like to know more about?';
  }
  if (lower.includes('demo') || lower.includes('trial') || lower.includes('try')) {
    return 'Great choice! You can start a free trial directly at match-point-ai-lntz.vercel.app/pricing — no credit card required. If you want a personalized demo with our team, you can request one through the pricing page. Would you like me to walk you through what to expect in the demo?';
  }
  if (lower.includes('whatsapp') || lower.includes('spreadsheet') || lower.includes('excel')) {
    return 'We hear this a lot! Managing a padel club through WhatsApp leads to double-bookings, missed payments, and hours of manual work every day. Match Point AI automates all of that — reservations, reminders, payments, and member renewals — so you can focus on running your club, not your phone.';
  }
  if (lower.includes('yes') || lower.includes('sure') || lower.includes('ok') || lower.includes('show me')) {
    const rec = getRecommendation(answers);
    return `Perfect! Based on your answers, I recommend the ${rec.plan} plan at ${rec.price}. ${rec.reason} You can see the full plan details and start your free trial at match-point-ai-lntz.vercel.app/pricing. Do you have any other questions?`;
  }

  return 'That is a great question about padel club management. Match Point AI is designed to help clubs like yours automate operations and grow revenue. Could you tell me more specifically what you are looking to improve in your club? I can give you a more precise answer.';
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
          addAssistantMessage("Thank you! Based on your answers, I have a plan recommendation ready for you. Would you like me to show you the details?");
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
      const response = generateResponse(text, answers, intakeStep);
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

  async function handleFeedback(msgId: number, value: 'up' | 'down') {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, feedback: value } : m));
    const sb = getSupabase();
    await sb.from('chat_sessions').insert({
      answers,
      recommendation: getRecommendation(answers).plan,
      messages: [],
      feedback: value === 'up' ? 'positive' : 'negative',
    });
  }

  const currentQuestion = intakeStep < INTAKE_QUESTIONS.length ? INTAKE_QUESTIONS[intakeStep] : null;
  const showOptions = currentQuestion && messages.length > 0 && messages[messages.length - 1].role === 'assistant';

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">

      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-gray-950 font-bold text-sm">AI</div>
        <div>
          <p className="font-semibold text-white text-sm">Match Point AI Assistant</p>
          <p className="text-xs text-emerald-400">Club Advisor - Simulated Response</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
          <span className="text-xs text-gray-400">Online</span>
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
                  <button
                    onClick={() => handleFeedback(msg.id, 'up')}
                    className="text-xs text-gray-500 hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-800"
                  >
                    Helpful
                  </button>
                  <button
                    onClick={() => handleFeedback(msg.id, 'down')}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-800"
                  >
                    Not helpful
                  </button>
                </div>
              )}
              {msg.role === 'assistant' && msg.feedback === 'up' && (
                <p className="text-xs text-emerald-400 mt-1 ml-1">Thanks for the feedback!</p>
              )}
              {msg.role === 'assistant' && msg.feedback === 'down' && (
                <p className="text-xs text-red-400 mt-1 ml-1">Thanks, we will improve this.</p>
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
            placeholder="Ask about Match Point AI..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-gray-950 font-bold px-5 py-3 rounded-xl transition-colors text-sm"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">Simulated AI responses — Match Point AI Assistant v1.0</p>
      </div>

    </main>
  );
}
