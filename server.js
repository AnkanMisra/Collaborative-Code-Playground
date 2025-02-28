import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["*"]
  }
});

let connectedClients = 0;

io.on("connection", (socket) => {
  connectedClients++;
  console.log(`Client connected. Total clients: ${connectedClients}`);

  socket.on("message", (data) => {
    console.log(`Message received: ${data}`);
    // Broadcast to everyone including sender
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    connectedClients--;
    console.log(`Client disconnected. Total clients: ${connectedClients}`);
  });
});

console.log("Server running on port 3000");