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
      const name = form.name.value || '';
      const email = form.email.value || '';
      const message = form.message.value || '';

      const statusElExisting = form.querySelector('.form-status');
      if (statusElExisting) statusElExisting.remove();
      const statusEl = document.createElement('div');
      statusEl.className = 'form-status';
      form.appendChild(statusEl);

      const endpoint = form.getAttribute('data-form-endpoint');
      if (endpoint) {
        // Send to Formspree (expects form data or JSON)
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
          .then((res) => {
            if (res.ok) return res.json().catch(() => ({}));
            throw new Error('Form submission failed');
          })
          .then(() => {
            statusEl.textContent = 'Mensaje enviado. Gracias!';
            statusEl.classList.add('success');
            form.reset();
          })
          .catch((err) => {
            console.error('Formspree error', err);
            statusEl.textContent = 'Error enviando el formulario. Se abrirá tu cliente de correo.';
            statusEl.classList.add('error');
            // fallback to mailto
            setTimeout(() => submitMailto(name, email, message), 900);
          });
      } else {
        // No endpoint configured -> fallback to mailto
        submitMailto(name, email, message);
      }
    });
  }

  function submitMailto(name, email, message) {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
    const mailto = `mailto:alvaromerinopuerta@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  }

  // --- New: About card modal logic ---
  const aboutLink = document.querySelector('.nav a[href="#about"]');
  const aboutModal = document.getElementById('about-card-modal');
  const aboutDesc = document.getElementById('about-card-desc');
  const aboutText = document.getElementById('about-text');
  const aboutClose = document.querySelector('.about-card-close');

  function showAboutCard() {
    if (!aboutModal) return;
    // populate description from the #about text (trim to reasonable length)
    const text = aboutText ? aboutText.textContent.trim() : '';
    aboutDesc.textContent = text;
    aboutModal.setAttribute('aria-hidden', 'false');
    // focus the close button for accessibility
    setTimeout(() => { aboutClose && aboutClose.focus(); }, 100);
  }

  function hideAboutCard() {
    if (!aboutModal) return;
    aboutModal.setAttribute('aria-hidden', 'true');
    // return focus to About link
    aboutLink && aboutLink.focus();
  }

  if (aboutLink) {
    aboutLink.addEventListener('click', function (e) {
      // show modal and smooth-scroll to section
      e.preventDefault();
      const target = document.getElementById('about');
      target && target.scrollIntoView({ behavior: 'smooth' });
      showAboutCard();
    });
  }

  if (aboutClose) {
    aboutClose.addEventListener('click', hideAboutCard);
  }

  // Close when clicking outside the card content
  if (aboutModal) {
    aboutModal.addEventListener('click', function (e) {
      if (e.target === aboutModal) hideAboutCard();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const isOpen = aboutModal && aboutModal.getAttribute('aria-hidden') === 'false';
      if (isOpen) hideAboutCard();
    }
  });
  // --- End About card modal logic ---

});
