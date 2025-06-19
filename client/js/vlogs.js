// client/js/vlogs.js

const vlogContainer = document.getElementById('vlogContainer');
const handle = '@yoorajung'; 

async function fetchVideos() {
  try {
    const response = await fetch(`http://localhost:5000/api/videos/${handle}`);
    const videos = await response.json();

    if (videos.length === 0) {
      vlogContainer.innerHTML = '<p>No videos found for this channel.</p>';
      return;
    }

    vlogContainer.innerHTML = ''; 

    videos.forEach(video => {
      const card = document.createElement('div');
      card.className = 'vlog-card';
      card.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
        <h3>${video.title}</h3>
      `;
      vlogContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching videos:', err);
    vlogContainer.innerHTML = '<p>Something went wrong while fetching videos.</p>';
  }
}

fetchVideos();
