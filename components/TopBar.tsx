'use client';
import { Search, Menu, Bot } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
  onAiClick:   () => void;
}

export default function Topbar({ onMenuClick, onAiClick }: TopbarProps) {
  return (
    <header className="h-12 bg-white border-b flex items-center px-4 justify-between">
      {/* hamburger for sidebar */}
      <button className="md:hidden text-gray-600" onClick={onMenuClick}>
        <Menu size={24} />
      </button>

      {/* search */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search chats…"
          className="w-full border rounded pl-8 pr-2 py-1 focus:outline-none text-sm"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      </div>

      {/* AI Copilot toggle */}
      <button
        className="ml-4 text-gray-600 hover:text-gray-800"
        onClick={onAiClick}
        aria-label="Open Fin AI Copilot"
      >
        <Bot size={24} className='md:hidden'/>
      </button>
    </header>
  );
}
