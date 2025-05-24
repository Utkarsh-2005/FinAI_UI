import { chats } from '@/data/dummyChats'
import AdminLayout from '@/components/AdminLayout'
import Conversation from '@/components/Conversation'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { chatId: string }
}

export default function Page({ params }: PageProps) {
  const chat = chats.find((c) => c.id === params.chatId)
  if (!chat) notFound()

  return (
    <AdminLayout>
      <Conversation chat={chat} />
    </AdminLayout>
  )
}
