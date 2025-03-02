import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["*"]
  }
});

// Track unique clients by their ID
const connectedClients = new Set();

io.on("connection", (socket) => {
  // Only increment if this is a new client
  if (!connectedClients.has(socket.id)) {
    connectedClients.add(socket.id);
    console.log(`Client connected. Total clients: ${connectedClients.size}`);
  }

  socket.on("message", (data) => {
    console.log(`Message received: ${data}`);
    // Broadcast to everyone including sender
    io.emit("message", data);
  });

  // Handle language change events
  socket.on("language-change", (language) => {
    console.log(`Language changed to: ${language}`);
    // Broadcast to everyone except sender
    socket.broadcast.emit("language-change", language);
  });

  socket.on("disconnect", () => {
    // Only decrement if this client was tracked
    if (connectedClients.has(socket.id)) {
      connectedClients.delete(socket.id);
      console.log(`Client disconnected. Total clients: ${connectedClients.size}`);
    }
  });
});

console.log("Server running on port 3000");