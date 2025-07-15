document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

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



  // Signup
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;

      try {
        const res = await fetch('https://melo-hue.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password })
        });

        const data = await res.json();
        if (res.ok) {
          showMeloToast('Signup successful!');
          window.location.href = 'login.html';
        } else {
          showMeloToast(data.message || 'Signup failed');
        }
      } catch (err) {
        console.error(err);
        showMeloToast('Something went wrong!');
      }
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      try {
        const res = await fetch('https://melo-hue.onrender.com/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
          // Store email
          localStorage.setItem('userEmail', email);
          showMeloToast(`Welcome, ${data.user}!`);
          window.location.href = 'index.html';
        } else {
          showMeloToast(data.message || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        showMeloToast('Something went wrong!');
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('userEmail');
      showMeloToast('Logged out successfully!');
      window.location.href = 'login.html';
    });
  }

  // Navbar visibility
  const isLoggedIn = localStorage.getItem('userEmail');
  if (!isLoggedIn) {
    const logoutEl = document.getElementById('logoutBtn');
    if (logoutEl) logoutEl.style.display = 'none';
  } else {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) loginBtn.style.display = 'none';
  }
});
