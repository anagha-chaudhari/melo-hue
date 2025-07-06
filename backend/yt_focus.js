const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();

router.get('/study-videos', async (req, res) => {
  const query = 'study with me 3 hours';
  const maxResults = 5;

  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${process.env.yt_api_key}&maxResults=${maxResults}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const videos = data.items.map(item => ({
      title: item.snippet.title,
      youtubeId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

    res.json(videos);
  } catch (error) {
    console.error('Error fetching study videos:', error);
    res.status(500).json({ error: 'Failed to fetch study videos' });
  }
});

module.exports = router;
