document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const nav = document.querySelector('.nav');
  const toggleBtn = document.querySelector('#nav-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
    // Close nav when a link is clicked (good for mobile)
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A') {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Load projects from JSON
  fetch('data/projects.json')
    .then((r) => r.json())
    .then((projects) => {
      const projectsContainer = document.querySelector('.projects');
      if (!projectsContainer) return;
      // build a vertical viewport with scroll-snap
      const viewport = document.createElement('div');
      viewport.className = 'projects-viewport';
      const grid = document.createElement('div');
      grid.className = 'projects-grid';

      grid.innerHTML = projects
        .map((p) => `
          <a class="project-link" href="${p.id}.html">
            <article class="project-card" tabindex="0">
              <img src="${p.image}" alt="${p.title} screenshot" />
              <div class="project-overlay">
                <h4>${p.title}</h4>
                <p>${p.description}</p>
                <p style="margin-top:8px;"><a href="${p.demo}" style="color:inherit; text-decoration:underline;">Demo</a> · <a href="${p.repo}" style="color:inherit; text-decoration:underline;">Repo</a></p>
              </div>
            </article>
          </a>
        `)
        .join('');

      viewport.appendChild(grid);
      // clear existing and append viewport
      projectsContainer.innerHTML = '';
      projectsContainer.appendChild(viewport);
    })
    .catch((err) => console.error('Failed to load projects.json', err));

  // Mailto form handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const form = e.currentTarget;
      const name = encodeURIComponent(form.name.value || '');
      const email = encodeURIComponent(form.email.value || '');
      const message = encodeURIComponent(form.message.value || '');
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
      const mailto = `mailto:alvaromerinopuerta@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    });
  }
  // theme removed: grayscale UI handled by CSS
});
