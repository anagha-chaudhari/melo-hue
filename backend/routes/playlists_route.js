const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

// POST - Save a track to a specific user's playlist
router.post('/', async (req, res) => {
  const { title, spotifyTrackId, tags, userEmail } = req.body;

  if (!title || !spotifyTrackId || !tags || !userEmail) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const newTrack = new Playlist({ title, spotifyTrackId, tags, userEmail });
    await newTrack.save();
    res.status(201).json({ message: 'Track added!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save track' });
  }
});

// GET - Fetch playlist for a specific user
router.get('/', async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const userTracks = await Playlist.find({ userEmail: email });
    res.status(200).json(userTracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

module.exports = router;
