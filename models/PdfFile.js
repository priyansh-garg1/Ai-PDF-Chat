import mongoose from 'mongoose';

const PdfFileSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
    unique: true
  },
  storageId: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  createdBy: {
    type: String, // email
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.PdfFile || mongoose.model('PdfFile', PdfFileSchema);
