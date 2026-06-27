/* Shared nav + sidebar injected into every page */
(function () {
  const base = document.body.dataset.base || '../';
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  /* ── TOP NAV ── */
  const topnavMount = document.getElementById('topnav-mount');
  if (topnavMount) {
    topnavMount.innerHTML = `
<header class="topnav">
  <div class="topnav-left">
    <button class="sidebar-toggle" aria-label="Toggle sidebar" onclick="toggleSidebar()">
      <span></span><span></span><span></span>
    </button>
    <a href="${base}index.html" class="logo-wrap">
      <span class="logo-name">Rialo</span>
      <span class="logo-badge">Docs</span>
    </a>
  </div>
  <div class="topnav-center">
    <div class="search-bar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Search docs…" id="search-input" />
      <kbd>⌘K</kbd>
    </div>
  </div>
  <div class="topnav-right">
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfc87ZbBI0PSa5FAuRnrfJoK_X7xe_bOUI6Gw5clDwoxgCUlA/viewform" target="_blank" class="btn btn-dark">Early Access</a>
    <a href="https://x.com/rialo_io" target="_blank" class="icon-link" aria-label="X">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
  </div>
</header>

<!-- Wavy decoration -->
<div class="wavy-decoration">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 40 C80 40 80 80 160 80 C240 80 240 20 320 20 C400 20 400 70 480 70 C560 70 560 30 640 30 C720 30 720 80 800 80 C880 80 880 20 960 20 C1040 20 1040 65 1120 65 C1200 65 1200 35 1280 35 C1360 35 1360 70 1440 70" stroke="#0f0e0c" stroke-width="1.5" fill="none" opacity="0.12"/>
    <path d="M0 55 C100 55 100 90 180 90 C260 90 260 30 360 30 C440 30 440 75 520 75 C600 75 600 25 700 25 C780 25 780 75 860 75 C940 75 940 35 1020 35 C1100 35 1100 70 1200 70 C1280 70 1280 45 1380 45 C1420 45 1430 55 1440 55" stroke="#0f0e0c" stroke-width="1" fill="none" opacity="0.07"/>
  </svg>
</div>`;
  }

  /* ── SIDEBAR ── */
  const sidebarMount = document.getElementById('sidebar-mount');
  if (!sidebarMount) return;

  const groups = [
    { title: 'Getting Started', items: [
      { label: 'Introduction',      href: `${base}index.html`,                 icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
      { label: 'Quick Start Guide', href: `${base}pages/quick-start.html`,     icon: 'M13 2L3 14h9l-1 8 10-12h-9z' },
    ]},
    { title: 'Core Docs', items: [
      { label: 'API Reference',     href: `${base}pages/api-reference.html`,   icon: null, iconFull: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
      { label: 'Tutorials',         href: `${base}pages/tutorials.html`,       icon: null, iconFull: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>' },
      { label: 'Smart Contracts',   href: `${base}pages/smart-contracts.html`, icon: null, iconFull: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' },
    ]},
    { title: 'Help', items: [
      { label: 'FAQ',               href: `${base}pages/faq.html`,             icon: null, iconFull: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>' },
    ]},
    { title: 'Resources', items: [
      { label: 'rialo.io',   href: 'https://www.rialo.io',        external: true },
      { label: 'Discord',    href: 'https://discord.gg/rialo',    external: true },
      { label: 'Twitter / X',href: 'https://x.com/rialo_io',      external: true },
      { label: 'Blog',       href: 'https://www.rialo.io/blog',   external: true },
    ]},
  ];

  let html = '<aside class="sidebar" id="sidebar"><nav class="sidebar-nav">';
  groups.forEach((g, gi) => {
    if (gi > 0) html += '<div class="nav-divider"></div>';
    html += `<div class="nav-section"><span class="nav-section-title">${g.title}</span>`;
    g.items.forEach(item => {
      const file = item.href.split('/').pop();
      const active = file === currentPage ? ' active' : '';
      const extAttr = item.external ? ' target="_blank"' : '';
      const extClass = item.external ? ' nav-external' : '';
      const iconSvg = item.icon || item.iconFull
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${item.iconFull || `<path d="${item.icon}"/>`}</svg>`
        : '';
      html += `<a href="${item.href}" class="nav-link${active}${extClass}"${extAttr}>${iconSvg}${item.label}</a>`;
    });
    html += '</div>';
  });
  html += '</nav></aside>';
  sidebarMount.innerHTML = html;
})();
