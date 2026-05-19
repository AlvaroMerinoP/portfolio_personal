// ============================================
// INTERNATIONALIZATION (i18n)
// ============================================

const translations = {
  en: {
    // Navigation
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',

    // Hero
    'hero.comment': '// Building things that matter.',
    'hero.passion': '"Building scalable solutions"',

    // Stats
    'stats.linesOfCode': 'Lines of Code',
    'stats.coffee': 'Cups of Coffee',
    'stats.bugs': 'Bugs Fixed',
    'scroll': 'Scroll',

    // Work Section
    'work.title': 'Selected Work',
    'work.subtitle': 'Projects I\'m proud of',
    'work.viewProject': 'View Project →',
    'work.project1.desc': 'AI-powered personal finance tracker with automated categorization, budget insights, and predictive analytics',
    'work.project2.desc': 'Eco-friendly e-commerce platform featuring sustainable tech apparel with smart inventory management',
    'work.project3.desc': 'AI-powered design system generator that creates accessible, customizable component libraries',
    'work.filter.all': 'All',
    'work.filter.react': 'React',
    'work.filter.nodejs': 'Node.js',
    'work.filter.mobile': 'Mobile',

    // Skills
    'skills.title': 'Technical Skills',

    // About
    'about.title': 'About Me',
    'about.p1': '<span class="highlight-text">Telecom Engineer</span> turned Full Stack Developer, passionate about creating elegant solutions to complex problems. With expertise in web and mobile development, I focus on building products that are both beautiful and functional.',
    'about.p2': 'Currently exploring the intersection of <span class="highlight-text">network architectures</span> and modern web technologies, always learning, and contributing to open source.',
    'about.yearsExp': 'Years Experience',
    'about.projects': 'Projects Completed',
    'about.technologies': 'Technologies',
    'about.githubActivity': 'GitHub Activity',
    'about.gh.repos': 'Repositories',
    'about.gh.stars': 'Stars Earned',
    'about.gh.forks': 'Forks',

    // Testimonials
    'testimonials.title': 'What People Say',

    // Contact
    'contact.title': 'Let\'s Work Together',
    'contact.intro': 'Have a project in mind? Let\'s talk about it.',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'John Doe',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'john@example.com',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me about your project…',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending…',
    'contact.success': 'Message sent! I\'ll get back to you soon.',
    'contact.error': 'Failed to send. Please try again or email me directly.',
    'contact.errorEmpty': 'Please fill in all fields.',
    'contact.errorEmail': 'Please enter a valid email address.',
    'contact.errorRateLimit': 'Please wait a moment before sending again.',

    // Newsletter
    'newsletter.title': 'Stay Updated',
    'newsletter.desc': 'Get notified about new projects and articles.',
    'newsletter.placeholder': 'your@email.com',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.success': 'You\'re subscribed! Thank you.',
    'newsletter.error': 'Subscription failed. Please try again.',
    'newsletter.errorEmail': 'Please enter a valid email address.',

    // Footer
    'footer.crafted': 'Crafted with',
    'footer.and': 'and',
    'footer.backToTop': 'Back to top ↑',

    // Accessibility panel
    'a11y.label': 'Accessibility options',
    'a11y.title': 'Accessibility',
    'a11y.increaseFont': 'Increase Text',
    'a11y.decreaseFont': 'Decrease Text',
    'a11y.highContrast': 'High Contrast',
    'a11y.reduceMotion': 'Reduce Motion',
    'a11y.reset': 'Reset',

    // Easter Egg
    'easter.title': 'You found the secret!',
    'easter.message': 'Konami Code activated! You\'re a true developer.',
    'easter.close': 'Close'
  },

  es: {
    // Navegación
    'nav.work': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',

    // Hero
    'hero.comment': '// Construyendo cosas que importan.',
    'hero.passion': '"Construyendo soluciones escalables"',

    // Estadísticas
    'stats.linesOfCode': 'Líneas de Código',
    'stats.coffee': 'Tazas de Café',
    'stats.bugs': 'Bugs Arreglados',
    'scroll': 'Desplazar',

    // Sección de Proyectos
    'work.title': 'Proyectos Destacados',
    'work.subtitle': 'Proyectos de los que estoy orgulloso',
    'work.viewProject': 'Ver Proyecto →',
    'work.project1.desc': 'Gestor de finanzas personales con IA, categorización automática, insights presupuestarios y análisis predictivos',
    'work.project2.desc': 'Plataforma de e-commerce ecológica con ropa tecnológica sostenible y gestión inteligente de inventario',
    'work.project3.desc': 'Generador de sistemas de diseño potenciado por IA que crea librerías de componentes accesibles y personalizables',
    'work.filter.all': 'Todos',
    'work.filter.react': 'React',
    'work.filter.nodejs': 'Node.js',
    'work.filter.mobile': 'Móvil',

    // Habilidades
    'skills.title': 'Habilidades Técnicas',

    // Sobre mí
    'about.title': 'Sobre Mí',
    'about.p1': '<span class="highlight-text">Ingeniero de Telecomunicaciones</span> convertido en Desarrollador Full Stack, apasionado por crear soluciones elegantes a problemas complejos. Con experiencia en desarrollo web y móvil, me enfoco en construir productos que sean tanto hermosos como funcionales.',
    'about.p2': 'Actualmente explorando la intersección entre <span class="highlight-text">arquitecturas de red</span> y tecnologías web modernas, siempre aprendiendo y contribuyendo al código abierto.',
    'about.yearsExp': 'Años de Experiencia',
    'about.projects': 'Proyectos Completados',
    'about.technologies': 'Tecnologías',
    'about.githubActivity': 'Actividad en GitHub',
    'about.gh.repos': 'Repositorios',
    'about.gh.stars': 'Estrellas',
    'about.gh.forks': 'Forks',

    // Testimonios
    'testimonials.title': 'Lo Que Dicen',

    // Contacto
    'contact.title': 'Trabajemos Juntos',
    'contact.intro': '¿Tienes un proyecto en mente? Hablemos de ello.',
    'contact.name': 'Nombre',
    'contact.namePlaceholder': 'Juan García',
    'contact.email': 'Correo',
    'contact.emailPlaceholder': 'juan@ejemplo.com',
    'contact.message': 'Mensaje',
    'contact.messagePlaceholder': 'Cuéntame sobre tu proyecto…',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando…',
    'contact.success': '¡Mensaje enviado! Te responderé pronto.',
    'contact.error': 'Error al enviar. Inténtalo de nuevo o escríbeme directamente.',
    'contact.errorEmpty': 'Por favor, rellena todos los campos.',
    'contact.errorEmail': 'Por favor, introduce un correo electrónico válido.',
    'contact.errorRateLimit': 'Espera un momento antes de enviar de nuevo.',

    // Newsletter
    'newsletter.title': 'Mantente al Día',
    'newsletter.desc': 'Recibe novedades sobre nuevos proyectos y artículos.',
    'newsletter.placeholder': 'tu@correo.com',
    'newsletter.subscribe': 'Suscribirse',
    'newsletter.success': '¡Suscripción completada! Gracias.',
    'newsletter.error': 'Error en la suscripción. Inténtalo de nuevo.',
    'newsletter.errorEmail': 'Por favor, introduce un correo electrónico válido.',

    // Footer
    'footer.crafted': 'Hecho con',
    'footer.and': 'y',
    'footer.backToTop': 'Volver arriba ↑',

    // Panel de accesibilidad
    'a11y.label': 'Opciones de accesibilidad',
    'a11y.title': 'Accesibilidad',
    'a11y.increaseFont': 'Aumentar Texto',
    'a11y.decreaseFont': 'Reducir Texto',
    'a11y.highContrast': 'Alto Contraste',
    'a11y.reduceMotion': 'Reducir Movimiento',
    'a11y.reset': 'Restablecer',

    // Easter Egg
    'easter.title': '¡Encontraste el secreto!',
    'easter.message': '¡Código Konami activado! Eres un verdadero desarrollador.',
    'easter.close': 'Cerrar'
  }
};

// Current language
let currentLang = localStorage.getItem('preferredLang') || 'en';

// Translate function — exposed globally so main.js can use it
const translate = (key) => {
  return (translations[currentLang] && translations[currentLang][key]) || key;
};
window.translate = translate;

// Update all translatable elements
const updateTranslations = () => {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translate(key);

    // Only use innerHTML for known safe HTML (translations with markup)
    if (translation.includes('<span')) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = translate(key);
  });

  // Update aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', translate(key));
  });

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.setAttribute('data-lang', currentLang);
};

// Language switcher
const initLanguageSwitcher = () => {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');

      if (lang === currentLang) return;

      currentLang = lang;
      localStorage.setItem('preferredLang', lang);

      // Update active state + aria-pressed
      langButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Update translations
      updateTranslations();

      // Fire custom event so main.js can re-render dynamic content
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));

      // Track language change
      if (window.plausible) {
        plausible('Language Change', { props: { language: lang } });
      }
    });
  });

  // Set initial active state
  const activeBtn = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  updateTranslations();
  initLanguageSwitcher();
});