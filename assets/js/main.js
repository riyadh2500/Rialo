/* ============================================================
   RIALO DOCS — Main JS
   ============================================================ */

function toggleSidebar() {
  const s = document.getElementById('sidebar');
  if (!s) return;
  s.classList.toggle('open');
  s.classList.toggle('hidden');
}

/* Close on outside click (mobile) */
document.addEventListener('click', e => {
  const s = document.getElementById('sidebar');
  const t = document.querySelector('.sidebar-toggle');
  if (!s || window.innerWidth > 900) return;
  if (s.classList.contains('open') && !s.contains(e.target) && t && !t.contains(e.target))
    s.classList.remove('open');
});

/* Copy code */
function copyCode(btn) {
  const code = btn.closest('.code-block')?.querySelector('pre code');
  if (!code) return;
  navigator.clipboard.writeText(code.innerText).then(() => {
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = code.innerText;
    Object.assign(ta.style, { position: 'fixed', opacity: '0' });
    document.body.appendChild(ta); ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✓ Copied'; btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

/* Search */
const searchData = [
  { title: 'Introduction',       url: '../index.html',                      kw: 'rialo overview what is blockchain real world subzero' },
  { title: 'Quick Start Guide',  url: '../pages/quick-start.html',          kw: 'install setup cargo cli first program deploy testnet' },
  { title: 'API Reference',      url: '../pages/api-reference.html',        kw: 'api cdk rialo-cdk https price feed token messaging random' },
  { title: 'Tutorials',          url: '../pages/tutorials.html',            kw: 'tutorial guide defi rwa subscription agent build example' },
  { title: 'Smart Contracts',    url: '../pages/smart-contracts.html',      kw: 'smart contract venus dsl after every on send start workflow' },
  { title: 'FAQ',                url: '../pages/faq.html',                  kw: 'faq questions testnet mainnet token airdrop solana anchor' },
];

window.addEventListener('DOMContentLoaded', () => {
  /* Sidebar init */
  const sidebar = document.getElementById('sidebar');
  if (sidebar && window.innerWidth <= 900) sidebar.classList.add('hidden');

  /* Search dropdown */
  const input = document.getElementById('search-input');
  if (!input) return;
  const wrap = input.closest('.search-bar');
  wrap.style.position = 'relative';

  const drop = document.createElement('div');
  drop.style.cssText = `position:absolute;top:calc(100% + 6px);left:0;right:0;
    background:var(--rialo-elevated);border:1px solid var(--rialo-border);
    border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.5);
    z-index:2000;display:none;`;
  wrap.appendChild(drop);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { drop.style.display = 'none'; return; }
    const hits = searchData.filter(p => p.title.toLowerCase().includes(q) || p.kw.includes(q));
    drop.innerHTML = hits.length
      ? hits.map(r => `<a href="${r.url}" style="display:flex;align-items:center;gap:0.6rem;padding:0.65rem 1rem;color:var(--text-primary);font-size:0.875rem;border-bottom:1px solid var(--rialo-border-dim);transition:background .15s;" onmouseover="this.style.background='var(--rialo-hover)'" onmouseout="this.style.background=''">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--rialo-blue)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ${r.title}</a>`).join('')
      : `<div style="padding:.75rem 1rem;color:var(--text-muted);font-size:.85rem;">No results for "${q}"</div>`;
    drop.style.display = 'block';
  });

  document.addEventListener('click', e => { if (!input.contains(e.target)) drop.style.display = 'none'; });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); input.focus(); input.select(); }
    if (e.key === 'Escape') { drop.style.display = 'none'; input.blur(); }
  });
});
