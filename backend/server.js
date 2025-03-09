import { Server } from 'socket.io';
import express from 'express';
import session from 'express-session';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import codeRoutes from './routes/codeRoutes.js';
import Code from './models/Code.js';

// Connect to MongoDB first
await connectDB();

const app = express();
const server = app.listen(3000);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["*"]
  }
});

// Express middleware
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/code', codeRoutes);

// Socket.IO handling
let connectedClients = new Map();
const activeRooms = new Map();

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("join-room", async (roomId, userId) => {
    try {
      const code = await Code.findById(roomId);
      if (!code || code.owner.toString() !== userId) {
        socket.emit("error", "Unauthorized access");
        return;
      }
      
      socket.join(roomId);
      if (!activeRooms.has(roomId)) {
        activeRooms.set(roomId, code.content);
      }
      socket.emit("initial-code", activeRooms.get(roomId));
    } catch (error) {
      socket.emit("error", "Failed to join room");
    }
  });

  socket.on("code-change", async (data) => {
    const { roomId, content, userId } = data;
    activeRooms.set(roomId, content);
    await Code.findByIdAndUpdate(roomId, { 
      content,
      lastModified: Date.now()
    });
    socket.to(roomId).emit("code-update", content);
  });

  socket.on("message", (data) => {
    const { roomId, message, userId } = data;
    io.to(roomId).emit("message", { message, userId });
  });

  socket.on("language-change", (language) => {
    console.log(`Language changed to: ${language}`);
    socket.broadcast.emit("language-change", language);
  });

  socket.on("disconnect", () => {
    connectedClients.delete(socket.id);
    console.log(`Socket disconnected. Authenticated users: ${connectedClients.size}`);
  });
});

console.log("Server running on port 3000");
