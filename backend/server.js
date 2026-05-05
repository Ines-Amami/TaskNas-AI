import express    from 'express';
import dotenv     from 'dotenv';
import cors       from 'cors';
import morgan     from 'morgan';
import path       from 'path';
import { fileURLToPath } from 'url';

import connectDB      from './config/connectDB.js';
import authRoutes     from './routes/authRoutes.js';
import taskRoutes     from './routes/taskRoutes.js';
import projectRoutes  from './routes/projectRoutes.js';
import aiRoutes       from './routes/aiRoutes.js';

dotenv.config();
connectDB();

const app      = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',     authRoutes);
app.use('/api/tasks',    taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ai',       aiRoutes);

app.get('/', (req, res) => res.send('🚀 TaskNas AI Backend Running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));