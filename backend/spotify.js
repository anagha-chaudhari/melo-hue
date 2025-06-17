// backend/spotify.js
const fetch = require('node-fetch');
require('dotenv').config();

let token = null;

async function getAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.spotify_client_id + ':' + process.env.spotify_client_secret
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  token = data.access_token;
  return token;
}

async function searchTrack(query) {
  if (!token) {
    await getAccessToken();
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=6`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data.tracks.items; // <-- return array of tracks
}

module.exports = { searchTrack };
