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
            text: `You are a JSON API. Return ONLY a JSON object, nothing else. No markdown, no backticks, no explanation. Use this exact structure: {"propuesta_valor":"...","pilares":["...","...","..."],"metricas_exito":"..."} Input to analyze: ${intakeText}`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      })
    }
  );

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  try {
    const match = raw.match(/\{[\s\S]*\}/);
    const jsonStr = match ? match[0] : raw;
    return NextResponse.json(JSON.parse(jsonStr));
  } catch (e) {
    console.log('RAW:', raw);
    return NextResponse.json({ error: 'Parse error', raw }, { status: 500 });
  }
}