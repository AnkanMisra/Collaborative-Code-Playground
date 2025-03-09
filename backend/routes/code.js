import express from 'express';
import Code from '../models/Code.js';

const router = express.Router();

// Create new code session
router.post('/', async (req, res) => {
  try {
    const { content, language, owner } = req.body;
    const code = new Code({
      content,
      language,
      owner,
      collaborators: [owner]
    });
    
    await code.save();
    res.status(201).json(code);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get code session
router.get('/:id', async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res.status(404).json({ error: 'Code session not found' });
    }
    res.json(code);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;