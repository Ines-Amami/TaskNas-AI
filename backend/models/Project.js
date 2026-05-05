import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, default: '' },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  goals: [{
    title:     String,
    priority:  { type: String, default: 'Medium' },
    dueDate:   Date,
    completed: { type: Number, default: 0 },
    total:     { type: Number, default: 0 },
  }],
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);