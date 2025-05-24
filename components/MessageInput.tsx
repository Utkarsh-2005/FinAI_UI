// app/components/MessageInput.tsx
'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import {
  MessageSquare,
  Zap,
  ImageIcon,
  Smile,
  ChevronDown,
  Bold,
  Italic,
  Link as LinkIcon,
  Bot,
} from 'lucide-react'

interface MessageInputProps {
  onSend?: (html: string) => void
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState('')
  const [showToolbar, setShowToolbar] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const resize = () => {
    const el = editorRef.current!
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  const updateToolbar = () => {
    const sel = window.getSelection()!
    const inside = editorRef.current!.contains(sel.anchorNode)
    setShowToolbar(inside && !sel.isCollapsed)
  }

  useEffect(() => {
    document.addEventListener('selectionchange', updateToolbar)
    return () => document.removeEventListener('selectionchange', updateToolbar)
  }, [])

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val)
    editorRef.current?.focus()
    updateToolbar()
  }

  const getSelectionText = () => window.getSelection()?.toString() || ''

  const replaceSelection = (newText: string) => {
    document.execCommand('insertText', false, newText)
    editorRef.current?.focus()
  }

  const runAi = async (mode: string) => {
    const selected = getSelectionText()
    if (!selected) return
    setAiOpen(false)
    setLoading(true)

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selected, mode }),
      })
      const { transformed } = await res.json()
      replaceSelection(transformed)
    } catch (err) {
      console.error(err)
      replaceSelection(selected)
    } finally {
      setLoading(false)
    }
  }

  const send = () => {
    const text = editorRef.current!.innerText.trim()
    if (!text) return
    onSend?.(editorRef.current!.innerHTML)
    editorRef.current!.innerHTML = ''
    resize()
    setHtml('')
    setShowToolbar(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    setHtml((e.target as HTMLDivElement).innerHTML)
    resize()
  }

  const aiOptions = [
    'Rephrase',
    'My tone of voice',
    'More friendly',
    'More formal',
    'Fix grammar & spelling',
    'Translate...',
  ]

  return (
    <div className="w-full border bg-white rounded-lg shadow-sm p-3 flex flex-col space-y-2 relative overflow-visible z-10">
      {showToolbar && (
        <>
          <style jsx>{`
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white border rounded-md shadow p-1 flex flex-col space-y-1 z-50">
            <div className="flex space-x-2">
              <div className="relative">
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setAiOpen(o => !o)}
                  className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700"
                >
                  AI
                </button>
                {aiOpen && (
                  <div className="absolute bottom-full left-0 mb-1 w-48 bg-white border rounded shadow z-50 text-sm">
                    {aiOptions.map(opt => (
                      <div
                        key={opt}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => runAi(opt)}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button onMouseDown={e => e.preventDefault()} onClick={() => exec('bold')}>
                <Bold size={16} />
              </button>
              <button onMouseDown={e => e.preventDefault()} onClick={() => exec('italic')}>
                <Italic size={16} />
              </button>
              <button onMouseDown={e => e.preventDefault()} onClick={() => exec('formatBlock', '<H1>')}>
                H1
              </button>
              <button onMouseDown={e => e.preventDefault()} onClick={() => exec('formatBlock', '<H2>')}>
                H2
              </button>
              <button onMouseDown={e => e.preventDefault()} onClick={() => exec('insertUnorderedList')}>
                • List
              </button>
              <button
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  const url = prompt('URL:', 'https://') || ''
                  exec('createLink', url)
                }}
              >
                <LinkIcon size={16} />
              </button>
              <button onMouseDown={e => e.preventDefault()} onClick={() => exec('insertHorizontalRule')}>
                <Bot size={16} />
              </button>
            </div>
            {loading && (
              <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full rounded bg-gradient-to-r from-[#e8b0db] to-[#6524a6]"
                  style={{ animation: 'progress 2s linear infinite' }}
                />
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 space-x-1">
          <MessageSquare className="h-4 w-4" />
          <span>Chat</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="relative">
        {!html && (
          <div className="absolute inset-0 px-3 py-2 text-gray-400 pointer-events-none select-none z-10">
            Use ⌘K for shortcuts  (Select text to use AI)
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={onInput}
          onKeyDown={onKeyDown}
          onFocus={() => {
            resize()
            updateToolbar()
          }}
          onBlur={() => setTimeout(updateToolbar, 100)}
          className="px-3 py-2 rounded-md focus:outline-none whitespace-pre-wrap break-words selection:bg-blue-200 relative z-20"
          style={{ height: 'auto', maxHeight: '200px', wordBreak: 'break-word', overflow: 'hidden' }}
        />
      </div>

      <div className="flex justify-between items-center text-gray-500 text-sm z-30">
        <div className="flex space-x-4 relative">
          <button className="hover:text-gray-700"><Zap size={18} /></button>
          <button className="hover:text-gray-700"><ImageIcon size={18} /></button>
          <div className="relative z-50">
            <button
              onClick={() => setEmojiOpen(e => !e)}
              className="hover:text-gray-700"
            >
              <Smile size={18} />
            </button>
            {emojiOpen && (
              <div className="absolute bottom-full mb-2 left-0 flex space-x-2 bg-white border rounded-lg shadow p-2 z-50">
                {['😀','😂','😍','👍','🎉'].map(emo => (
                  <button
                    key={emo}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => { replaceSelection(emo); setEmojiOpen(false) }}
                    className="text-xl"
                  >
                    {emo}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={send}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 space-x-1"
        >
          <span>Send</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
