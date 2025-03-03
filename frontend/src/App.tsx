import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, useUser } from "@clerk/clerk-react";
import LandingPage from "./components/landing/LandingPage";
import Editor from "./components/editor/Editor";
import NotFound from './components/NotFound';
import Profile from './components/profile/Profile';
import { SocketProvider } from './contexts/SocketContext';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Unauthorized from './components/auth/Unauthorized';

const socket = io("http://localhost:3000", {
  transports: ['websocket'],
  reconnection: true
});

function App() {
  const { isSignedIn } = useUser();
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
    <SocketProvider>
      <div className="w-full min-h-screen bg-[#0A0F1E]">
        <Routes>
          <Route path="/" element={<LandingPage connected={connected} />} />
          <Route path="/editor" element={
            isSignedIn ? (
              <SignedIn>
                <Editor socket={socket} connected={connected} />
              </SignedIn>
            ) : (
              <Navigate to="/unauthorized" replace />
            )
          } />
          <Route path="/profile" element={
            isSignedIn ? (
              <SignedIn>
                <Profile />
              </SignedIn>
            ) : (
              <Navigate to="/unauthorized" replace />
            )
          } />
          <Route path="/sign-in" element={
            isSignedIn ? (
              <Navigate to="/profile" replace />
            ) : (
              <SignIn />
            )
          } />
          <Route path="/sign-up" element={
            isSignedIn ? (
              <Navigate to="/profile" replace />
            ) : (
              <SignUp />
            )
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </SocketProvider>
  );
}

export default App;