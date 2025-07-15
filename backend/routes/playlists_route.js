const express = require('express');
const router = express.Router();
const UserPlaylist = require('../models/Playlist');

// POST - Add a track to a specific user's playlist
router.post('/', async (req, res) => {
  const { title, spotifyTrackId, tags, userEmail } = req.body;

  if (!title || !spotifyTrackId || !tags || !userEmail) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // Find if user already has a playlist
    let user = await UserPlaylist.findOne({ userEmail });

    const newTrack = { title, spotifyTrackId, tags };

    if (user) {
      // Add to existing playlist
      user.playlist.push(newTrack);
      await user.save();
    } else {
      // Create new playlist
      user = new UserPlaylist({ userEmail, playlist: [newTrack] });
      await user.save();
    }

    res.status(201).json({ message: 'Track added to playlist!' });
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
    const user = await UserPlaylist.findOne({ userEmail: email });

    if (!user) return res.status(404).json({ message: 'No playlist found for user' });

    res.status(200).json(user.playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

module.exports = router;
