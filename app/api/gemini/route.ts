// app/api/gemini/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!apiKey) {
  throw new Error('GEMINI_API_KEY must be set in environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
}

async function runPrompt(userPrompt: string): Promise<string> {
  const chat = model.startChat({ generationConfig })

  // System-style instruction embedded directly
  const fullPrompt =
    'You are a customer care agent. Only return the transformed result. Do NOT include any commentary, explanation, or metadata.\n\n' +
    userPrompt

  const result = await chat.sendMessage(fullPrompt)
  const text = result.response?.text?.().trim()
  if (!text) throw new Error('Empty response from Gemini')
  return text
}

export async function POST(request: NextRequest) {
  try {
    const { text, mode } = (await request.json()) as {
      text?: string
      mode?: string
    }

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    let userPrompt = text

    switch (mode) {
      case 'Rephrase':
        userPrompt = `Rephrase the following text, preserving its meaning:\n"${text}"`
        break
      case 'My tone of voice':
        userPrompt = `Rewrite the following in my tone of voice:\n"${text}"`
        break
      case 'More friendly':
        userPrompt = `Make the following more friendly:\n"${text}"`
        break
      case 'More formal':
        userPrompt = `Make the following more formal:\n"${text}"`
        break
      case 'Fix grammar & spelling':
        userPrompt = `Correct the grammar and spelling of the following:\n"${text}"`
        break
      case 'Translate...':
        userPrompt = `Translate the following to the target language:\n"${text}"`
        break
    }

    const transformed = await runPrompt(userPrompt)
    return NextResponse.json({ transformed })
  } catch (err: any) {
    console.error('Gemini API error:', err)
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    )
  }
}


