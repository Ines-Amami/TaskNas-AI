import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user._id });
    res.json(projects);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body, owner: req.user._id, members: [req.user._id],
    });
    res.status(201).json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};