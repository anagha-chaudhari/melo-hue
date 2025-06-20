document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // .. Signup
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;

      try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
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

  // .. Login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
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
});
