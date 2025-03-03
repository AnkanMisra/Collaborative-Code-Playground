import { io, Socket } from "socket.io-client";


const socket: Socket = io("http://localhost:3000", {
  transports: ['websocket'],
  reconnection: true
});


export type SocketEventHandler = (data: any) => void;


const socketService = {
  socket,
  

  onConnect: (callback: () => void) => {
    socket.on("connect", callback);
    return () => socket.off("connect", callback);
  },
  
  onDisconnect: (callback: () => void) => {
    socket.on("disconnect", callback);
    return () => socket.off("disconnect", callback);
  },
  

  sendMessage: (message: string) => {
    socket.emit("message", message);
  },
  
  onMessage: (callback: (message: string) => void) => {
    socket.on("message", callback);
    return () => socket.off("message", callback);
  },
  

  changeLanguage: (language: string) => {
    socket.emit("language-change", language);
  },
  
  onLanguageChange: (callback: (language: string) => void) => {
    socket.on("language-change", callback);
    return () => socket.off("language-change", callback);
  },
  
  cleanup: (eventName: string, callback: SocketEventHandler) => {
    socket.off(eventName, callback);
  }
};

export default socketService;