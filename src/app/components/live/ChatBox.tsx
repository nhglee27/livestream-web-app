'use client';

import { MessageSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Socket ,io } from 'socket.io-client';
 
interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Connect to Socket.IO (replace with your backend URL)
//   useEffect(() => {
//     const s = io('wss://your-socket-server.com', {
//       transports: ['websocket'],
//     });

//     s.on('connect', () => console.log('Chat connected'));
//     s.on('message', (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     setSocket(s);
//     return () => {
//       s.disconnect();
//     };
//   }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    const msg: Message = {
      id: Date.now().toString(),
      user: 'You',
      text: input,
      timestamp: Date.now(),
    };

    console.log(msg);

    socket.emit('message', msg);
    setInput('');
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="font-semibold flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Live Chat
        </h3>
        <span className="text-sm text-gray-400">{messages.length} messages</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Be the first to chat!</p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="text-sm">
              <span className="font-medium text-purple-400">{m.user}:</span>{' '}
              <span className="text-gray-200">{m.text}</span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </form>
    </div>
  );
}