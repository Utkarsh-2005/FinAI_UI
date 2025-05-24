'use client';
import Link from 'next/link';
import { Chat } from '@/types';

export default function ChatListItem({ chat }: { chat: Chat }) {
  const last = chat.messages[chat.messages.length - 1];
  const time = new Date(last.timestamp)
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase(); // “03:31 PM” consistently

  return (
    <Link href={`/chats/${chat.id}`}>
      <div className="flex justify-between items-center p-3 hover:bg-gray-100">
        <span>{chat.userName}</span>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
    </Link>
  );
}
