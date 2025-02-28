import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CodeEditor from "./CodeEditor";
import ChatArea from "../chat/ChatArea";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:3000", {
  transports: ['websocket'],
  reconnection: true
});

import { Socket } from 'socket.io-client';

interface EditorProps {
  socket: Socket;
  connected: boolean;
}

const Editor = ({ socket, connected }: EditorProps) => {
  const navigate = useNavigate();
  const [chat, setChat] = useState<string[]>([]);
  const [code, setCode] = useState("// Start coding here...");

  useEffect(() => {
    const handleMessage = (data: string) => {
      console.log("Received message:", data);
      setChat(prevChat => [...prevChat, data]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const sendMessage = (message: string) => {
    if (message.trim() && connected) {
      console.log("Sending message:", message);
      socket.emit("message", message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Top Bar */}
      <div className="w-full bg-[#1E293B]/30 border-b border-[#3B82F6]/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#3B82F6] text-2xl">&lt;/&gt;</span>
            <h1 className="text-2xl font-bold text-white font-['Roboto_Condensed']">
              CodePlay Editor
            </h1>
            {connected ? (
              <span className="ml-4 px-3 py-1 bg-[#1E293B]/50 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Connected
              </span>
            ) : (
              <span className="ml-4 px-3 py-1 bg-[#1E293B]/50 text-red-400 rounded-full text-sm font-medium border border-red-500/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                Disconnected
              </span>
            )}
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E293B]/50 text-white/80 rounded-lg 
                     hover:bg-[#1E293B]/80 transition-all duration-200 text-sm font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Panel */}
          <div className="bg-[#1E293B]/30 rounded-xl border border-[#3B82F6]/10 overflow-hidden backdrop-blur-sm">
            <div className="px-4 py-2.5 bg-[#1E293B]/50 border-b border-[#3B82F6]/10 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#3B82F6]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-white/90 text-sm font-medium">Code Editor</span>
            </div>
            <CodeEditor code={code} onChange={setCode} />
          </div>

          {/* Chat Panel */}
          <div className="bg-[#1E293B]/30 rounded-xl border border-[#3B82F6]/10 overflow-hidden backdrop-blur-sm">
            <div className="px-4 py-2.5 bg-[#1E293B]/50 border-b border-[#3B82F6]/10 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#3B82F6]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-white/90 text-sm font-medium">Chat</span>
            </div>
            <ChatArea messages={chat} onSendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;