export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: string;
}

export interface Chat {
  id: string;
  userName: string;
  messages: Message[];
}
