import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["*"]
  }
});

const connectedClients = new Set();

io.on("connection", (socket) => {
  if (!connectedClients.has(socket.id)) {
    connectedClients.add(socket.id);
    console.log(`Client connected. Total clients: ${connectedClients.size}`);
  }

  socket.on("message", (data) => {
    console.log(`Message received: ${data}`);
    io.emit("message", data);
  });

  socket.on("language-change", (language) => {
    console.log(`Language changed to: ${language}`);
    socket.broadcast.emit("language-change", language);
  });

  socket.on("disconnect", () => {
    if (connectedClients.has(socket.id)) {
      connectedClients.delete(socket.id);
      console.log(`Client disconnected. Total clients: ${connectedClients.size}`);
    }
  });
});

console.log("Server running on port 3000");
