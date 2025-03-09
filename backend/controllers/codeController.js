import Code from '../models/Code.js';

export const createProject = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const code = new Code({
      content: req.body.content || "// Start coding here...",
      language: req.body.language || "javascript",
      owner: req.session.userId,
      collaborators: [req.session.userId]
    });
    await code.save();
    res.status(201).json({ codeId: code._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const projects = await Code.find({ owner: req.session.userId });
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};