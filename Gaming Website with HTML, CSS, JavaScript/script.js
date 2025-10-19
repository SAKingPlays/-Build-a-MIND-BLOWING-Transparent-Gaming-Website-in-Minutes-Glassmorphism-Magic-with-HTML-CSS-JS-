document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Hide preloader
  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 800);
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Modal functionality
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');
  const settingsModal = document.getElementById('settings-modal');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const closes = document.querySelectorAll('.close');

  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.style.display = 'block';
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      registerModal.style.display = 'block';
    });
  }

  closes.forEach(close => {
    close.addEventListener('click', () => {
      loginModal.style.display = 'none';
      registerModal.style.display = 'none';
      settingsModal.style.display = 'none';
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === registerModal) registerModal.style.display = 'none';
    if (e.target === settingsModal) settingsModal.style.display = 'none';
  });

  // Demo form submission
  document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Form submitted (demo)');
    });
  });

  // Neural canvas animation
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 30;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.7)';
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 213, 232, ${1 - dist / 100})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Advanced Features: Theme Toggle (Dark Mode Example)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('light-mode'); // Assume light-mode CSS class exists; add if needed
    });
  }

  // Save Settings Demo
  const saveSettings = document.getElementById('save-settings');
  if (saveSettings) {
    saveSettings.addEventListener('click', () => {
      alert('Settings saved (demo)');
      settingsModal.style.display = 'none';
    });
  }

  // Add a settings button to header for demo
  const settingsBtn = document.createElement('a');
  settingsBtn.href = '#';
  settingsBtn.textContent = 'Settings';
  settingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    settingsModal.style.display = 'block';
  });
  nav.appendChild(settingsBtn);
});