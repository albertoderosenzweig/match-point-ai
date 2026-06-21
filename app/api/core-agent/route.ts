import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { intakeText } = await req.json();
  if (!intakeText?.trim()) return NextResponse.json({ error: 'No input' }, { status: 400 });

  const apiKey = "AQ.Ab8RN6JQuNx40AI9ClMcPTr-DAWKhWts_QreE5daI_XwCyn-Gw";
  if (!apiKey) return NextResponse.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 });

  const prompt = `You are a padel club business analyst AI. Analyze this club data and return ONLY a valid JSON object with no markdown, no backticks, no explanation. Just the raw JSON.

Club data: ${intakeText}

Return this exact JSON structure:
{
  "propuesta_valor": "one sentence value proposition",
  "pilares": ["pillar 1", "pillar 2", "pillar 3"],
  "metricas_exito": "key success metric",
  "recomendaciones": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 1024 }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Gemini API error' }, { status: 500 });
    }

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Strip markdown code blocks if present
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json(parsed);
    } catch {
      // Try to extract JSON from the response
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        return NextResponse.json(JSON.parse(match[0]));
      }
      return NextResponse.json({ error: 'Could not parse Gemini response', raw: cleaned }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}