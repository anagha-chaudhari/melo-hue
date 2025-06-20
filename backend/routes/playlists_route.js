const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../../client/js/playlists.json');

router.post('/', (req, res) => {
  const { title, spotifyTrackId, tags } = req.body;
  if (!title || !spotifyTrackId || !tags) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const newEntry = { title, spotifyTrackId, tags };
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read file' });

    const json = JSON.parse(data);
    json.push(newEntry);

    fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Could not write file' });
      res.status(200).json({ message: 'Track added!' });
    });
  });
});

module.exports = router;
