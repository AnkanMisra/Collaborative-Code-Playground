import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
}, { collection: 'auth' });

export default mongoose.model('User', UserSchema);