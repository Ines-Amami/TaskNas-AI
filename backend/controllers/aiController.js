import {
  breakGoalIntoTasks,
  analyzeWorkload,
  chatWithAI,
  generateTaskDescription,
} from '../services/geminiService.js';

export const handleGoal = async (req, res) => {
  try {
    const { goal } = req.body;
    if (!goal?.trim()) return res.status(400).json({ message: 'Goal is required' });
    const tasks = await breakGoalIntoTasks(goal);
    res.json({ tasks });
  } catch (err) {
    console.error('AI Goal Error:', err.message);
    res.status(500).json({ message: 'AI error: ' + err.message });
  }
};

export const handleInsights = async (req, res) => {
  try {
    const { tasks } = req.body;
    if (!tasks?.length) return res.status(400).json({ message: 'Tasks array required' });
    const insights = await analyzeWorkload(tasks);
    res.json(insights);
  } catch (err) {
    console.error('AI Insights Error:', err.message);
    res.status(500).json({ message: 'AI error: ' + err.message });
  }
};

export const handleChat = async (req, res) => {
  try {
    const { message, tasks, history } = req.body;
    if (!message?.trim()) return res.status(400).json({ message: 'Message is required' });
    const reply = await chatWithAI(message, tasks || [], history || []);
    res.json({ reply });
  } catch (err) {
    console.error('AI Chat Error:', err.message);
    res.status(500).json({ message: 'AI error: ' + err.message });
  }
};

export const handleDescribe = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'Title is required' });
    const description = await generateTaskDescription(title);
    res.json({ description });
  } catch (err) {
    console.error('AI Describe Error:', err.message);
    res.status(500).json({ message: 'AI error: ' + err.message });
  }
};