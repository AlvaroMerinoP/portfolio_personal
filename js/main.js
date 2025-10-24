// ============================================
// SECURITY & UTILITIES
// ============================================
const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

// ============================================
// ACCESSIBILITY FEATURES
// ============================================
const initAccessibility = () => {
  const toggle = document.getElementById('accessibility-toggle');
  const panel = document.getElementById('accessibility-panel');
  const menu = document.getElementById('accessibility-menu');
  
  if (!toggle || !panel) return;
  
  // Toggle panel
  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', !isOpen);
    
    if (!isOpen && window.plausible) {
      plausible('Accessibility Menu Opened');
    }
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Font size controls
  let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;
  document.documentElement.style.fontSize = `${fontSize}px`;
  
  document.getElementById('increase-font')?.addEventListener('click', () => {
    if (fontSize < 20) {
      fontSize += 2;
      document.documentElement.style.fontSize = `${fontSize}px`;
      localStorage.setItem('fontSize', fontSize);
      if (window.plausible) plausible('Accessibility', { props: { action: 'Increase Font' } });
    }
  });
  
  document.getElementById('decrease-font')?.addEventListener('click', () => {
    if (fontSize > 12) {
      fontSize -= 2;
      document.documentElement.style.fontSize = `${fontSize}px`;
      localStorage.setItem('fontSize', fontSize);
      if (window.plausible) plausible('Accessibility', { props: { action: 'Decrease Font' } });
    }
  });
  
  // High contrast mode
  const highContrast = localStorage.getItem('highContrast') === 'true';
  if (highContrast) document.body.classList.add('high-contrast');
  
  document.getElementById('high-contrast')?.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    const isActive = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isActive);
    if (window.plausible) plausible('Accessibility', { props: { action: 'High Contrast', value: isActive } });
  });
  
  // Reduce motion
  const reduceMotion = localStorage.getItem('reduceMotion') === 'true';
  if (reduceMotion) document.body.classList.add('reduce-motion');
  
  document.getElementById('reduce-motion')?.addEventListener('click', () => {
    document.body.classList.toggle('reduce-motion');
    const isActive = document.body.classList.contains('reduce-motion');
    localStorage.setItem('reduceMotion', isActive);
    if (window.plausible) plausible('Accessibility', { props: { action: 'Reduce Motion', value: isActive } });
  });
  
  // Reset all
  document.getElementById('reset-accessibility')?.addEventListener('click', () => {
    fontSize = 16;
    document.documentElement.style.fontSize = '16px';
    document.body.classList.remove('high-contrast', 'reduce-motion');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('reduceMotion');
    if (window.plausible) plausible('Accessibility', { props: { action: 'Reset' } });
  });
};

// ============================================
// CUSTOM CURSOR
// ============================================
const initCustomCursor = () => {
  // Skip on mobile or if reduce-motion is enabled
  if (window.matchMedia('(max-width: 768px)').matches || 
      localStorage.getItem('reduceMotion') === 'true') return;
  
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  const animate = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    
    requestAnimationFrame(animate);
  };
  animate();
  
  const interactiveElements = document.querySelectorAll('a, button, [data-tooltip]');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorDot.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorDot.classList.remove('cursor-hover');
    });
  });
};

// ============================================
// PARTICLE CANVAS BACKGROUND
// ============================================
const initParticles = () => {
  if (localStorage.getItem('reduceMotion') === 'true') return;
  
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
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
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
    }
  }
  
  const createParticles = () => {
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };
  
  const connectParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };
  
  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
  };
  
  createParticles();
  animateParticles();
};

// ============================================
// TYPING EFFECT
// ============================================
const initTypingEffect = () => {
  if (localStorage.getItem('reduceMotion') === 'true') {
    document.querySelectorAll('.typing-effect').forEach(el => {
      el.textContent = el.getAttribute('data-text');
    });
    return;
  }
  
  const elements = document.querySelectorAll('.typing-effect');
  
  elements.forEach((el, index) => {
    const text = el.getAttribute('data-text');
    el.textContent = '';
    
    let charIndex = 0;
    const speed = 100;
    const delay = index * 500;
    
    setTimeout(() => {
      const typeChar = () => {
        if (charIndex < text.length) {
          el.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, speed);
        }
      };
      typeChar();
    }, delay);
  });
};

// ============================================
// TERMINAL COMMANDS
// ============================================
const initTerminal = () => {
  const terminal = document.getElementById('terminal');
  if (!terminal) return;
  
  const commands = [
    { cmd: 'whoami', output: 'Alvaro Merino - Full Stack Developer' },
    { cmd: 'cat about.txt', output: 'Telecom Engineer | Passionate Coder | Problem Solver' },
    { cmd: 'ls projects/', output: 'expense-tracker/  e-commerce/  design-system/' },
    { cmd: 'git status', output: 'On branch main. Nothing to commit, working tree clean.' }
  ];
  
  let currentCmd = 1;
  
  setInterval(() => {
    if (currentCmd >= commands.length) currentCmd = 0;
    
    const terminalBody = terminal.querySelector('.terminal-body');
    const lastLine = terminalBody.querySelector('.terminal-line:last-child');
    
    const newOutput = document.createElement('div');
    newOutput.className = 'terminal-output';
    newOutput.innerHTML = `<span class="output-text">${commands[currentCmd].output}</span>`;
    terminalBody.insertBefore(newOutput, lastLine);
    
    const newLine = document.createElement('div');
    newLine.className = 'terminal-line';
    newLine.innerHTML = `<span class="prompt">$</span><span class="command">${commands[(currentCmd + 1) % commands.length].cmd}</span>`;
    terminalBody.insertBefore(newLine, lastLine);
    
    const lines = terminalBody.querySelectorAll('.terminal-line, .terminal-output');
    if (lines.length > 8) {
      lines[0].remove();
      lines[1].remove();
    }
    
    currentCmd++;
  }, 4000);
};

// ============================================
// COUNTER ANIMATION
// ============================================
const animateCounters = () => {
  const counters = document.querySelectorAll('[data-count], [data-counter]');
  
  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.textContent = end.toLocaleString() + (end > 1000 ? '+' : '');
      }
    };
    window.requestAnimationFrame(step);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count') || entry.target.getAttribute('data-counter'));
        animateValue(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
};

// ============================================
// SKILL BARS ANIMATION
// ============================================
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => observer.observe(bar));
};

// ============================================
// GITHUB API STATS
// ============================================
const fetchGitHubStats = async () => {
  const username = 'AlvaroMerinoP';
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    
    const reposEl = document.getElementById('gh-repos');
    if (reposEl) reposEl.textContent = data.public_repos || '--';
    
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await reposResponse.json();
    
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    const starsEl = document.getElementById('gh-stars');
    const forksEl = document.getElementById('gh-forks');
    if (starsEl) starsEl.textContent = totalStars;
    if (forksEl) forksEl.textContent = totalForks;
  } catch (error) {
    console.error('GitHub API error:', error);
  }
};

// ============================================
// TOOLTIPS
// ============================================
const initTooltips = () => {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const tooltipText = el.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      document.body.appendChild(tooltip);
      
      const rect = el.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 10}px`;
      
      setTimeout(() => tooltip.classList.add('show'), 10);
      
      el.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
        setTimeout(() => tooltip.remove(), 300);
      }, { once: true });
    });
  });
};

// ============================================
// KONAMI CODE EASTER EGG
// ============================================
const initKonamiCode = () => {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        showEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  const showEasterEgg = () => {
    const modal = document.getElementById('easter-egg-modal');
    if (!modal) return;
    
    modal.classList.add('show');
    document.body.classList.add('matrix-mode');
    
    if (window.plausible) {
      plausible('Easter Egg', { props: { type: 'Konami Code' } });
    }
    
    modal.querySelector('.close-easter-egg')?.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.classList.remove('matrix-mode');
    }, { once: true });
  };
};

// ============================================
// EXISTING FUNCTIONS
// ============================================
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
  );

  document.querySelectorAll('.work-item').forEach((el) => observer.observe(el));
};

const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
};

let lastScroll = 0;
const navHideShow = () => {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      nav.style.transform = 'translateY(0)';
      return;
    }
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });
};

let lastSubmitTime = 0;
const RATE_LIMIT = 3000;

// ============================================
// FORMSPREE INTEGRATION
// ============================================
const handleContactForm = () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT) {
      status.textContent = 'Please wait a moment before submitting again.';
      status.className = 'form-status error';
      return;
    }
    lastSubmitTime = now;
    
    const name = sanitizeHTML(form.name.value.trim());
    const email = sanitizeHTML(form.email.value.trim());
    const message = sanitizeHTML(form.message.value.trim());
    
    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.className = 'form-status error';
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      status.className = 'form-status error';
      return;
    }
    
    // Check if using Formspree or mailto
    const action = form.getAttribute('action');
    
    if (action && action.includes('formspree.io')) {
      // Formspree submission
      try {
        status.textContent = 'Sending...';
        status.className = 'form-status';
        
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          status.textContent = 'Message sent successfully!';
          status.className = 'form-status success';
          form.reset();
          
          if (window.plausible) {
            plausible('Form Submission', { props: { method: 'Formspree' } });
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        status.textContent = 'Failed to send message. Please try again.';
        status.className = 'form-status error';
      }
    } else {
      // Mailto fallback
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailto = `mailto:alvaromerinopuerta@gmail.com?subject=${subject}&body=${body}`;
      
      status.textContent = 'Opening your email client...';
      status.className = 'form-status success';
      
      setTimeout(() => {
        window.location.href = mailto;
        form.reset();
        
        if (window.plausible) {
          plausible('Form Submission', { props: { method: 'Mailto' } });
        }
      }, 500);
    }
  });
};

const mobileNav = () => {
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav-links');
  
  if (!toggle || !links) return;
  
  toggle.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);
  });
  
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.style.display = 'none';
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
};

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Accessibility first
  initAccessibility();
  
  // Visual effects
  initCustomCursor();
  initParticles();
  initTypingEffect();
  initTooltips();
  
  // Terminal & stats
  initTerminal();
  animateCounters();
  animateSkillBars();
  fetchGitHubStats();
  
  // Easter eggs
  initKonamiCode();
  
  // Core functionality
  observeElements();
  smoothScroll();
  navHideShow();
  handleContactForm();
  mobileNav();
  
  console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; color: #00ff88; font-weight: bold;');
  console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 14px; color: #ffaa00;');
});

