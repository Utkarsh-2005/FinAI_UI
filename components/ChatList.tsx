'use client';
import ChatListItem from './ChatListItem';
import { chats } from '@/data/dummyChats';

export default function ChatList() {
  return (
    <div className="divide-y">
      {chats.map(chat => (
        <ChatListItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}
