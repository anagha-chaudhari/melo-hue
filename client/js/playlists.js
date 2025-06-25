document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('playlistGrid');
  const userEmail = localStorage.getItem('userEmail');

  if (!userEmail) {
    container.innerHTML = '<p>Please log in to view your playlist.</p>';
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/playlist?email=${userEmail}`);
    const data = await res.json();

    data.forEach(track => {
      const card = document.createElement('div');
      card.className = 'playlist-card';

      card.innerHTML = `
        <iframe style="border-radius:12px" 
          src="https://open.spotify.com/embed/track/${track.spotifyTrackId}?utm_source=generator" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
        <h3>${track.title}</h3>
        <p class="tags">${track.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p>Unable to load playlist..</p>';
    console.error('Error loading playlist:', err);
  }
});

// Open popup
function openPopup() {
  document.getElementById('popupOverlay').style.display = 'flex';
}

// Close popup
function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
}

// Add new track to playlist
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addTrackForm');
  const userEmail = localStorage.getItem('userEmail');
  if (!form || !userEmail) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const spotifyTrackId = document.getElementById('spotifyTrackId').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const userEmail = localStorage.getItem('userEmail');

    try {
      const res = await fetch('http://localhost:5000/api/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, spotifyTrackId, tags, userEmail })  
      });

      const data = await res.json();
      if (res.ok) {
        alert('Added to your playlist!');
        closePopup();

        // Inject new card instantly
        const card = document.createElement('div');
        card.className = 'playlist-card';
        card.innerHTML = `
          <iframe style="border-radius:12px" 
            src="https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
          <h3>${title}</h3>
          <p class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</p>
        `;
        document.getElementById('playlistGrid').appendChild(card);

        // Clear form
        form.reset();
      } else {
        alert(data.error || 'Failed to add');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  });
});
