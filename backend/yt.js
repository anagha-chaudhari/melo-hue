require('dotenv').config();
const fetch = require('node-fetch');

const getChannelIdFromHandle = async (handle) => {
  const query = handle.replace('@', ''); 
  const apiKey = process.env.yt_api_key;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    return data.items[0].snippet.channelId;
  } else {
    return null;
  }
};

const getVideosByChannelId = async (channelId) => {
  const apiKey = process.env.yt_api_key;

  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.items) {
    return data.items.map(video => ({
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      publishedAt: video.snippet.publishedAt,
      videoId: video.id.videoId,
    }));
  } else {
    return [];
  }
};

module.exports = {
  getChannelIdFromHandle,
  getVideosByChannelId
};
