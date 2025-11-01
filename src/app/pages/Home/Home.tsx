import React, { useState, useEffect, useRef } from "react"
import HeroSection from "./HeroSection"
import FeatureSection from "./FeatureSection"
import FeaturedChannelsSection from "./FeaturedChannelsSection"
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


const HomePage: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  // const [messages, setMessages] = useState<any[]>([]);
  // const clientRef = useRef<Client | null>(null);

  // // Function to send a message to the server
  // const sendMessage = (content: string, sender: string = "ReactUser") => {
  //   if (clientRef.current && isConnected) {
  //     clientRef.current.publish({
  //       destination: "/app/chat",
  //       body: JSON.stringify({ 
  //         sender, 
  //         content, 
  //         timestamp: new Date() 
  //       }),
  //     });
  //     console.log("📤 Message sent:", content);
  //   } else {
  //     console.log("❌ Not connected to server");
  //   }
  // };

  // useEffect(() => {
  //   const client = new Client({
  //     webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
  //     onConnect: () => {
  //       console.log("Connected ✅");
  //       setIsConnected(true);
        
  //       client.subscribe("/topic/messages", (message) => {
  //         const receivedMessage = JSON.parse(message.body);
  //         console.log("📩", receivedMessage);
  //         setMessages(prev => [...prev, receivedMessage]);
  //       });

  //       // Send initial hello message
  //       sendMessage("Hello! I just connected!");
  //     },
  //     onDisconnect: () => {
  //       console.log("Disconnected ❌");
  //       setIsConnected(false);
  //     },
  //   });

  //   clientRef.current = client;
  //   client.activate();

  //   // Cleanup function
  //   return () => {
  //     if (clientRef.current) {
  //       clientRef.current.deactivate();
  //     }
  //   };
  // }, []);
//  {/* WebSocket Test Section */}
//       <div className="mt-8 p-4 bg-gray-800 rounded-lg max-w-md w-full">
//         <h3 className="text-lg font-bold mb-4">Real-time Chat Test</h3>
        
//         {/* Connection Status */}
//         <div className="mb-4">
//           Status: <span className={isConnected ? "text-green-400" : "text-red-400"}>
//             {isConnected ? "Connected ✅" : "Disconnected ❌"}
//           </span>
//         </div>
        
//         {/* Send Message Buttons */}
//         <div className="space-y-2 mb-4">
//           <button 
//             onClick={() => sendMessage("Hello from React!")}
//             disabled={!isConnected}
//             className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//           >
//             Send Hello Message
//           </button>
          
//           <button 
//             onClick={() => sendMessage("This is a test message")}
//             disabled={!isConnected}
//             className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//           >
//             Send Test Message
//           </button>
          
//           <button 
//             onClick={() => sendMessage(`Current time: ${new Date().toLocaleTimeString()}`)}
//             disabled={!isConnected}
//             className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
//           >
//             Send Timestamp
//           </button>
//         </div>
        
//         {/* Recent Messages */}
//         <div className="bg-gray-900 p-3 rounded max-h-32 overflow-y-auto">
//           <h4 className="text-sm font-semibold mb-2">Recent Messages:</h4>
//           {messages.length === 0 ? (
//             <p className="text-gray-400 text-sm">No messages yet...</p>
//           ) : (
//             messages.slice(-3).map((msg, index) => (
//               <div key={index} className="text-sm mb-1">
//                 <span className="text-blue-400">{msg.sender}:</span> {msg.content}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      <HeroSection />
      <FeatureSection />
      <FeaturedChannelsSection />
      
     
    </div>
  )
}

export default HomePage
