require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const cors = require('cors');
const { getChannelIdFromHandle, getVideosByChannelId } = require('./yt');
const { searchTrack } = require('./spotify');
const focusRoutes = require('./yt_focus'); 
const authRoutes = require('./routes/auth_route');
const playlistRoutes = require('./routes/playlists_route');
const msgRoutes = require('./routes/msg_route');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Get channel ID from @handle
app.get('/api/channel/:handle', async (req, res) => {
  const handle = req.params.handle;

  try {
    const channelId = await getChannelIdFromHandle(handle);
    if (!channelId) return res.status(404).json({ error: 'Channel not found' });

    res.json({ channelId });
  } catch (error) {
    console.error('Channel Fetch Error:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

//  Get videos from channel
app.get('/api/videos/:handle', async (req, res) => {
  try {
    const handle = req.params.handle;
    const channelId = await getChannelIdFromHandle(handle);
    if (!channelId) return res.status(404).json({ error: 'Channel not found' });

    const videos = await getVideosByChannelId(channelId);
    res.json(videos);
  } catch (err) {
    console.error('Video Fetch Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/music/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const tracks = await searchTrack(query);

    if (!tracks || tracks.length === 0) {
      return res.status(404).json({ error: 'No tracks found' });
    }

    // Map needed fields for frontend
    const formatted = tracks.map(track => ({
      name: track.name,
      artist: track.artists[0]?.name,
      url: track.external_urls.spotify,
      preview: track.preview_url,
      album: track.album.name,
      image: track.album.images[0]?.url || '',
      id: track.id
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

app.use('/api/focus', focusRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/playlist', playlistRoutes);

app.use('/api/message', msgRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}).catch((err) => {
  console.error('DB connection failed:', err);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
