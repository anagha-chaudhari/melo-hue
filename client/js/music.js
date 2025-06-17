async function loadMusic() {
    const res = await fetch('http://localhost:5000/api/music/study+vibes');
    const data = await res.json();

    const grid = document.querySelector('.music-grid');
    grid.innerHTML = '';

    data.forEach(track => {
      const div = document.createElement('div');
      div.className = 'music-card';
      div.innerHTML = `
        <iframe src="https://open.spotify.com/embed/track/${track.id}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <p class="track-title">${track.name}</p>
        <div class="tags">
          <span>${track.artist}</span><span>${track.album}</span>
        </div>
      `;
      grid.appendChild(div);
    });
  }

  loadMusic();