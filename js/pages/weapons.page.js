// pages/weapons.page.js
import { UPGRADE_CFG } from '../data/datasets.js';
import { toggleCollapse } from '../ui/collapse.js';
import { initCategory, bindRankingSliders, bindSearchInputs, updateRankAndRender, setRankingPreset } from '../features/weapons/engine.js';

function setActiveInnerWeapon(kind) {
  const kinds = ['rifles', 'snipers', 'bazookas', 'pistols', 'shotguns', 'shields'];
  kinds.forEach(k => {
    const on = (k === kind);
    const btn = document.getElementById(`${k}-tab-inner`);
    if (!btn) return;
    btn.classList.toggle('bg-blue-600', on);
    btn.classList.toggle('text-white', on);
    btn.classList.toggle('bg-gray-600', !on);
    btn.classList.toggle('text-gray-300', !on);
  });
}

export function updateWeightsLabelsForKind(kind) {
  const acc = document.getElementById('rank-accuracy-label');
  const bs = document.getElementById('rank-bulletSpeed-label');
  if (!acc || !bs) return;
  if (kind === 'shields') {
    acc.textContent = 'Explosion Defense';
    bs.textContent = 'Defense';
  } else {
    acc.textContent = 'Accuracy';
    bs.textContent = 'Bullet Speed';
  }
}

function renderPresetButtons(kind) {
  if (kind === 'shields') {
    return `
      <div class="flex flex-wrap gap-2 mt-2">
        <button class="px-3 py-1 rounded-lg text-xs bg-violet-700 hover:bg-violet-600" onclick="setRankingPreset('shield_balanced')">Balanced Shield</button>
        <button class="px-3 py-1 rounded-lg text-xs bg-green-700 hover:bg-green-600"  onclick="setRankingPreset('shield_tank')">Tank</button>
        <button class="px-3 py-1 rounded-lg text-xs bg-amber-700 hover:bg-amber-600"  onclick="setRankingPreset('shield_anti_exp')">Anti-Explosion</button>
        <button class="px-3 py-1 rounded-lg text-xs bg-cyan-700 hover:bg-cyan-600"   onclick="setRankingPreset('shield_block')">Block Specialist</button>
      </div>
    `;
  }
  return `
    <div class="flex flex-wrap gap-2 mt-2">
      <button class="px-3 py-1 rounded-lg text-xs bg-slate-700 hover:bg-slate-600"   onclick="setRankingPreset('balanced')">Balanced</button>
      <button class="px-3 py-1 rounded-lg text-xs bg-rose-700 hover:bg-rose-600"     onclick="setRankingPreset('high_damage')">High Damage</button>
      <button class="px-3 py-1 rounded-lg text-xs bg-emerald-700 hover:bg-emerald-600" onclick="setRankingPreset('high_accuracy')">High Accuracy</button>
      <button class="px-3 py-1 rounded-lg text-xs bg-indigo-700 hover:bg-indigo-600" onclick="setRankingPreset('long_range')">Long Range</button>
      <button class="px-3 py-1 rounded-lg text-xs bg-orange-700 hover:bg-orange-600" onclick="setRankingPreset('high_rof')">High Fire Rate</button>
      <button class="px-3 py-1 rounded-lg text-xs bg-sky-700 hover:bg-sky-600"       onclick="setRankingPreset('fast_projectile')">Fast Projectile</button>
    </div>
  `;
}

export function renderCategoryPage(kind) {
  const c = document.getElementById('category-container');
  if (!c) return;

  c.innerHTML = `
    <!-- WEAPON CATEGORIES (igual Bundles) -->
    <div class="mb-6 p-4 military-card rounded-xl">
      <h2 class="text-xl font-bold text-blue-400 mb-4 text-center">WEAPON CATEGORIES</h2>
      <div class="flex justify-center gap-3 flex-wrap">
        <button id="rifles-tab-inner"   class="px-4 py-2 rounded-lg text-sm font-bold">Rifles</button>
        <button id="snipers-tab-inner"  class="px-4 py-2 rounded-lg text-sm font-bold">Snipers</button>
        <button id="bazookas-tab-inner" class="px-4 py-2 rounded-lg text-sm font-bold">Bazookas</button>
        <button id="pistols-tab-inner"  class="px-4 py-2 rounded-lg text-sm font-bold">Pistols</button>
        <button id="shotguns-tab-inner" class="px-4 py-2 rounded-lg text-sm font-bold">Shotguns</button>
        <button id="shields-tab-inner"  class="px-4 py-2 rounded-lg text-sm font-bold">Shields</button>
      </div>
    </div>

    <!-- Compare -->
    <div id="compare-wrapper" class="military-card rounded-xl mb-6">
      <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="compare-head">
        <h3 class="font-bold text-blue-400 text-sm">Weapon Comparator</h3>
        <span class="chev text-lg">▾</span>
      </div>
      <div id="compare-content" class="hidden p-4">
        <div class="grid md:grid-cols-2 gap-3 mb-4">
          <div>
            <label class="text-xs text-gray-300 block mb-1">Weapon 1</label>
            <select id="${UPGRADE_CFG[kind].prefix}1-select" class="w-full h-9 px-2 bg-gray-800 border border-gray-600 rounded text-sm"></select>
          </div>
          <div>
            <label class="text-xs text-gray-300 block mb-1">Weapon 2</label>
            <select id="${UPGRADE_CFG[kind].prefix}2-select" class="w-full h-9 px-2 bg-gray-800 border border-gray-600 rounded text-sm"></select>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3 mb-2">
          <div>
            <label class="text-xs text-gray-300 block mb-1">
              Master Upgrade #1: <span id="${UPGRADE_CFG[kind].prefix}1-master-display" class="text-blue-300">+0</span>
            </label>
            <input id="${UPGRADE_CFG[kind].prefix}1-master-upgrade" type="range" min="0" max="15" value="0" class="w-full">
          </div>
          <div>
            <label class="text-xs text-gray-300 block mb-1">
              Master Upgrade #2: <span id="${UPGRADE_CFG[kind].prefix}2-master-display" class="text-blue-300">+0</span>
            </label>
            <input id="${UPGRADE_CFG[kind].prefix}2-master-upgrade" type="range" min="0" max="15" value="0" class="w-full">
          </div>
        </div>

        <div id="${kind}-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
      </div>
    </div>

    <!-- Search -->
    <div id="search-wrapper" class="military-card rounded-xl mb-6">
      <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="search-head">
        <h3 class="font-bold text-blue-400 text-sm">Search</h3>
        <span class="chev text-lg">▾</span>
      </div>
      <div id="search-content" class="hidden p-4">
        <div class="grid md:grid-cols-3 gap-3">
          <input id="search-name" type="text" placeholder="Name" class="h-9 px-2 bg-gray-800 border border-gray-600 rounded text-sm">
          <input id="price-max" type="number" min="0" step="1" placeholder="Max price" class="h-9 px-2 bg-gray-800 border border-gray-600 rounded text-sm">
          <label class="inline-flex items-center gap-2 text-sm">
            <input id="only-permanent" type="checkbox" class="accent-blue-500">
            <span class="text-gray-300">Permanent only</span>
          </label>
        </div>
        <div class="flex justify-end mt-3">
          <button id="filters-clear" class="px-3 py-1.5 rounded-lg border border-gray-500 hover:bg-gray-700 text-xs">Clear</button>
        </div>
      </div>
    </div>

    <!-- Ranking -->
    <div id="rank-wrapper" class="military-card rounded-xl mb-6">
      <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="rank-head">
        <h3 class="font-bold text-blue-400 text-sm">Ranking by Profile</h3>
        <span class="chev text-lg">▾</span>
      </div>
      <div id="rank-content" class="hidden p-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <div class="flex justify-between text-xs text-gray-300"><span id="rank-damage-label">Damage</span><span id="rank-damage-val" class="text-gray-400">50</span></div>
            <input id="rank-damage" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300"><span id="rank-rateOfFire-label">Rate of Fire</span><span id="rank-rateOfFire-val" class="text-gray-400">50</span></div>
            <input id="rank-rateOfFire" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300"><span id="rank-range-label">Range</span><span id="rank-range-val" class="text-gray-400">50</span></div>
            <input id="rank-range" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300"><span id="rank-accuracy-label">Accuracy</span><span id="rank-accuracy-val" class="text-gray-400">50</span></div>
            <input id="rank-accuracy" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300"><span id="rank-bulletSpeed-label">Bullet Speed</span><span id="rank-bulletSpeed-val" class="text-gray-400">50</span></div>
            <input id="rank-bulletSpeed" type="range" min="0" max="100" value="50" class="w-full">
          </div>
        </div>
        ${renderPresetButtons(kind)}
      </div>
    </div>

    <!-- Lista -->
    <h3 class="text-xl font-bold text-blue-400 mb-2">${{
      rifles: 'Rifles', snipers: 'Snipers', bazookas: 'Bazookas',
      pistols: 'Pistols', shotguns: 'Shotguns', shields: 'Shields'
    }[kind] || 'Weapons'}</h3>
    <div id="${kind}-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
  `;

  // Collapses
  document.getElementById('compare-head')?.addEventListener('click', () => toggleCollapse('compare-wrapper', 'compare-content'));
  document.getElementById('search-head')?.addEventListener('click', () => toggleCollapse('search-wrapper', 'search-content'));
  document.getElementById('rank-head')?.addEventListener('click', () => toggleCollapse('rank-wrapper', 'rank-content'));

  // Botões internos de categoria (estilo Bundles)
  document.getElementById('rifles-tab-inner')?.addEventListener('click', () => showWeaponType('rifles'));
  document.getElementById('snipers-tab-inner')?.addEventListener('click', () => showWeaponType('snipers'));
  document.getElementById('bazookas-tab-inner')?.addEventListener('click', () => showWeaponType('bazookas'));
  document.getElementById('pistols-tab-inner')?.addEventListener('click', () => showWeaponType('pistols'));
  document.getElementById('shotguns-tab-inner')?.addEventListener('click', () => showWeaponType('shotguns'));
  document.getElementById('shields-tab-inner')?.addEventListener('click', () => showWeaponType('shields'));

  // Init + binds
  initCategory(kind);
  bindRankingSliders(() => window.CURRENT_KIND);
  bindSearchInputs(() => window.CURRENT_KIND);

  // Compare: updates imediatos
  const pfx = UPGRADE_CFG[kind].prefix;
  document.getElementById(`${pfx}1-select`)?.addEventListener('change', () => updateComparison(kind));
  document.getElementById(`${pfx}2-select`)?.addEventListener('change', () => updateComparison(kind));
  document.getElementById(`${pfx}1-master-upgrade`)?.addEventListener('input', () => updateMasterUpgradeWeapon(kind, 1));
  document.getElementById(`${pfx}2-master-upgrade`)?.addEventListener('input', () => updateMasterUpgradeWeapon(kind, 2));

  // Visual ativo do botão da categoria interna
  setActiveInnerWeapon(kind);

  // Preset e estado inicial igual Bundles
  setRankingPreset(kind === 'shields' ? 'shield_balanced' : 'balanced');
  document.getElementById('compare-wrapper')?.classList.add('collapsed');
  document.getElementById('search-wrapper')?.classList.add('collapsed');
  document.getElementById('rank-wrapper')?.classList.add('collapsed');

  updateWeightsLabelsForKind(kind);
  updateRankAndRender(kind);
}
