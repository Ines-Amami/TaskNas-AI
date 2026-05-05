import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log('📥 Register attempt:', { name, email, password });

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields required' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password });
    console.log('✅ User created:', user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: makeToken(user._id),
    });
  } catch (err) {
    console.error('❌ Register error:', err.message);
    console.error('❌ Full error:', err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: 'All fields required' });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      _id: user._id, name: user.name,
      email: user.email, token: makeToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};