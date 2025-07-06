document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

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
          alert('Signup successful!');
          window.location.href = 'login.html';
        } else {
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong!');
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
          localStorage.setItem('userEmail', email); // changed from data.email to email
          alert(`Welcome, ${data.user}!`);
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong!');
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('userEmail');
      alert('Logged out successfully!');
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
