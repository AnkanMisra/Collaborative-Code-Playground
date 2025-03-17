import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true }, // Add password field
}, { collection: "users", timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
