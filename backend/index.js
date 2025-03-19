import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Welcome to the User Signup API");
});

// Connect to database and start server
connectDB();
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
