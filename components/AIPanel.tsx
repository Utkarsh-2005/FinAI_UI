// app/components/AIPanel.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface Message {
  from: 'user' | 'ai'
  text: string
}

export default function AIPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typingIdx, setTypingIdx] = useState<number | null>(null)
  const [displayedText, setDisplayedText] = useState('')

  const hasUserMessage = messages.some((m) => m.from === 'user')

  // send to Gemini, then typewrite the AI reply
  const sendMessage = async (text: string) => {
    // add user message
    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode: 'Copilot' }),
      })
      const { transformed } = await res.json()

      // prepare typewriter for the AI reply
      setTypingIdx(messages.length)        // index where AI reply will land
      setDisplayedText('')

      // gradually append chars
      let i = 0
      const interval = setInterval(() => {
        setDisplayedText((t) => t + transformed[i])
        i++
        if (i >= transformed.length) {
          clearInterval(interval)
          // once done, push full AI message
          setMessages((prev) => [
            ...prev,
            { from: 'ai', text: transformed },
          ])
          setTypingIdx(null)
        }
      }, 20) // 20ms per char
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: 'Error: could not get response.' },
      ])
    }
  }

  return (
    <div className="h-full p-6 flex flex-col bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50">
      {/* Splash header */}
      {!hasUserMessage && (
        <div className="h-[75%] flex items-center">
          <div className="mb-4 text-center w-full">
            <div className="inline-block mb-2">
              <Image src="/logo.png" alt="Fin logo" width={36} height={36} />
            </div>
            <h2 className="text-xl font-semibold">Hi, I’m Fin AI Copilot</h2>
            <p className="text-gray-600">
              Ask me anything about this conversation.
            </p>
          </div>
        </div>
      )}

      {/* Chat log */}
    {hasUserMessage && (
  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
    {messages.map((m, idx) => (
      <div
        key={idx}
        className={`flex ${
          m.from === 'user' ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className={`
            px-4 py-2 rounded-2xl max-w-[80%]
            break-words whitespace-pre-wrap
            ${m.from === 'user'
              ? 'bg-white text-gray-900 self-end'
              : 'bg-gradient-to-r from-purple-200 to-pink-200 text-gray-900 self-start'
            }
          `}
        >
          {m.text}
        </div>
      </div>
    ))}

{/* in-progress AI reply */}
   {typingIdx !== null && (
     <div className="flex justify-start">
       <div
         className="
           inline-block px-4 py-2 rounded-2xl max-w-[80%]
           bg-gradient-to-r from-purple-200 to-pink-200 text-gray-900
           break-words whitespace-pre-wrap
         "
       >
         {displayedText}
       </div>
     </div>
   )}
  </div>
)}

      {/* Suggested chips */}
      {!hasUserMessage && (
        <div className="mt-4 space-x-2 overflow-x-auto">
          {['How do I get a refund?', 'My tone of voice', 'Fix grammar'].map(
            (s) => (
              <button
                key={s}
                className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-sm font-medium shadow-sm hover:bg-opacity-100"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            )
          )}
        </div>
      )}

      {/* Input box */}
      <div className="mt-4 flex items-center bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-inner">
        <input
          type="text"
          placeholder="Ask a question..."
          className="flex-1 bg-transparent focus:outline-none placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              sendMessage(input.trim())
            }
          }}
        />
        <button
          className="ml-2"
          onClick={() => input.trim() && sendMessage(input.trim())}
        >
          <svg
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
