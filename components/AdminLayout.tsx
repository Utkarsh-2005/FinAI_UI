'use client';
import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import AIPanel from './AIPanel';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiOpen, setAiOpen]       = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Drawer */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar 
          onMenuClick={() => setSidebarOpen(true)} 
          onAiClick  ={() => setAiOpen(true)} 
        />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">{children}</main>
      </div>

      {/* AI Panel on md+ */}
      <div className="hidden md:block w-80 border-l bg-white">
        <AIPanel />
      </div>

      {/* AI Drawer on mobile */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transform ${aiOpen ? 'translate-x-0' : 'translate-x-full'}
          transition-transform duration-200 ease-in-out
        `}
      >
        <div className="absolute inset-0 bg-black/30" onClick={() => setAiOpen(false)} />
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg">
          <div className="p-2 flex justify-end">
            <button onClick={() => setAiOpen(false)} className="text-gray-600 text-2xl">&times;</button>
          </div>
          <AIPanel />
        </div>
      </div>
    </div>
  );
}
