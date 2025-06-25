const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  spotifyTrackId: { type: String, required: true },
  tags: [String],
  userEmail: { type: String, required: true }, 
});

module.exports = mongoose.model('Playlist', playlistSchema);
