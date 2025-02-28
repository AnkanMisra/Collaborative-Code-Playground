import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CodeEditor from "./CodeEditor";
import ChatArea from "./ChatArea";

const socket = io("http://localhost:3000", {
  transports: ['websocket'],
  reconnection: true
});

const Editor = () => {
  const [chat, setChat] = useState<string[]>([]);
  const [code, setCode] = useState("// Start coding here...");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server!", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server!");
      setConnected(false);
    });

    socket.on("message", (data: string) => {
      console.log("Received message:", data);
      setChat(prevChat => [...prevChat, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

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
            onClick={() => window.history.back()}
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