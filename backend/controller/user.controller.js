import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { signupSchema } from "../validations/user.validations.js";

export const signupUser = async (req, res) => {
    try {
        const { name, email, contactNumber, password } = req.body;

        // Validate request body
        const { error } = signupSchema.validate({ name, email, contactNumber, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const newUser = new User({ name, email, contactNumber, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
