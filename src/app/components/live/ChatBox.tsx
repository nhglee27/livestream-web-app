'use client';

import { MessageSquare, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
// @ts-ignore
import SockJS from 'sockjs-client';
// @ts-ignore
import cookies from 'js-cookies';
import { UserModel } from '../../model/user';

import { useNavigate } from 'react-router-dom';
// import { filterCmt } from '../../api/authAPI';
import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../store/chatSlice";
import { RootState } from "../../store/store";


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
 
  // const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  // check cmt
  const [isChecking, setIsChecking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<Client | null>(null);
  const navigate = useNavigate();
 const dispatch = useDispatch();

// Messages from Redux instead of useState
const messages = useSelector(
  (state: RootState) => state.chat.rooms[channelName] || []
);
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
    };

    clientRef.current.publish({
      destination: `/app/chat/${channelName}`,
      body: JSON.stringify(messagePayload),
    });

  };

  // Handle send form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) {
      toast.error('Please login to send messages.');
      navigate('/login');
      return;
    }

    if (input.trim()) {
      sendMessage(input);
      setInput('');
//     const contentToSubmit = input.trim();
    
//     // Không gửi nếu rỗng, đang kết nối, hoặc đang kiểm tra
//     if (!contentToSubmit || !isConnected || isChecking) return;

//     setIsChecking(true); // Bật trạng thái "đang kiểm tra"

//     try {
//       // Gọi API để kiểm tra
//       const response = await filterCmt.checkCmt({ text: contentToSubmit });

//       // Kiểm tra nhãn trả về
//       if (response.data.label === 'NOT TOXIC') {
//         // Chỉ gửi nếu "NOT TOXIC"
//         sendMessage(contentToSubmit);
//         setInput('');
//       } else {
//         // Nếu "TOXIC", không gửi và thông báo
//         console.warn('Toxic message blocked:', contentToSubmit);
//         toast('Tin nhắn của bạn bị cấm vì chứa nội dung độc hại.');
//         setInput(''); // Xóa tin nhắn độc hại
//       }
//     } catch (err) {
//       console.error('API check failed:', err);
//       // Có thể cho phép gửi nếu API lỗi, hoặc thông báo lỗi
//       toast('Không thể kiểm tra tin nhắn. Vui lòng thử lại.');
//     } finally {
//       setIsChecking(false); // Tắt trạng thái "đang kiểm tra"
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
        toast.success('✅ Connected to chat server');
        setIsConnected(true);

        // Subscribe to channel
        const subscription = client.subscribe(
          `/topic/messages/${channelName}`,
          (msg) => {
            try {

              const received: Message = JSON.parse(msg.body);
             

              // if(received.score === 0 && received.channelName === channelName) {
              //       setMessages((prev) => [...prev, received]);
              // }
if (received.score === 0 && received.channelName === channelName) {
  dispatch(addMessage(received));  // SAVE to Redux persist
}

              if(received.score === 1 && received.channelName === channelName) {
                // throw a warning message with rectangle yellow and the '!' in inside with the warm message by using toast
                toast.custom(
                  (t) => (
                    <div
                      className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                      } max-w-md w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 shadow-lg`}
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className="fill-current h-6 w-6 text-yellow-500 mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-.75-7V4.5a.75.75 0 011.5 0V8a.75.75 0 01-1.5 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold">Warning</p>
                          <p className="text-sm">
                            Your message was flagged as potentially toxic
                            and was not sent.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  { duration: 1000 }
                );

              }

            } catch (err) {
              toast.error('Cannot check message content, please try again.');
            }
          }
        );

        // Announce join (optional)
        sendMessage(`${sender} joined the chat`); 

        // Cleanup on unmount
        return () => subscription.unsubscribe();
      },

      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
      },

      onDisconnect: () => {
        console.log('STOMP client disconnected');
        setIsConnected(false);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
console.log('STOMP client deactivated');        
      }
    };
  }, [channelName]);


  // Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
}, [messages]);

  return (
   <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white rounded-2xl shadow-2xl overflow-hidden">
  {/* Header */}
  <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/70 backdrop-blur-md">
    <h3 className="font-semibold flex items-center text-lg tracking-wide">
      <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
      {channelName || 'Chat Room'}
    </h3>
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400">
        💬 {messages.length} message{messages.length !== 1 ? 's' : ''}
      </span>
      <span
        className={`w-2.5 h-2.5 rounded-full shadow ${
          isConnected
            ? 'bg-green-400 shadow-green-500/60 animate-pulse'
            : 'bg-red-500'
        }`}
        title={isConnected ? 'Connected' : 'Connecting...'}
      />
    </div>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
    {messages.length === 0 ? (
      <div className="text-center text-gray-500 mt-20">
        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
        <p className="text-lg font-medium">No messages yet</p>
        <p className="text-sm text-gray-400">Start the conversation 🎤</p>
      </div>
    ) : (
      messages.map((m, index) => (
        <div
          key={index}
          className={`flex items-end ${
            m.sender === sender ? 'justify-end' : 'justify-start'
          }`}
        >
          {m.sender !== sender && (
            <div className="text-xs text-gray-400 mr-2 mb-1">{m.sender}</div>
          )}
          <div
            className={`relative max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-lg text-sm transition-all duration-300 ${
              m.sender === sender
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-gray-800 text-gray-100 rounded-bl-none'
            }`}
          >
            {m.content}
           
          </div>
        </div>
      ))
    )}
    <div ref={messagesEndRef} />
  </div>

  {/* Input */}
  <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-800 bg-gray-900/70 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              !isConnected ? 'Connecting...' 
              : isChecking ? 'Checking message...' 
              : 'Type a message...'
            }
            disabled={!isConnected || isChecking} // Disable khi đang check
            className="flex-1 px-4 py-2.5 bg-gray-800/80 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 placeholder-gray-500 transition"
          />
          <button
            type="submit" // Đổi thành "submit" để nhấn Enter cũng gửi được
            disabled={!isConnected || !input.trim() || isChecking} // Disable khi đang check
            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 transition text-sm font-semibold shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isChecking ? '...' : 'Send'} {/* Thay đổi text nút */}
          </button>
        </div>
      </form>
    </div>
  );
}
