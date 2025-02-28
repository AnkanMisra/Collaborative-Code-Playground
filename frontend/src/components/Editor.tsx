import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CodeEditor from "./CodeEditor";
import ChatArea from "./ChatArea";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            CodePlay Editor {!connected && <span className="text-red-500">(Disconnected)</span>}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6 pb-32">
          <CodeEditor code={code} onChange={setCode} />
          <ChatArea messages={chat} onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Editor;