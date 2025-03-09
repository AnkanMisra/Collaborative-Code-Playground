import mongoose from 'mongoose';

const CodeSchema = new mongoose.Schema({
  content: String,
  language: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastModified: { type: Date, default: Date.now }
}, { collection: 'codes' });

export default mongoose.model('Code', CodeSchema);