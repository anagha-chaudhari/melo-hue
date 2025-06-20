document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('playlistGrid');

  try {
    const res = await fetch('./js/playlists.json');
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
    container.innerHTML = '<p>Unable to load playlist 😔</p>';
    console.error('Error loading playlist:', err);
  }
});

function openPopup() {
  document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
}

// Handle form submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addTrackForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const spotifyTrackId = document.getElementById('spotifyTrackId').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    try {
      const res = await fetch('http://localhost:5000/api/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, spotifyTrackId, tags })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Added to your playlist!');
        closePopup();
        // Inject new card instantly
        const card = document.createElement('div');
        card.className = 'playlist-card';
        card.innerHTML = `
          <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        `;
        document.getElementById('playlistGrid').appendChild(card);
      } else {
        alert(data.error || 'Failed to add');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  });
});
