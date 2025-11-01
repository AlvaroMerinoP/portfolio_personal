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
    'hero.comment': '// This is just a test page.',
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
    
    // Contact
    'contact.title': 'Let\'s Work Together',
    'contact.intro': 'Have a project in mind? Let\'s talk about it.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.crafted': 'Crafted with',
    'footer.and': 'and',
    'footer.backToTop': 'Back to top ↑',
    
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
    'hero.comment': '// Bienvenido a mi portfolio',
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
    
    // Contacto
    'contact.title': 'Trabajemos Juntos',
    'contact.intro': '¿Tienes un proyecto en mente? Hablemos de ello.',
    'contact.name': 'Nombre',
    'contact.email': 'Correo',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    
    // Footer
    'footer.crafted': 'Hecho con',
    'footer.and': 'y',
    'footer.backToTop': 'Volver arriba ↑',
    
    // Easter Egg
    'easter.title': '¡Encontraste el secreto!',
    'easter.message': '¡Código Konami activado! Eres un verdadero desarrollador.',
    'easter.close': 'Cerrar'
  }
};

// Current language
let currentLang = localStorage.getItem('preferredLang') || 'en';

// Translate function
const translate = (key) => {
  return translations[currentLang][key] || key;
};

// Update all translatable elements
const updateTranslations = () => {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translate(key);
    
    // Check if translation contains HTML
    if (translation.includes('<')) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
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
      
      // Update active state
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update translations
      updateTranslations();
      
      // Track language change
      if (window.plausible) {
        plausible('Language Change', { props: { language: lang } });
      }
    });
  });
  
  // Set initial active state
  document.querySelector(`.lang-btn[data-lang="${currentLang}"]`)?.classList.add('active');
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  updateTranslations();
  initLanguageSwitcher();
});