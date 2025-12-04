'use client';

import { MessageSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { UserModel } from '../../model/user';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../store/chatSlice';
import { RootState } from '../../store/store';
import EmojiPicker from 'emoji-picker-react';

interface Message {
  id?: string;
  sender: string;
  content: string;
  channelName: string;
  score?: number;
  label?: string;
}

interface ChatBoxProps {
  channelName: string;
}

export default function ChatBox({ channelName }: ChatBoxProps) {
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<Client | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Messages from Redux
  const messages = useSelector(
    (state: RootState) => state.chat.rooms[channelName] || []
  );

  // Get current user
  const userData = sessionStorage.getItem('userData');
  let sender = 'Anonymous';
  try {
    const parsed: UserModel = userData ? JSON.parse(userData) : null;
    if (parsed?.name) sender = parsed.name;
  } catch (err) {
    console.warn('Failed to parse user data:', err);
  }

  const sendMessage = (content: string) => {
    if (!clientRef.current || !isConnected || !content.trim()) return;
    const payload: Message = { sender, content, channelName };
    clientRef.current.publish({
      destination: `/app/chat/${channelName}`,
      body: JSON.stringify(payload),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) {
      toast.error('Please login to send messages');
      navigate('/login');
      return;
    }

    if (input.trim() && isConnected) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  // WebSocket Connection
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        setIsConnected(true);
        toast.success('Connected to chat');

        client.subscribe(`/topic/messages/${channelName}`, (msg) => {
          try {
            const received: Message = JSON.parse(msg.body);
            if (received.channelName !== channelName) return;

            if (received.score === 0) {
              dispatch(addMessage(received));
            }

            if (received.score === 1) {
              toast.custom(
                (t) => (
                  <div
                    className={`${
                      t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md bg-yellow-50 border border-yellow-300 rounded-lg p-4 shadow-xl`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-yellow-900">
                          !
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-yellow-900">Message Blocked</p>
                        <p className="text-sm text-yellow-800 mt-1">
                          Your message was flagged as potentially toxic and was not sent.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                { duration: 6000, position: 'bottom-center' }
              );
            }
          } catch (err) {
            console.error('Failed to parse message:', err);
          }
        });
      },

      onStompError: (frame) => {
        console.error('STOMP Error:', frame.headers['message']);
        toast.error('Connection error');
      },

      onDisconnect: () => setIsConnected(false),
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [channelName, dispatch]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/70 backdrop-blur-md flex items-center justify-between z-10">
        <h3 className="font-semibold flex items-center text-lg">
          <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
          {channelName}
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </span>
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500'
            } shadow-lg`}
            title={isConnected ? 'Connected' : 'Disconnected'}
          />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-3
        scrollbar-thin scrollbar-thumb-purple-500 
        scrollbar-track-transparent
        hover:scrollbar-thumb-purple-400
        transition-all duration-200"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm mt-2">Start the conversation!</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-end gap-3 mb-2 ${
                m.sender === sender ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender !== sender && (
                <span className="text-xs text-gray-400 max-w-[100px] truncate">
                  {m.sender}
                </span>
              )}

              <div
                className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl shadow-lg text-sm font-medium break-words ${
                  m.sender === sender
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700/50'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))
        )}

      </div>

      {/* Input + Emoji Picker */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-800 bg-gray-900/70 backdrop-blur-md relative"
      >
        <div className="flex gap-3 items-center">
          {/* Emoji button */}
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-full 
                       hover:bg-gray-700 transition-all text-xl"
          >
            😊
          </button>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
            disabled={!isConnected}
            className="flex-1 px-5 py-3 bg-gray-800/90 border border-gray-700 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 
                     placeholder-gray-500 text-white transition-all"
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!isConnected || !input.trim()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold 
                       shadow-lg transition-all active:scale-95 
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>

        {/* Emoji Picker Popup */}
        {showEmoji && (
          <div className="absolute bottom-20 left-16 z-50">
            <EmojiPicker
              onEmojiClick={(emoji) => setInput((prev) => prev + emoji.emoji)}
              height={350}
              width={300}
            />
          </div>
        )}
      </form>
    </div>
  );
}
