const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  spotifyTrackId: { type: String, required: true },
  tags: [String],
  addedAt: { type: Date, default: Date.now },
});

const userPlaylistSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  playlist: [trackSchema],
});

module.exports = mongoose.model('UserPlaylist', userPlaylistSchema);
