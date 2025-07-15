 function showMeloToast(message = "Something happened!", duration = 4000) {
  let container = document.querySelector('.melo-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'melo-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'melo-toast';

  const icon = document.createElement('img');
  icon.src = 'images/autumn.png'; 
  icon.alt = 'icon';
  icon.className = 'toast-icon';

  const msg = document.createElement('span');
  msg.innerText = message;

  toast.appendChild(icon);
  toast.appendChild(msg);
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    if (container.children.length === 0) container.remove();
  }, duration);
}

async function searchMusic() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
      showMeloToast("Please type something!");
      return;
    }

    try {
      const res = await fetch(`https://melo-hue.onrender.com/api/music/${encodeURIComponent(query)}`);
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
      showMeloToast('Oops! Something went wrong.');
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').value = 'study';
    searchMusic();
  });