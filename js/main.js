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
      const grid = document.querySelector('.projects-grid');
      if (!grid) return;
      grid.innerHTML = projects
        .map((p) => `
          <article class="project-card">
            <img src="${p.image}" alt="${p.title} screenshot" />
            <h4>${p.title}</h4>
            <p>${p.description} <a href="${p.demo}">Demo</a> · <a href="${p.repo}">Repo</a></p>
          </article>
        `)
        .join('');
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
});
