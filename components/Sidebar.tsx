'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { chats } from '@/data/dummyChats';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const path = usePathname();
  const activeId = path?.split('/').pop();

  return (
    // fixed full-screen drawer on mobile, static on md+
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform
        ${open ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-200 ease-in-out
        md:static md:translate-x-0
      `}
    >
      {/* close button only on mobile */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="text-lg font-semibold">Inbox</h2>
        <button onClick={onClose} className="text-gray-600">&times;</button>
      </div>

      {/* header on md+ */}
      <div className="hidden md:flex items-center justify-between p-5 pb-3">
        <h2 className="text-xl font-semibold">Inbox</h2>
        <button className="text-sm text-blue-600 hover:underline">Filter</button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {chats.map(chat => {
          const isActive = chat.id === activeId;
          const last = chat.messages.at(-1)!;
          return (
            <Link key={chat.id} href={`/chats/${chat.id}`}>
              <div
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${isActive 
                    ? 'bg-blue-50 font-semibold text-blue-800' 
                    : 'hover:bg-gray-100 text-gray-800'}
                `}
                onClick={onClose} // auto-close on mobile
              >
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                  {chat.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="truncate">{chat.userName}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(last.timestamp)
                        .toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="truncate text-sm text-gray-500 mt-1">
                    {last.text}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
