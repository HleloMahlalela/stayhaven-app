import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['APP_ADMIN', 'GUEST', 'HOUSE_ADMIN'], required: true },
  fullName: { type: String, required: true, trim: true },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED'], default: 'ACTIVE' },
}, { timestamps: true });
export default mongoose.models.User || mongoose.model('User', userSchema);
