// features/weapons/engine.js
import { applyUpgrade, createStatDisplay, createWeaponCard } from '../../lib/ui-utils.js';
import { UPGRADE_CFG, getUpgradableStats, STAT_LABELS, DATASETS } from '../../data/datasets.js';

/** ===== Upgrades state ===== */
function buildUpgradePair(stats) {
  return {
    1: Object.fromEntries(stats.map(s => [s, 0])),
    2: Object.fromEntries(stats.map(s => [s, 0])),
  };
}
const upgradeValuesWeapon = {
  rifles: buildUpgradePair(getUpgradableStats('rifles')),
  snipers: buildUpgradePair(getUpgradableStats('snipers')),
  bazookas: buildUpgradePair(getUpgradableStats('bazookas')),
  pistols: buildUpgradePair(getUpgradableStats('pistols')),
  shotguns: buildUpgradePair(getUpgradableStats('shotguns')),
  shields: buildUpgradePair(getUpgradableStats('shields')),
};

/** ===== Upgrade handlers ===== */
export function changeUpgradeWeapon(kind, n, stat, delta) {
  const allowed = getUpgradableStats(kind);
  if (!allowed.includes(stat)) return;
  const obj = upgradeValuesWeapon?.[kind]?.[n];
  if (!obj) return;
  const cur = Number(obj[stat]) || 0;
  obj[stat] = Math.max(0, Math.min(15, cur + (Number(delta) || 0)));
  updateComparison(kind);
}

export function updateMasterUpgradeWeapon(kind, n) {
  const cfg = UPGRADE_CFG[kind];
  if (!cfg) return;
  const slider = document.getElementById(`${cfg.prefix}${n}-master-upgrade`);
  const badge = document.getElementById(`${cfg.prefix}${n}-master-display`);
  if (!slider || !badge) return;
  const v = parseInt(slider.value, 10);
  badge.textContent = `+${v}`;
  getUpgradableStats(kind).forEach(s => upgradeValuesWeapon[kind][n][s] = v);
  updateComparison(kind);
}

export function createStatDisplayWithUpgradeWeapon(kind, label, base, fin, n, stat) {
  const cfg = UPGRADE_CFG[kind];
  const up = upgradeValuesWeapon?.[kind]?.[n]?.[stat] ?? 0;
  return `
    <div class="flex justify-between items-center text-[11px] py-0.5">
      <span class="text-gray-400 ${cfg.labelW}">${label}:</span>
      <div class="flex items-center space-x-1">
        <span class="text-gray-500 w-6 text-center">${base}</span>
        <button onclick="changeUpgradeWeapon('${kind}', ${n}, '${stat}', -1)" class="bg-red-600 hover:bg-red-700 w-5 h-5 rounded text-[10px]">-</button>
        <span class="text-blue-400 font-bold w-8 text-center">+${up}</span>
        <button onclick="changeUpgradeWeapon('${kind}', ${n}, '${stat}', 1)" class="bg-green-600 hover:bg-green-700 w-5 h-5 rounded text-[10px]">+</button>
        <span class="text-white font-bold">=</span>
        <span class="text-yellow-400 font-bold w-8 text-center">${fin}</span>
      </div>
    </div>
  `;
}

/** ===== Comparison ===== */
export function createComparisonCard(kind, item, n) {
  const cfg = UPGRADE_CFG[kind];
  if (!item) {
    return `<div class="comparison-card rounded-lg p-3 text-center text-sm"><p class="text-gray-400">Select a ${cfg.singular}</p></div>`;
  }
  const up = upgradeValuesWeapon[kind][n];
  const stats = { damage: item.damage, mobility: item.mobility };
  const upStats = getUpgradableStats(kind);
  upStats.forEach(st => { stats[st] = applyUpgrade(item[st], up[st]); });
  const rows = upStats.map(st => createStatDisplayWithUpgradeWeapon(kind, STAT_LABELS[st], item[st], stats[st], n, st)).join('');
  return `
    <div class="comparison-card rounded-lg p-3">
      <h3 class="font-bold text-blue-400 mb-2 text-center text-sm">${item.name}</h3>
      <div class="bg-gray-700 rounded-lg p-2 text-center mb-2">
        <img src="${item.image}?v=4.6" alt="${item.name}" class="mx-auto h-25 object-contain js-zoomable cursor-zoom-in" data-zoom-src="${item.image}?v=4.6">
      </div>
      <div class="border-t border-gray-600 my-2"></div>
      <div class="space-y-1">
        ${createStatDisplay('Damage', stats.damage)}
        ${rows}
        ${createStatDisplay('Mobility', stats.mobility)}
      </div>
    </div>
  `;
}

export function updateComparison(kind) {
  const s1 = document.getElementById(`${UPGRADE_CFG[kind].prefix}1-select`);
  const s2 = document.getElementById(`${UPGRADE_CFG[kind].prefix}2-select`);
  const cmp = document.getElementById(`${kind}-comparison-display`);
  if (!s1 || !s2 || !cmp) return;
  const data = DATASETS[kind]();
  const w1 = data[s1.value];
  const w2 = data[s2.value];
  cmp.innerHTML = `${createComparisonCard(kind, w1, 1)}${createComparisonCard(kind, w2, 2)}`;
}

/** ===== Search (weapons) ===== */
export function applySearchFromUI(kind, list) {
  const q = (document.getElementById('search-name')?.value || '').trim().toLowerCase();
  const pmaxEl = document.getElementById('price-max');
  const pmax = pmaxEl && pmaxEl.value ? Number(pmaxEl.value) : null;
  const onlyPerm = !!document.getElementById('only-permanent')?.checked;
  return list.filter(w => {
    if (q && !String(w.name || '').toLowerCase().includes(q)) return false;
    if (onlyPerm && String(w.duration || '').toLowerCase() !== 'permanent') return false;
    if (pmax != null && Number.isFinite(Number(w.price)) && Number(w.price) > pmax) return false;
    return true;
  });
}

/** ===== Ranking ===== */
function rankStats(kind) { return ['damage', ...(getUpgradableStats(kind))]; }

function getTargetFromUI(kind) {
  const v = id => Number(document.getElementById(`rank-${id}`)?.value || 50);
  if (kind === 'shields') {
    return {
      damage: v('damage'),
      rateOfFire: v('rateOfFire'),
      range: v('range'),
      explosionDefense: v('accuracy'),
      defense: v('bulletSpeed'),
    };
  }
  return {
    damage: v('damage'),
    rateOfFire: v('rateOfFire'),
    range: v('range'),
    accuracy: v('accuracy'),
    bulletSpeed: v('bulletSpeed'),
  };
}

function buildNormalizer(items, keys) {
  const min = {}, max = {};
  keys.forEach(s => { min[s] = Infinity; max[s] = -Infinity; });
  items.forEach(w => keys.forEach(s => {
    const val = Number(w[s]) || 0;
    if (val < min[s]) min[s] = val;
    if (val > max[s]) max[s] = val;
  }));
  const norm = (s, val) => {
    const d = max[s] - min[s];
    if (!(d > 0)) return 0.5;
    return (val - min[s]) / d;
  };
  return { min, max, norm };
}

function target01From(target100, keys) {
  const t = {}; keys.forEach(s => t[s] = (target100[s] ?? 50) / 100); return t;
}

function scoreByTarget(normVals, target01, keys) {
  let sum = 0;
  keys.forEach(s => {
    const diff = (normVals[s] ?? 0) - target01[s];
    sum += diff * diff;
  });
  const d = Math.sqrt(sum);
  return Math.round(Math.max(0, (1 - d / Math.sqrt(keys.length)) * 100));
}

function sortByScore(a, b) {
  if (b.score !== a.score) return b.score - a.score;
  const ap = Number.isFinite(a.item.price) ? a.item.price : Number.POSITIVE_INFINITY;
  const bp = Number.isFinite(b.item.price) ? b.item.price : Number.POSITIVE_INFINITY;
  if (ap !== bp) return ap - bp;
  return (b.item.damage || 0) - (a.item.damage || 0);
}

export function updateRankAndRender(kind) {
  const data = DATASETS[kind]();
  if (!data || !data.length) return;
  const filtered = applySearchFromUI(kind, data);
  const keys = rankStats(kind);
  const baseForNorm = filtered.length ? filtered : data;
  const normalizer = buildNormalizer(baseForNorm, keys);
  const target01 = target01From(getTargetFromUI(kind), keys);
  const grid = document.getElementById(`${kind}-grid`);
  if (!grid) return;
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center text-sm text-gray-400 py-6">No results for this search.</div>`;
    return;
  }
  const ranked = filtered.map(w => {
    const normVals = {}; keys.forEach(s => normVals[s] = normalizer.norm(s, Number(w[s]) || 0));
    const score = scoreByTarget(normVals, target01, keys);
    return { item: w, score };
  }).sort(sortByScore);
  grid.innerHTML = ranked.map(({ item, score }) => createWeaponCard(item, kind, score)).join('');
}

/** ===== Bindings ===== */
export function bindRankingSliders(kindProvider) {
  ['damage', 'rateOfFire', 'range', 'accuracy', 'bulletSpeed'].forEach(id => {
    const el = document.getElementById(`rank-${id}`);
    if (!el) return;
    el.addEventListener('input', () => {
      const lab = document.getElementById(`rank-${id}-val`);
      if (lab) lab.textContent = el.value;
      updateRankAndRender(kindProvider());
    });
  });
}

export function bindSearchInputs(kindProvider) {
  ['search-name', 'price-max', 'only-permanent'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const evt = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evt, () => updateRankAndRender(kindProvider()));
  });
}

export function setRankingPreset(name) {
  const GENERIC = {
    balanced: { damage: 50, rateOfFire: 50, range: 50, accuracy: 50, bulletSpeed: 50 },
    high_damage: { damage: 90, rateOfFire: 50, range: 60, accuracy: 50, bulletSpeed: 50 },
    high_accuracy: { damage: 60, rateOfFire: 40, range: 60, accuracy: 90, bulletSpeed: 50 },
    long_range: { damage: 60, rateOfFire: 40, range: 90, accuracy: 70, bulletSpeed: 60 },
    high_rof: { damage: 55, rateOfFire: 90, range: 50, accuracy: 55, bulletSpeed: 60 },
    fast_projectile: { damage: 55, rateOfFire: 55, range: 60, accuracy: 55, bulletSpeed: 90 },
  };
  const SHIELD = {
    shield_balanced: { damage: 50, rateOfFire: 50, range: 50, accuracy: 70, bulletSpeed: 70 },
    shield_tank: { damage: 40, rateOfFire: 30, range: 40, accuracy: 90, bulletSpeed: 90 },
    shield_anti_exp: { damage: 40, rateOfFire: 30, range: 50, accuracy: 95, bulletSpeed: 60 },
    shield_block: { damage: 40, rateOfFire: 30, range: 40, accuracy: 70, bulletSpeed: 95 },
  };
  const P = { ...GENERIC, ...SHIELD }[name] || GENERIC.balanced;
  const set = (id, v) => {
    const el = document.getElementById(`rank-${id}`);
    const lab = document.getElementById(`rank-${id}-val`);
    if (el) el.value = v;
    if (lab) lab.textContent = v;
  };
  Object.entries(P).forEach(([k, v]) => set(k, v));
  window.updateRankAndRender(window.CURRENT_KIND || 'rifles');
}

/** ===== Category init ===== */
export function fillWeaponSelect(selectEl, list) {
  if (!selectEl || !Array.isArray(list)) return;
  selectEl.innerHTML = `<option value="" selected disabled>Selecione</option>`;
  list.forEach((w, i) => {
    const opt = document.createElement('option');
    opt.value = i; opt.textContent = w.name;
    selectEl.appendChild(opt);
  });
}

export function initCategory(kind) {
  const cfg = UPGRADE_CFG[kind];
  const data = DATASETS[kind]();
  const s1 = document.getElementById(`${cfg.prefix}1-select`);
  const s2 = document.getElementById(`${cfg.prefix}2-select`);
  fillWeaponSelect(s1, data);
  fillWeaponSelect(s2, data);
  updateComparison(kind);
  updateRankAndRender(kind);
}

// Back-compat globals
window.updateComparison = updateComparison;
window.updateMasterUpgradeWeapon = updateMasterUpgradeWeapon;
window.changeUpgradeWeapon = changeUpgradeWeapon;
window.initCategory = initCategory;
window.bindRankingSliders = bindRankingSliders;
window.bindSearchInputs = bindSearchInputs;
window.setRankingPreset = setRankingPreset;
window.resetFilters = function resetFilters() {
  const q = document.getElementById('search-name');
  const p = document.getElementById('price-max');
  const c = document.getElementById('only-permanent');
  if (q) q.value = '';
  if (p) p.value = '';
  if (c) c.checked = false;
  setRankingPreset('balanced');
};
window.updateRankAndRender = updateRankAndRender;
