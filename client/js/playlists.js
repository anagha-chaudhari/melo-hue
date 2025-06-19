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
