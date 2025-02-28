import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Editor from "./components/editor/Editor";
import NotFound from './components/NotFound';

const socket = io("http://localhost:3000", {
  transports: ['websocket'],
  reconnection: true
});

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to server!", socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from server!");
      setConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage connected={connected} />} />
        <Route path="/editor" element={<Editor socket={socket} connected={connected} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;