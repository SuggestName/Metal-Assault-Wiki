// features/bundles/engine.js
import { STAT_ALIASES, colorizeEffectTextUniversal, colorizeStatLabelByKey, statsObjectToEffectLines } from '../../data/datasets.js';

function htmlEscape(s) { return String(s ?? '').replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m])); }

// Normalize many possible bundle effects formats
function normalizeBundleEffects(b) {
  if (!b) return [];
  if (b.stats && typeof b.stats === 'object' && !Array.isArray(b.stats)) {
    return Object.entries(b.stats).filter(([_, v]) => (v ?? '').toString().trim() !== '').map(([k, v]) => ({ label: k, text: v }));
  }
  if (b.effects && typeof b.effects === 'object' && !Array.isArray(b.effects)) {
    return Object.entries(b.effects).filter(([_, v]) => (v ?? '').toString().trim() !== '').map(([k, v]) => ({ label: `${k} Set`, text: v }));
  }
  if (Array.isArray(b.effects)) {
    return b.effects.filter(Boolean).map((t, i) => ({ label: `${i + 1} Set`, text: t }));
  }
  const keys = Object.keys(b).filter(k => /^set\d+$/i.test(k));
  if (keys.length) {
    return keys.sort((a, c) => a.localeCompare(c, undefined, { numeric: true })).map(k => ({ label: `${k.match(/\d+/)[0]} Set`, text: b[k] }));
  }
  return [];
}
function bundleEffectsList(b) {
  const items = normalizeBundleEffects(b)
    .map(it => {
      const coloredText = colorizeEffectTextUniversal(it.text);
      return `<li class="text-xs">
        <span class="text-blue-300 font-semibold inline-block min-w-[100px]">${String(it.label)}</span>
        <span class="ml-1">: ${coloredText}</span>
     </li>`;
    }).join('');
  return items ? `<ul class="space-y-0.5">${items}</ul>` : `<p class="text-xs text-gray-400">No effects listed</p>`;
}

export function createBundleCard(b) {
  const partsShown = (Number.isFinite(b.parts) && b.parts > 0) ? b.parts
    : (Array.isArray(b.equipment) && b.equipment.length ? b.equipment.length : (Array.isArray(b.images) ? b.images.length : 0));
  const equipmentLine = (Array.isArray(b.equipment))
    ? `<div class="mt-1 text-xs text-gray-300 leading-snug bundle-equipment"><span class="text-gray-400">Equipment:</span> <span class="text-white">${b.equipment.join(' • ')}</span></div>`
    : ``;
  return `
    <div class="bg-gray-900 border border-blue-500 rounded-xl p-4 hover:shadow-xl transition">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-bold text-blue-400">${b.name}</h2>
      </div>
      <p class="text-yellow-400 font-bold text-sm mb-2">
        ${b.price !== undefined ? `Price: ${String(b.price)}` : ''} ${b.permanent ? ' <span class="text-green-400">Permanent</span>' : ''}
      </p>
      <div class="bg-gray-800 rounded-lg p-2 text-center mb-3">
        <img src="${b.image}?v=4.6" alt="${b.name}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${b.image}?v=4.6">
      </div>
      <div class="text-sm text-gray-300">Parts: <span class="text-white font-semibold">${partsShown}</span></div>
      ${equipmentLine}
      <div class="space-y-2 mt-2">
        <div class="text-gray-300 font-semibold text-sm">Effects:</div>
        ${bundleEffectsList(b)}
      </div>
    </div>
  `;
}

export function createBundleCompareCard(b) {
  if (!b) return `<div class="comparison-card rounded-lg p-3 text-center text-sm"><p class="text-gray-400">Select a bundle</p></div>`;
  const partsShown = (Number.isFinite(b.parts) && b.parts > 0) ? b.parts
    : (Array.isArray(b.equipment) && b.equipment.length ? b.equipment.length : (Array.isArray(b.images) ? b.images.length : 0));
  const equipmentLine = (Array.isArray(b.equipment) && b.equipment.length)
    ? `<div class="text-xs text-gray-300 mt-1 bundle-equipment"><span class="text-gray-400">Equipment:</span> <span class="text-white">${b.equipment.join(' • ')}</span></div>`
    : ``;
  return `
    <div class="comparison-card rounded-lg p-3">
      <h3 class="font-bold text-blue-400 mb-2 text-center text-sm">${b.name}</h3>
      <div class="bg-gray-700 rounded-lg p-2 text-center mb-2">
        <img src="${b.image}?v=4.6" alt="${b.name}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${b.image}?v=4.6">
      </div>
      <div class="text-xs text-gray-300">Price: <span class="text-white font-semibold">${b.price ?? '-'}</span></div>
      <div class="text-xs text-gray-300">Parts: <span class="text-white font-semibold">${partsShown}</span></div>
      ${equipmentLine}
      <div class="border-t border-gray-600 my-2"></div>
      ${bundleEffectsList(b)}
    </div>
  `;
}

/* ===== Data init & comparison ===== */
export function initBundles() {
  const grid = document.getElementById('bundles-grid');
  const s1 = document.getElementById('bundle1-select');
  const s2 = document.getElementById('bundle2-select');
  const data = (window.bundles || (typeof bundles !== 'undefined' ? bundles : []));
  if (!grid || !s1 || !s2 || !Array.isArray(data)) return;
  grid.innerHTML = data.map(createBundleCard).join('');
  s1.innerHTML = `<option value="" selected disabled>Select Bundle</option>`;
  s2.innerHTML = `<option value="" selected disabled>Select Bundle</option>`;
  data.forEach((b, i) => { s1.add(new Option(b.name, i)); s2.add(new Option(b.name, i)); });
}
export function updateComparisonBundles() {
  const s1 = document.getElementById('bundle1-select');
  const s2 = document.getElementById('bundle2-select');
  const cmp = document.getElementById('bundles-comparison-display');
  const data = (window.bundles || (typeof bundles !== 'undefined' ? bundles : []));
  if (!s1 || !s2 || !cmp || !Array.isArray(data)) return;
  const b1 = data[s1.value];
  const b2 = data[s2.value];
  cmp.innerHTML = `${createBundleCompareCard(b1)}${createBundleCompareCard(b2)}`;
}

/* ===== Pets ===== */
function petStatsTable(p) {
  const rows = Object.entries(p.stats || {}).map(([name, vals]) => {
    const b = vals?.battle ?? '-';
    const m = vals?.mission ?? '-';
    const c = vals?.coop ?? '-';

    // Detecta o atributo pelo alias (Attack Power, HP, Rate of Fire, etc.)
    const pair = STAT_ALIASES.find(([key, rx]) => rx.test(String(name)));
    const nameHtml = pair
      ? colorizeStatLabelByKey(pair[0], name)
      : `<span class="text-blue-300 font-semibold">${htmlEscape(name)}</span>`;

    return `
      <tr class="text-xs">
        <td class="pr-2 py-0.5">${nameHtml}</td>
        <td class="px-2 py-0.5 text-center">${htmlEscape(b)}</td>
        <td class="px-2 py-0.5 text-center">${htmlEscape(m)}</td>
        <td class="px-2 py-0.5 text-center">${htmlEscape(c)}</td>
      </tr>
    `;
  }).join('');

  return `
    <table class="w-full">
      <thead class="text-[11px] text-gray-400">
        <tr>
          <th class="text-left">Stat</th>
          <th class="px-2">Battle</th>
          <th class="px-2">Mission</th>
          <th class="px-2">Co-op</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

export function createPetCard(p) {
  return `
    <div class="bg-gray-900 border border-blue-500 rounded-xl p-4 hover:shadow-xl transition">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-bold text-blue-400">${htmlEscape(p.name)}</h2>
      </div>
      <p class="text-yellow-400 font-bold text-sm mb-2">${htmlEscape(p.source ?? '')}</p>
      <div class="bg-gray-800 rounded-lg p-2 text-center mb-3">
        <img src="${htmlEscape(p.image)}?v=4.6" alt="${htmlEscape(p.name)}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${p.image}?v=4.6">
      </div>
      ${petStatsTable(p)}
    </div>
  `;
}
export function createPetCompareCard(p) {
  if (!p) return `<div class="comparison-card rounded-lg p-3 text-center text-sm"><p class="text-gray-400">Select a pet</p></div>`;
  return `
    <div class="comparison-card rounded-lg p-3">
      <h3 class="font-bold text-blue-400 mb-2 text-center text-sm">${htmlEscape(p.name)}</h3>
      <div class="bg-gray-700 rounded-lg p-2 text-center mb-2">
        <img src="${htmlEscape(p.image)}?v=4.6" alt="${htmlEscape(p.name)}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${p.image}?v=4.6">
      </div>
      <div class="text-xs text-yellow-300 font-semibold mb-2">${htmlEscape(p.source ?? '')}</div>
      ${petStatsTable(p)}
    </div>
  `;
}
export function initPets() {
  const grid = document.getElementById('pets-grid');
  const s1 = document.getElementById('pet1-select');
  const s2 = document.getElementById('pet2-select');
  const data = (window.pets || (typeof pets !== 'undefined' ? pets : []));
  if (!grid || !s1 || !s2 || !Array.isArray(data)) return;
  grid.innerHTML = data.map(createPetCard).join('');
  s1.innerHTML = `<option value="" selected disabled>Select Pet</option>`;
  s2.innerHTML = `<option value="" selected disabled>Select Pet</option>`;
  data.forEach((p, i) => { s1.add(new Option(p.name, i)); s2.add(new Option(p.name, i)); });
}
export function updateComparisonPets() {
  const s1 = document.getElementById('pet1-select');
  const s2 = document.getElementById('pet2-select');
  const cmp = document.getElementById('pets-comparison-display');
  const data = (window.pets || (typeof pets !== 'undefined' ? pets : []));
  if (!s1 || !s2 || !cmp || !Array.isArray(data)) return;
  const p1 = data[s1.value];
  const p2 = data[s2.value];
  cmp.innerHTML = `${createPetCompareCard(p1)}${createPetCompareCard(p2)}`;
}

/* ===== Search (Bundles & Pets) ===== */
export function applyBundleSearchFromUI(list) {
  const q = (document.getElementById('bundle-search-name')?.value || '').trim().toLowerCase();
  const pmaxEl = document.getElementById('bundle-price-max');
  const pmax = pmaxEl && pmaxEl.value ? Number(pmaxEl.value) : null;
  const onlyPerm = !!document.getElementById('bundle-only-permanent')?.checked;
  return (list || []).filter(b => {
    if (q && !String(b.name || '').toLowerCase().includes(q)) return false;
    if (onlyPerm && b.permanent !== true) return false;
    if (pmax != null && typeof b.price === 'number' && b.price > pmax) return false;
    return true;
  });
}
export function renderBundlesGridFiltered() {
  const grid = document.getElementById('bundles-grid');
  const data = (window.bundles || (typeof bundles !== 'undefined' ? bundles : [])) || [];
  if (!grid) return;
  const filtered = applyBundleSearchFromUI(data);
  grid.innerHTML = filtered.length
    ? filtered.map(createBundleCard).join('')
    : `<div class="col-span-full text-center text-sm text-gray-400 py-6">No results for this search.</div>`;
}
export function bindBundleSearchInputs() {
  ['bundle-search-name', 'bundle-price-max', 'bundle-only-permanent'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const evt = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evt, renderBundlesGridFiltered);
  });
}

export function applyPetSearchFromUI(list) {
  const q = (document.getElementById('pet-search-name')?.value || '').trim().toLowerCase();
  return (list || []).filter(p => {
    if (q && !String(p.name || '').toLowerCase().includes(q)) return false;
    return true;
  });
}
export function renderPetsGridFiltered() {
  const grid = document.getElementById('pets-grid');
  const data = (window.pets || (typeof pets !== 'undefined' ? pets : [])) || [];
  if (!grid) return;
  const filtered = applyPetSearchFromUI(data);
  grid.innerHTML = filtered.length
    ? filtered.map(createPetCard).join('')
    : `<div class="col-span-full text-center text-sm text-gray-400 py-6">No results for this search.</div>`;
}
export function bindPetsSearchInputs() {
  const el = document.getElementById('pet-search-name');
  if (el) el.addEventListener('input', renderPetsGridFiltered);
}

export function resetBundleFilters() {
  const q = document.getElementById('bundle-search-name');
  const p = document.getElementById('bundle-price-max');
  const c = document.getElementById('bundle-only-permanent');
  if (q) q.value = '';
  if (p) p.value = '';
  if (c) c.checked = false;
  renderBundlesGridFiltered();
}
export function resetPetsFilters() {
  const q = document.getElementById('pet-search-name');
  if (q) q.value = '';
  renderPetsGridFiltered();
}

function wingStatsToEffectLines(stats = {}) {
  const lines = [];
  WING_ORDER.forEach(key => {
    if (stats[key] != null) {
      const label = WING_LABELS[key] || key;
      const color = WING_COLORS[key] || "text-gray-200";
      lines.push(`<span class="${color} font-semibold">${label}</span> ${stats[key]}`);
    }
  });
  Object.keys(stats).forEach(k => {
    if (!WING_ORDER.includes(k) && stats[k] != null) {
      const label = WING_LABELS[k] || k;
      const color = WING_COLORS[k] || "text-gray-200";
      lines.push(`<span class="${color} font-semibold">${label}</span> ${stats[k]}`);
    }
  });
  return lines;
}

export function createWingCard(w) {
  const statLines = statsObjectToEffectLines(w.stats); // cores e ordem universais
  const extra = (Array.isArray(w.effects) ? w.effects : []).map(colorizeEffectTextUniversal);
  const all = [...statLines, ...extra];

  return `
    <div class="weapon-card w-full min-w-0 bg-gray-900 border border-blue-500 rounded-xl p-4 hover:shadow-xl transition">
      <div class="flex justify-between items-center mb-2">
        <h2 class="flex-1 min-w-0 text-lg font-bold text-blue-400 card-title">
          <span class="block truncate" title="${w.name}">${w.name}</span>
        </h2>
      </div>
      <p class="text-yellow-400 font-bold text-sm mb-3">${w.price ?? ''}</p>
      <div class="bg-gray-800 rounded-lg p-2 text-center mb-3">
        <img src="${w.image}?v=4.6" alt="${w.name}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${w.image}?v=4.6">
      </div>
      ${all.length ? `
        <div>
          <div class="text-gray-300 font-semibold text-sm mb-1">Effects:</div>
          <ul class="space-y-0.5 text-xs">${all.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>` : ``}
    </div>
  `;
}

export function createWingCompareCard(w) {
  if (!w) return `<div class="comparison-card rounded-lg p-3 text-center text-sm"><p class="text-gray-400">Select a wing</p></div>`;

  const statLines = statsObjectToEffectLines(w.stats);
  const extra = (Array.isArray(w.effects) ? w.effects : []).map(colorizeEffectTextUniversal);
  const all = [...statLines, ...extra];

  return `
    <div class="comparison-card rounded-lg p-3">
      <h3 class="font-bold text-blue-400 mb-2 text-center text-sm">${w.name}</h3>
      <div class="bg-gray-700 rounded-lg p-2 text-center mb-2">
        <img src="${w.image}?v=4.6" alt="${w.name}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${w.image}?v=4.6">
      </div>
      <div class="text-xs text-yellow-300 font-semibold mb-2">${w.price ?? ''}</div>
      ${all.length ? `
        <div>
          <div class="text-gray-300 font-semibold text-xs mb-1">Effects:</div>
          <ul class="space-y-0.5 text-xs">${all.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>` : ``}
    </div>
  `;
}

export function initWings() {
  const grid = document.getElementById('wings-grid');
  const s1 = document.getElementById('wing1-select');
  const s2 = document.getElementById('wing2-select');
  const data = (window.wings || (typeof wings !== 'undefined' ? wings : []));
  if (!grid || !s1 || !s2 || !Array.isArray(data)) return;
  grid.innerHTML = data.map(createWingCard).join('');
  s1.innerHTML = `<option value="" selected disabled>Select Wing</option>`;
  s2.innerHTML = `<option value="" selected disabled>Select Wing</option>`;
  data.forEach((w, i) => { s1.add(new Option(w.name, i)); s2.add(new Option(w.name, i)); });
}

export function updateComparisonWings() {
  const s1 = document.getElementById('wing1-select');
  const s2 = document.getElementById('wing2-select');
  const cmp = document.getElementById('wings-comparison-display');
  const data = (window.wings || (typeof wings !== 'undefined' ? wings : []));
  if (!s1 || !s2 || !cmp || !Array.isArray(data)) return;
  const w1 = data[s1.value];
  const w2 = data[s2.value];
  cmp.innerHTML = `${createWingCompareCard(w1)}${createWingCompareCard(w2)}`;
}

/* Busca simples por nome e preço (se houver numérico) */
export function applyWingSearchFromUI(list) {
  const q = (document.getElementById('wing-search-name')?.value || '').trim().toLowerCase();
  const pmaxEl = document.getElementById('wing-price-max');
  const pmax = pmaxEl && pmaxEl.value ? Number(pmaxEl.value) : null;
  return (list || []).filter(w => {
    if (q && !String(w.name || '').toLowerCase().includes(q)) return false;
    if (pmax != null) {
      const priceNum = Number(String(w.price).replace(/\D+/g, '')); // tenta extrair número
      if (Number.isFinite(priceNum) && priceNum > pmax) return false;
    }
    return true;
  });
}
export function renderWingsGridFiltered() {
  const grid = document.getElementById('wings-grid');
  const data = (window.wings || (typeof wings !== 'undefined' ? wings : [])) || [];
  if (!grid) return;
  const filtered = applyWingSearchFromUI(data);
  grid.innerHTML = filtered.length
    ? filtered.map(createWingCard).join('')
    : `<div class="col-span-full text-center text-sm text-gray-400 py-6">No results for this search.</div>`;
}
export function bindWingsSearchInputs() {
  ['wing-search-name', 'wing-price-max'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const evt = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evt, renderWingsGridFiltered);
  });
}
export function resetWingsFilters() {
  const q = document.getElementById('wing-search-name');
  const p = document.getElementById('wing-price-max');
  if (q) q.value = '';
  if (p) p.value = '';
  renderWingsGridFiltered();
}


// Globals for compatibility
window.resetBundleFilters = resetBundleFilters;
window.resetPetsFilters = resetPetsFilters;
window.resetWingsFilters = resetWingsFilters;

window.bindBundleSearchInputs = bindBundleSearchInputs;
window.bindPetsSearchInputs = bindPetsSearchInputs;
window.bindWingsSearchInputs = bindWingsSearchInputs;

window.renderBundlesGridFiltered = renderBundlesGridFiltered;
window.renderPetsGridFiltered = renderPetsGridFiltered;
window.renderWingsGridFiltered = renderWingsGridFiltered;

window.initBundles = initBundles;
window.updateComparisonBundles = updateComparisonBundles;

window.initPets = initPets;
window.updateComparisonPets = updateComparisonPets;

window.initWings = initWings;
window.updateComparisonWings = updateComparisonWings;
