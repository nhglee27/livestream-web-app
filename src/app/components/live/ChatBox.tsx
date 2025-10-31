'use client';

import { MessageSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import cookies from 'js-cookies';
import { UserModel } from '../../model/user';

interface Message {
  id?: string;
  sender: string;
  content: string;
  timestamp: number;
  channelName: string;
}

interface ChatBoxProps {
  channelName: string;
}

export default function ChatBox({ channelName }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<Client | null>(null);

  // Get sender info from cookies
  const userData = cookies.getItem('userData');
  let sender: string = 'Anonymous';
  try {
    const parsed: UserModel = userData ? JSON.parse(userData) : null;
    if (parsed?.name) sender = parsed.name;
  } catch (err) {
    console.warn('Failed to parse user cookie:', err);
  }

  // Send message
  const sendMessage = (content: string) => {
    if (!clientRef.current || !isConnected || !content.trim()) return;

    const messagePayload: Message = {
      sender,
      content,
      channelName,
      timestamp: Date.now(),
    };

    clientRef.current.publish({
      destination: '/app/chat',
      body: JSON.stringify(messagePayload),
    });

    console.log('Sent:', messagePayload);
  };

  // Handle send form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  // Setup WebSocket STOMP client
  useEffect(() => {
    const client = new Client({
      // ✅ Keep webSocketFactory
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('✅ STOMP connected');
        setIsConnected(true);

        // Subscribe to channel
        const subscription = client.subscribe(
          `/topic/messages/${channelName}`,
          (msg) => {
            try {
              const received: Message = JSON.parse(msg.body);
              if (received.channelName === channelName) {
                setMessages((prev) => [...prev, received]);
              }
            } catch (err) {
              console.error('Failed to parse message:', err);
            }
          }
        );

        // Announce join (optional)
        sendMessage(`${sender} joined the chat`);

        // Cleanup on unmount
        return () => subscription.unsubscribe();
      },

      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);
      },

      onDisconnect: () => {
        console.log('⚠️ STOMP disconnected');
        setIsConnected(false);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log('Client deactivated');
      }
    };
  }, [channelName]);

  // Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="font-semibold flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          {channelName || 'Chat'}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {messages.length} msg{messages.length !== 1 ? 's' : ''}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
            title={isConnected ? 'Connected' : 'Connecting...'}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Say something!</p>
          </div>
        ) : (
          messages.map((m, index) => (
            <div
              key={index}
              className={`flex ${
                m.sender === sender ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  m.sender === sender
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                {m.sender !== sender && (
                  <span className="font-medium text-purple-400">
                    {m.sender}:{' '}
                  </span>
                )}
                <span>{m.content}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
          disabled={!isConnected}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        />
      </form>
    </div>
  );
}
