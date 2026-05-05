import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  status:      { type: String, enum: ['todo','inprogress','review','completed'], default: 'todo' },
  priority:    { type: String, enum: ['Urgent','High','Medium','Low'], default: 'Medium' },
  tags:        [{ type: String }],
  dueDate:     { type: Date },
  subtasks:    [{ title: String, completed: { type: Boolean, default: false } }],
  comments:    [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String, createdAt: { type: Date, default: Date.now } }],
  image:       { type: String, default: '' },
  project:     { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignees:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);