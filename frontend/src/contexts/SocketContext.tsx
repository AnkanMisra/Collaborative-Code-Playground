import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import socketService from '../services/socketService';

interface SocketContextType {
  connected: boolean;
  socket: typeof socketService.socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to server!", socketService.socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from server!");
      setConnected(false);
    };

    const cleanupConnect = socketService.onConnect(handleConnect);
    const cleanupDisconnect = socketService.onDisconnect(handleDisconnect);

    return () => {
      cleanupConnect();
      cleanupDisconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ connected, socket: socketService.socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};