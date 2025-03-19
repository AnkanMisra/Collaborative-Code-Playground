import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string()
        .pattern(/^[0-9]{10}$/) // Validates a 10-digit phone number
        .required(),
    password: Joi.string().min(6).max(30).required(), // Password must be at least 6 characters
});
