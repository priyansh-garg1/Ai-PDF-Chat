import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false, // Don't return password by default
  },
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
  },
  phoneNo: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    default: '/avatar-placeholder.png', // Default avatar
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
