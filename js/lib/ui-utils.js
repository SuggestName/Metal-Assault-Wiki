// ui-utils.js
// Shared small utilities and UI building helpers.
// Expose to window for backward compatibility, and export for ES modules.

export function applyUpgrade(base, inc) {
  const b = Number(base) || 0;
  const i = Number(inc) || 0;
  return b + i;
}

export function createStatDisplay(label, value) {
  return `
    <div class="flex justify-between items-center text-[11px] py-0.5">
      <span class="text-gray-400">${label}</span>
      <span class="text-white font-bold">${value}</span>
    </div>
  `;
}

export function displayStatsFor(kind, w) {
  if (kind === 'shields') {
    return [
      createStatDisplay('Rate of Fire', w.rateOfFire),
      createStatDisplay('Range', w.range),
      createStatDisplay('Explosion Defense', w.explosionDefense),
      createStatDisplay('Defense', w.defense),
    ].join('');
  }
  return [
    createStatDisplay('Rate of Fire', w.rateOfFire),
    createStatDisplay('Range', w.range),
    createStatDisplay('Accuracy', w.accuracy),
    createStatDisplay('Bullet Speed', w.bulletSpeed),
  ].join('');
}

export function createWeaponCard(w, kind, score) {
  if (!w) return '';
  const subtitleParts = [];
  if (w.price !== undefined && w.price !== null) subtitleParts.push(`Price: ${w.price}`);
  if (w.duration) subtitleParts.push(w.duration);
  const subtitle = subtitleParts.join(' - ');

  return `
    <div class="weapon-card w-full min-w-0 bg-gray-900 border border-blue-500 rounded-xl p-4 hover:shadow-xl transition relative">
      <div class="flex items-center mb-3">
          <h2 class="flex-1 min-w-0 text-lg font-bold text-blue-400 card-title">
            <span class="block truncate" title="${w.name}">${w.name}</span>
          </h2>
          <span class="ml-3 shrink-0 whitespace-nowrap rounded-full border border-blue-400 px-3 py-1 text-xs">
            Match: ${Math.round(score)}
          </span>
        </div>
      ${subtitle ? `<p class="text-yellow-400 font-bold text-sm mb-2">${subtitle}</p>` : ''}
      <div class="bg-gray-800 rounded-lg p-2 text-center mb-3">
        <img src="${w.image}?v=4.3" alt="${w.name}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${w.image}?v=4.3">
      </div>
      ${('ammo' in w || 'magazines' in w) ? `
        <div class="text-center -mt-2 mb-2">
          <span class="text-gray-300 text-xs">
            Ammo: <span class="text-white font-bold">${w.ammo ?? 0}</span>
            ${('magazines' in w) ? ` | Magazines: <span class="text-white font-bold">${w.magazines ?? 0}</span>` : ``}
          </span>
        </div>
      ` : ``}
      <div class="space-y-1">
        ${createStatDisplay('Damage', w.damage)}
        ${displayStatsFor(kind, w)}
        ${createStatDisplay('Mobility', w.mobility)}
      </div>
    </div>
  `;
}

// Simple top navigation active-state sync
export function syncTopNavActive() {
  const byDataAttr = document.body?.dataset?.page;
  const file = (location.pathname.split('/').pop() || '').toLowerCase();
  const byFile = file.includes('bundle')
      ? 'bundles'
      : (file.includes('weapon') || file === '' ? 'weapons' : (document.querySelector('[data-nav="bundles"]') ? 'bundles' : 'weapons'));
  const current = byDataAttr || byFile;
  document.querySelectorAll('[data-nav]').forEach(a => {
    const on = a.dataset.nav === current;
    a.classList.toggle('bg-blue-600', on);
    a.classList.toggle('text-white', on);
    a.classList.toggle('bg-gray-600', !on);
    a.classList.toggle('text-gray-300', !on);
  });
}

// Image Zoom Modal — one-time initializer
(function initImageZoom() {
  const modal = document.createElement('div');
  modal.id = 'img-zoom-modal';
  modal.className = 'fixed inset-0 hidden bg-black/70 backdrop-blur-sm flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="relative max-w-[90vw] max-h-[90vh]">
      <button type="button" class="absolute -top-4 -right-4 w-10 h-10 bg-gray-900/90 border border-gray-600 text-white text-xl" data-close>&times;</button>
      <img src="" alt="" class="block max-w-[90vw] max-h-[90vh] shadow-lg select-none" />
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(modal);
    const imgEl = modal.querySelector('img');
    function openZoom(src, alt) {
      imgEl.src = src;
      imgEl.alt = alt || '';
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    function closeZoom() {
      modal.classList.add('hidden');
      imgEl.src = '';
      document.body.style.overflow = '';
    }
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) { closeZoom(); return; }
      const targetImg = e.target.closest('.js-zoomable');
      if (targetImg) {
        const src = targetImg.getAttribute('data-zoom-src') || targetImg.src;
        const alt = targetImg.getAttribute('alt') || '';
        openZoom(src, alt); return;
      }
      if (e.target === modal) closeZoom();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeZoom(); });
  });
})();

// Back-compat globals
window.applyUpgrade = applyUpgrade;
window.createStatDisplay = createStatDisplay;
window.createWeaponCard = createWeaponCard;
