import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { intakeText } = await req.json();
  if (!intakeText?.trim()) return NextResponse.json({ error: 'No input' }, { status: 400 });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are the Core Agent for Match Point AI, a Padel club system.
Analyze this input and respond ONLY with a raw JSON object. No markdown. No backticks. No explanation. Start your response with { and end with }:
{
  "propuesta_valor": "one sentence value insight",
  "pilares": ["pillar 1", "pillar 2", "pillar 3"],
  "metricas_exito": "one sentence key metric"
}
Input: ${intakeText}`
          }]
        }]
      })
    }
  );

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  try {
    const clean = raw.replace(/```json|```/g, '').trim();
    return NextResponse.json(JSON.parse(clean));
  } catch {
    return NextResponse.json({ error: 'Parse error', raw }, { status: 500 });
  }
}