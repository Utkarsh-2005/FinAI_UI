import AdminLayout from '@/components/AdminLayout';
import ChatList from '@/components/ChatList';
import { redirect } from 'next/navigation'

export default function HomePage() {
   redirect('/chats/1')
  return (
    <AdminLayout>
      <ChatList />
    </AdminLayout>
  );
}
