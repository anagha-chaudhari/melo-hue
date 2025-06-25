const express = require('express');
const router = express.Router();
const Message = require('../models/MsgMe');

// POST /api/message
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Message is empty' });

    const newMsg = new Message({ content });
    await newMsg.save();
    res.status(200).json({ message: 'Message saved!' });
  } catch (err) {
    console.error('Message Save Error:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;
