let vlogContainer = document.getElementById('vlogContainer');

function openCreatorPopup() {
  document.getElementById('creatorPopup').style.display = 'flex';
}

function closeCreatorPopup() {
  document.getElementById('creatorPopup').style.display = 'none';
}

async function submitCreator() {
  const input = document.getElementById('creatorHandle').value.trim();
  if (!input) return alert('Please enter a handle');

  closeCreatorPopup();
  document.getElementById('openVlogWrapper').style.display = 'none'; // hide the trigger image

  await fetchVideos(input);
}

async function fetchVideos(handle) {
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
