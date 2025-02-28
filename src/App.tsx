import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CodeEditor from "./components/CodeEditor";
import ChatArea from "./components/ChatArea";

const socket = io("http://localhost:3000", {
  transports: ['websocket'],
  reconnection: true
});

function App() {
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
      // Only emit to server, don't add to chat locally
      socket.emit("message", message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          Live Collab Code Editor {!connected && "(Disconnected)"}
        </h1>
        
        <div className="grid grid-cols-2 gap-6 pb-32">
          <CodeEditor code={code} onChange={setCode} />
          <ChatArea messages={chat} onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;