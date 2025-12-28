import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
    unique: true
  },
  notes: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
