/* ==========================================================================
   SAMTAWAD POLICY & TERMS - JAVASCRIPT CONTROLLER
   Dark Mode, Language Switcher, Search, Scrollspy, Account Deletion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initTabs();
  initScrollSpy();
  initSearch();
  initAccountDeletionHelper();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('samtawad_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('samtawad_theme', newTheme);
    });
  }

  // Listen to system changes if no explicit user preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('samtawad_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon && themeLabel) {
      if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeLabel.textContent = document.documentElement.lang === 'hi' ? 'लाइट' : 'Light';
      } else {
        themeIcon.textContent = '🌙';
        themeLabel.textContent = document.documentElement.lang === 'hi' ? 'डार्क' : 'Dark';
      }
    }
  }
}

/* --------------------------------------------------------------------------
   2. Language Switcher (English / हिन्दी)
   -------------------------------------------------------------------------- */
function initLanguage() {
  const langToggleBtn = document.getElementById('langToggle');
  const savedLang = localStorage.getItem('samtawad_lang') || 'en';

  applyLanguage(savedLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      const nextLang = currentLang === 'en' ? 'hi' : 'en';
      applyLanguage(nextLang);
      localStorage.setItem('samtawad_lang', nextLang);
    });
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);

    const enElements = document.querySelectorAll('.lang-en');
    const hiElements = document.querySelectorAll('.lang-hi');
    const langBtnText = document.getElementById('langLabel');

    if (lang === 'hi') {
      enElements.forEach(el => el.style.display = 'none');
      hiElements.forEach(el => el.style.display = '');
      if (langBtnText) langBtnText.textContent = 'English';
    } else {
      enElements.forEach(el => el.style.display = '');
      hiElements.forEach(el => el.style.display = 'none');
      if (langBtnText) langBtnText.textContent = 'हिन्दी';
    }

    // Refresh theme button label for current language
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const themeLabel = document.getElementById('themeLabel');
    if (themeLabel) {
      themeLabel.textContent = currentTheme === 'dark'
        ? (lang === 'hi' ? 'लाइट' : 'Light')
        : (lang === 'hi' ? 'डार्क' : 'Dark');
    }
  }
}

/* --------------------------------------------------------------------------
   3. Tabs Navigation (Privacy Policy vs Terms of Service)
   -------------------------------------------------------------------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const privacySection = document.getElementById('policy-content');
  const termsSection = document.getElementById('terms-content');

  function switchTab(targetTab) {
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === targetTab;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    if (targetTab === 'terms') {
      if (privacySection) privacySection.style.display = 'none';
      if (termsSection) termsSection.style.display = 'block';
      updateTOC('terms');
    } else {
      if (privacySection) privacySection.style.display = 'block';
      if (termsSection) termsSection.style.display = 'none';
      updateTOC('privacy');
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
      history.replaceState(null, '', `#${tab}`);
    });
  });

  // Handle URL hash on load
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('term')) {
    switchTab('terms');
  } else {
    switchTab('privacy');
  }
}

function updateTOC(mode) {
  const privacyLinks = document.querySelectorAll('.toc-link[data-section="privacy"]');
  const termsLinks = document.querySelectorAll('.toc-link[data-section="terms"]');

  if (mode === 'terms') {
    privacyLinks.forEach(el => el.parentElement.style.display = 'none');
    termsLinks.forEach(el => el.parentElement.style.display = 'block');
  } else {
    privacyLinks.forEach(el => el.parentElement.style.display = 'block');
    termsLinks.forEach(el => el.parentElement.style.display = 'none');
  }
}

/* --------------------------------------------------------------------------
   4. Scroll Spy (Active TOC Highlight)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section-block');
  const navLinks = document.querySelectorAll('.toc-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.classList.toggle('active', href === id);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   5. Live Search & Highlight
   -------------------------------------------------------------------------- */
function initSearch() {
  const searchInput = document.getElementById('policySearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const sections = document.querySelectorAll('.section-block');

    sections.forEach(section => {
      if (!query) {
        section.style.display = '';
        return;
      }

      const text = section.innerText.toLowerCase();
      if (text.includes(query)) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Play Store & App Store Account Deletion Email Generator
   -------------------------------------------------------------------------- */
function initAccountDeletionHelper() {
  const deleteBtn = document.getElementById('openDeletionEmailBtn');
  if (!deleteBtn) return;

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'support@dohassist.com';
    const subject = encodeURIComponent('Request for Permanent Account & Data Deletion - Samtawad App');
    const body = encodeURIComponent(
`Hello Samtawad Support Team,

I hereby request the permanent deletion of my Samtawad app account and all associated personal data in accordance with Google Play and Apple App Store compliance.

Registered Email / Phone Number: [Enter your registered email or phone]
User Name: [Enter your name]
Reason (Optional): 

Please confirm once my account and stored data (Firebase Auth, Cloud Firestore records, notes, bookmarks) have been permanently wiped from the database.

Thank you,
`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}

/* --------------------------------------------------------------------------
   7. Print Helper
   -------------------------------------------------------------------------- */
function printPolicy() {
  window.print();
}
window.printPolicy = printPolicy;
