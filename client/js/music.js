 async function searchMusic() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
      alert("Please type something!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/music/${encodeURIComponent(query)}`);
      const data = await res.json();

      const grid = document.querySelector('.music-grid');
      grid.innerHTML = '';

      if (data.length === 0) {
        grid.innerHTML = '<p>No results found.</p>';
        return;
      }

      data.forEach(track => {
        const div = document.createElement('div');
        div.className = 'music-card';
        div.innerHTML = `
          <iframe src="https://open.spotify.com/embed/track/${track.id}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <p class="track-title">${track.name}</p>
          <div class="tags">
            <span>${track.artist}</span>
          </div>
        `;
        grid.appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching music:', error);
      alert('Oops! Something went wrong.');
    }
  }

  // Optionally, you can load a default on page load:
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').value = 'study';
    searchMusic();
  });