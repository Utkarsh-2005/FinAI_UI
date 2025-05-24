import { chats } from '@/data/dummyChats';
import AdminLayout from '@/components/AdminLayout';
import Conversation from '@/components/Conversation';

type Props = { params: { chatId: string } };

export default function ChatPage({ params }: Props) {
  const chat = chats.find(c => c.id === params.chatId);
  if (!chat) return <div className="p-4">Chat not found.</div>;

  return (
    <AdminLayout>
      <Conversation chat={chat} />
    </AdminLayout>
  );
}
