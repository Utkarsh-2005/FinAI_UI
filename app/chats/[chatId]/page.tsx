import { chats } from '@/data/dummyChats'
import AdminLayout from '@/components/AdminLayout'
import Conversation from '@/components/Conversation'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  const chat = chats.find((c) => c.id === chatId)
  if (!chat) notFound()

  return (
    <AdminLayout>
      <Conversation chat={chat} />
    </AdminLayout>
  )
}