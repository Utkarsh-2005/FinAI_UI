'use client';
import { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '@/types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { v4 as uuidv4 } from 'uuid';

export default function Conversation({ chat }: { chat: Chat }) {
  // Start with the passed‐in messages
  const [messages, setMessages] = useState<Message[]>(chat.messages);

  // Ref to the scroll container
  const feedRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    feedRef.current?.scrollTo({
      top: feedRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  // Handler for new messages
  const handleSend = (text: string) => {
    const newMsg: Message = {
      id: uuidv4(),
      text,
      sender: 'admin',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Message feed */}
      <div ref={feedRef} className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map(m => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
