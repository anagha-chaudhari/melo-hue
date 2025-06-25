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
    const logoutEl = document.getElementById('logout-btn');
    if (logoutEl) logoutEl.style.display = 'none';
  } else {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) loginBtn.style.display = 'none';
  }