let timer;
let totalSeconds = 1500; 
let isRunning = false;

function updateDisplay() {
  const min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const sec = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${min}:${sec}`;
}

function startFocus() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("Focus session complete! ✨");
    }
  }, 1000);
}

function pauseFocus() {
  clearInterval(timer);
  isRunning = false;
}

function resetFocus() {
  pauseFocus();
  totalSeconds = 1500;
  updateDisplay();
}

document.addEventListener('DOMContentLoaded', async () => {
  updateDisplay();
  try {
    const res = await fetch('http://localhost:5000/api/focus/study-videos');
    const videos = await res.json();
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const player = document.getElementById('youtubePlayer');
    player.src = `https://www.youtube.com/embed/${randomVideo.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${randomVideo.youtubeId}`;
  } catch (err) {
    console.error("Failed to load background video:", err);
  }
});

function makeDraggable(el, handle) {
  let isDragging = false;
  let offsetX, offsetY;

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const windowBox = document.querySelector('.focus-window');
  const dragHandle = document.querySelector('.focus-window-header');
  makeDraggable(windowBox, dragHandle);
});
