import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Unauthorized from './components/auth/Unauthorized';
import Editor from "./components/editor/Editor";
import LandingPage from "./components/landing/LandingPage";
import NotFound from './components/NotFound';
import Profile from './components/profile/Profile';
import { SocketProvider } from './contexts/SocketContext';
import VerifyEmail from './components/auth/VerifyEmail';

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
          <Route path="/sign-in" element={
            isSignedIn ? <Navigate to="/editor" replace /> : <SignIn />
          } />
          <Route path="/sign-up" element={
            isSignedIn ? <Navigate to="/editor" replace /> : <SignUp />
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/editor" element={
            isSignedIn ? (
              <Editor socket={socket} connected={connected} />
            ) : (
              <Navigate to="/unauthorized" state={{ from: '/editor' }} replace />
            )
          } />
          <Route path="/profile" element={
            isSignedIn ? (
              <Profile />
            ) : (
              <Navigate to="/unauthorized" state={{ from: '/profile' }} replace />
            )
          } />
          <Route path="/signup" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </div>
    </SocketProvider>
  );
}

export default App;
