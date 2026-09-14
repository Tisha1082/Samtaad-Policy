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
   3. Tabs & Navigation (Header Nav, Hero Tabs, Sidebar Filters & Hash Routing)
   -------------------------------------------------------------------------- */
let currentActiveTab = 'privacy';
let currentFilterMode = 'all';

function initTabs() {
  const privacyContent = document.getElementById('policy-content');
  const termsContent = document.getElementById('terms-content');

  // Header Nav & Hero tab buttons
  const allTabBtns = document.querySelectorAll('.tab-btn, .nav-tab-btn[data-tab]');
  const filterBtns = document.querySelectorAll('.s-filter-btn');

  function switchTab(targetTab, updateFilter = false) {
    currentActiveTab = targetTab;

    // Sync all tab buttons (header and hero)
    allTabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === targetTab;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    // Toggle Content Sections
    if (targetTab === 'terms') {
      if (privacyContent) privacyContent.style.display = 'none';
      if (termsContent) termsContent.style.display = 'block';
    } else {
      if (privacyContent) privacyContent.style.display = 'block';
      if (termsContent) termsContent.style.display = 'none';
    }

    if (updateFilter) {
      applySidebarFilter(targetTab);
    }
  }

  // Bind tab click events
  allTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
      history.replaceState(null, '', `#${tab}`);
    });
  });

  // Bind Header "Data Deletion" shortcut
  const dataDeletionLinks = document.querySelectorAll('[data-goto="data-deletion"], a[href="#data-deletion"]');
  dataDeletionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (currentActiveTab !== 'privacy') {
        switchTab('privacy');
      }
      const targetEl = document.getElementById('data-deletion');
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    });
  });

  // Bind Sidebar Filter Buttons (All / Privacy / Terms)
  function applySidebarFilter(mode) {
    currentFilterMode = mode;
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === mode);
    });

    const privacyGroup = document.getElementById('toc-group-privacy');
    const termsGroup = document.getElementById('toc-group-terms');

    if (mode === 'all') {
      if (privacyGroup) privacyGroup.style.display = 'block';
      if (termsGroup) termsGroup.style.display = 'block';
    } else if (mode === 'privacy') {
      if (privacyGroup) privacyGroup.style.display = 'block';
      if (termsGroup) termsGroup.style.display = 'none';
    } else if (mode === 'terms') {
      if (privacyGroup) privacyGroup.style.display = 'none';
      if (termsGroup) termsGroup.style.display = 'block';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-filter');
      applySidebarFilter(mode);
      if (mode === 'privacy' || mode === 'terms') {
        switchTab(mode);
        history.replaceState(null, '', `#${mode}`);
      }
    });
  });

  // Bind click on TOC Links to auto-switch tab if clicking opposite section
  const allTocLinks = document.querySelectorAll('.toc-link');
  allTocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const sectionType = link.getAttribute('data-section');
      const href = link.getAttribute('href');

      if (sectionType && sectionType !== currentActiveTab) {
        switchTab(sectionType);
      }

      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        }
      }
    });
  });

  // Handle URL Hash on load & hashchange
  function handleHash() {
    const hash = window.location.hash.toLowerCase();
    if (!hash) return;

    if (hash.includes('term')) {
      switchTab('terms');
    } else {
      switchTab('privacy');
    }

    const cleanHash = hash.replace('#', '');
    const targetElement = document.getElementById(cleanHash);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
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
    rootMargin: '-15% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   5. Live Search Across All Sections
   -------------------------------------------------------------------------- */
function initSearch() {
  const searchInput = document.getElementById('policySearch');
  const privacyContent = document.getElementById('policy-content');
  const termsContent = document.getElementById('terms-content');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const sections = document.querySelectorAll('.section-block');

    if (!query) {
      // Restore view based on currentActiveTab
      if (privacyContent) privacyContent.style.display = currentActiveTab === 'privacy' ? 'block' : 'none';
      if (termsContent) termsContent.style.display = currentActiveTab === 'terms' ? 'block' : 'none';

      sections.forEach(sec => sec.style.display = '');
      tocLinks.forEach(link => {
        link.parentElement.style.display = '';
        link.style.opacity = '';
      });
      return;
    }

    // Searching: Show both content containers so matches anywhere can be seen
    if (privacyContent) privacyContent.style.display = 'block';
    if (termsContent) termsContent.style.display = 'block';

    sections.forEach(section => {
      const text = section.innerText.toLowerCase();
      const id = section.getAttribute('id');
      const matches = text.includes(query);
      section.style.display = matches ? '' : 'none';

      // Update corresponding TOC item
      const matchingLink = document.querySelector(`.toc-link[href="#${id}"]`);
      if (matchingLink) {
        matchingLink.parentElement.style.display = matches ? '' : 'none';
        matchingLink.style.opacity = matches ? '1' : '0.4';
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
