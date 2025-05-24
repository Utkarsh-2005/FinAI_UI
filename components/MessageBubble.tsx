  // dangerouslySetInnerHTML={{ __html: message.text }}
// src/components/MessageBubble.tsx
import { Message } from '@/types';

export default function MessageBubble({ message }: { message: Message }) {
  const isAdmin = message.sender === 'admin';
  return (
    <div
      className={`
        flex mb-2
        ${isAdmin ? 'justify-end' : 'justify-start'}
        min-w-0 
      `}
    >
      <div
        className={`
          px-4 py-2 rounded-2xl shadow-sm
          ${isAdmin ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}
          max-w-[80vw]           
          sm:max-w-[70vw]    
          md:max-w-[60vw]        
          lg:max-w-[50vw]       
          xl:max-w-[450px]           
          break-words whitespace-pre-wrap
        `}
        dangerouslySetInnerHTML={{ __html: message.text }}
      >
      </div>
    </div>
  );
}
