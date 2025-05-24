import { Chat } from '@/types';

export const chats: Chat[] = [
  {
    id: '1',
    userName: 'Luis Easton',
    messages: [
      { id: 'm1', text: 'I bought a product from your store in November…', sender: 'user', timestamp: '2025-05-23T10:00:00Z' },
      { id: 'm2', text: 'Let me just look into this for you, Luis.', sender: 'admin', timestamp: '2025-05-23T10:01:00Z' },
    ],
  },
  {
    id: '2',
    userName: 'Ivan – Nike',
    messages: [
      { id: 'm1', text: 'Hi there, I have a question…', sender: 'user', timestamp: '2025-05-23T09:30:00Z' },
      { id: 'm2', text: 'Sure, what can I help with?', sender: 'admin', timestamp: '2025-05-23T09:31:00Z' },
    ],
  },
  // add more as needed
];
