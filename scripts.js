// scripts.js

window.CURRENT_KIND = 'rifles';

function toggleMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('hidden');
}

// Marca visual dos botões de topo e aciona o render da seção
function showSection(name) {
  // Estado visual dos botões do topo
  ['weapons', 'bundles', 'dropguide'].forEach(n => {
    const on = (n === name);
    [document.getElementById(`${n}-tab`), document.getElementById(`${n}-tab-desktop`)]
      .forEach(btn => {
        if (!btn) return;
        btn.classList.toggle('bg-blue-600', on);
        btn.classList.toggle('text-white', on);
        btn.classList.toggle('bg-gray-600', !on);
        btn.classList.toggle('text-gray-300', !on);
      });
  });

  // Título dinâmico e visibilidade do submenu de Weapons
  const titleEl = document.getElementById('page-title');
  const weaponsSubmenu = document.getElementById('weapons-submenu');
  if (titleEl) titleEl.textContent = (name === 'bundles') ? 'Bundles & Pets' :
    (name === 'dropguide') ? 'Drop Guide' : 'Weapon Analyzer';
  if (weaponsSubmenu) weaponsSubmenu.classList.toggle('hidden', name !== 'weapons');

  // Render de conteúdo dinâmico
  if (name === 'weapons') {
    showWeaponType(window.CURRENT_KIND || 'rifles');
  } else if (name === 'bundles') {
    renderBundlesPage();                                    // monta a página
    document.getElementById('bundles-compare-wrapper')?.classList.add('collapsed');
    document.getElementById('pets-compare-wrapper')?.classList.add('collapsed');

    // popula selects + grids (dados já incluídos no HTML)
    if (typeof initBundles === 'function') initBundles();
    if (typeof initPets === 'function') initPets();

    // aba interna padrão
    if (typeof showBundlesInner === 'function') showBundlesInner('bundles');
  } else {
    const c = document.getElementById('category-container');
    if (c) {
      c.innerHTML = `
        <div class="military-card rounded-xl p-6">
          <h3 class="font-bold text-blue-400 text-sm">Drop Guide</h3>
          <p class="text-gray-300 text-sm mt-2">Content coming soon.</p>
        </div>
      `;
    }
  }
}

// SUBTABS (Weapons)
function setActiveSubtabs(kind) {
  const kinds = ['rifles', 'snipers', 'bazookas', 'pistols', 'shotguns', 'shields'];
  kinds.forEach(k => {
    const on = (k === kind);
    [document.getElementById(`${k}-subtab`), document.getElementById(`${k}-subtab-desktop`)]
      .forEach(btn => {
        if (!btn) return;
        btn.classList.toggle('bg-blue-600', on);
        btn.classList.toggle('text-white', on);
        btn.classList.toggle('bg-gray-600', !on);
        btn.classList.toggle('text-gray-300', !on);
      });
  });
}

function updateWeightsLabelsForKind(kind) {
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

// Collapse genérico
function toggleCollapse(wrapperId, contentId) {
  const wrap = document.getElementById(wrapperId);
  const cont = document.getElementById(contentId);
  if (!wrap || !cont) return;
  wrap.classList.toggle('collapsed');
  cont.classList.toggle('hidden');
}

// Presets coloridos (Weapons) — permanece igual
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

// Weapons (página dinâmica já existente)
function renderCategoryPage(kind) {
  const cfg = UPGRADE_CFG[kind];
  const c = document.getElementById('category-container');
  if (!c || !cfg) return;

  c.innerHTML = `
    <!-- WEAPON COMPARE (collapsed by default) -->
    <div id="compare-wrapper" class="military-card rounded-xl">
      <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer"
           onclick="toggleCollapse('compare-wrapper','compare-content')">
        <h3 class="font-bold text-blue-400 text-sm">Weapon Compare</h3>
        <span class="chev text-lg">▾</span>
      </div>
      <div id="compare-content" class="hidden p-3">
        <div class="grid md:grid-cols-2 gap-3 mb-3">
          <div>
            <label class="text-xs text-gray-300">Select 1</label>
            <select id="${cfg.prefix}1-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm"
                    onchange="updateComparison('${kind}')">
              <option value="" selected disabled>Select</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-300">Select 2</label>
            <select id="${cfg.prefix}2-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm"
                    onchange="updateComparison('${kind}')">
              <option value="" selected disabled>Select</option>
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3 mb-3">
          <div>
            <label class="text-xs text-gray-300">Master Upgrade #1: <span id="${cfg.prefix}1-master-display" class="text-blue-300">+0</span></label>
            <input id="${cfg.prefix}1-master-upgrade" type="range" min="0" max="15" value="0" class="w-full"
                   onchange="updateMasterUpgradeWeapon('${kind}',1)">
          </div>
          <div>
            <label class="text-xs text-gray-300">Master Upgrade #2: <span id="${cfg.prefix}2-master-display" class="text-blue-300">+0</span></label>
            <input id="${cfg.prefix}2-master-upgrade" type="range" min="0" max="15" value="0" class="w-full"
                   onchange="updateMasterUpgradeWeapon('${kind}',2)">
          </div>
        </div>

        <div id="${kind}-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
      </div>
    </div>

    <!-- SEARCH (collapsed by default) -->
    <div id="search-wrapper" class="military-card rounded-xl">
      <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer"
           onclick="toggleCollapse('search-wrapper','search-content')">
        <h3 class="font-bold text-blue-400 text-sm">Search</h3>
        <span class="chev text-lg">▾</span>
      </div>
      <div id="search-content" class="hidden p-4">
        <div class="grid md:grid-cols-3 gap-3">
          <input id="search-name" type="text" placeholder="Name" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
          <input id="price-max" type="number" min="0" step="1" placeholder="Max price" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
          <label class="inline-flex items-center gap-2 text-sm">
            <input id="only-permanent" type="checkbox" class="accent-blue-500">
            <span class="text-gray-300">Permanent only</span>
          </label>
        </div>
        <div class="flex justify-end mt-3">
          <button onclick="resetFilters()" class="px-3 py-1.5 rounded-lg border border-gray-500 hover:bg-gray-700 text-xs">Clear</button>
        </div>
      </div>
    </div>

    <!-- RANKING (collapsed by default) -->
    <div id="rank-wrapper" class="military-card rounded-xl">
      <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer"
           onclick="toggleCollapse('rank-wrapper','rank-content')">
        <h3 class="font-bold text-blue-400 text-sm">Ranking by Profile</h3>
        <span class="chev text-lg">▾</span>
      </div>
      <div id="rank-content" class="hidden p-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <div class="flex justify-between text-xs text-gray-300">
              <span id="rank-damage-label">Damage</span><span id="rank-damage-val" class="text-gray-400">50</span>
            </div>
            <input id="rank-damage" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300">
              <span id="rank-rateOfFire-label">Rate of Fire</span><span id="rank-rateOfFire-val" class="text-gray-400">50</span>
            </div>
            <input id="rank-rateOfFire" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300">
              <span id="rank-range-label">Range</span><span id="rank-range-val" class="text-gray-400">50</span>
            </div>
            <input id="rank-range" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300">
              <span id="rank-accuracy-label">Accuracy</span><span id="rank-accuracy-val" class="text-gray-400">50</span>
            </div>
            <input id="rank-accuracy" type="range" min="0" max="100" value="50" class="w-full">
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-300">
              <span id="rank-bulletSpeed-label">Bullet Speed</span><span id="rank-bulletSpeed-val" class="text-gray-400">50</span>
            </div>
            <input id="rank-bulletSpeed" type="range" min="0" max="100" value="50" class="w-full">
          </div>
        </div>
        ${renderPresetButtons(kind)}
      </div>
    </div>

    <!-- GRID -->
    <h3 class="text-xl font-bold text-blue-400">Armory</h3>
    <div id="${kind}-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
  `;
}

// Página Bundles (duas seções: Bundles + Pets)
function renderBundlesPage() {
  const c = document.getElementById('category-container');
  if (!c) return;

  c.innerHTML = `
    <!-- BUNDLE CATEGORIES -->
    <div class="mb-6 p-4 military-card rounded-xl">
      <h2 class="text-xl font-bold text-blue-400 mb-4 text-center">BUNDLE CATEGORIES</h2>
      <div class="flex justify-center gap-3">
        <button id="bundles-tab-inner" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold"
                onclick="showBundlesInner('bundles')">🧰 BUNDLES</button>
        <button id="pets-tab-inner" class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold"
                onclick="showBundlesInner('pets')">🐾 PETS</button>
      </div>
    </div>

    <!-- BUNDLES (Compare + Grid) -->
    <section id="bundles-section" class="space-y-6">
      <div id="bundles-compare-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer"
             onclick="toggleCollapse('bundles-compare-wrapper','bundles-compare-content')">
          <h3 class="font-bold text-blue-400 text-sm">Bundle Comparator</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="bundles-compare-content" class="hidden p-3">
          <div class="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="text-xs text-gray-300">Bundle 1</label>
              <select id="bundle1-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm"
                      onchange="updateComparisonBundles()">
                <option value="" selected disabled>Select Bundle</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-300">Bundle 2</label>
              <select id="bundle2-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm"
                      onchange="updateComparisonBundles()">
                <option value="" selected disabled>Select Bundle</option>
              </select>
            </div>
          </div>
          <div id="bundles-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-blue-400">Available Bundles</h3>
      <div id="bundles-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </section>

    <!-- PETS (Compare + Grid) -->
    <section id="pets-section" class="space-y-6 hidden">
      <div id="pets-compare-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer"
             onclick="toggleCollapse('pets-compare-wrapper','pets-compare-content')">
          <h3 class="font-bold text-blue-400 text-sm">Pet Comparator</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="pets-compare-content" class="hidden p-3">
          <div class="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="text-xs text-gray-300">Pet 1</label>
              <select id="pet1-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm"
                      onchange="updateComparisonPets()">
                <option value="" selected disabled>Select Pet</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-300">Pet 2</label>
              <select id="pet2-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm"
                      onchange="updateComparisonPets()">
                <option value="" selected disabled>Select Pet</option>
              </select>
            </div>
          </div>
          <div id="pets-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-blue-400">Available Pets</h3>
      <div id="pets-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </section>
  `;

  // inicia ambos comparadores colapsados
  document.getElementById('bundles-compare-wrapper')?.classList.add('collapsed');
  document.getElementById('pets-compare-wrapper')?.classList.add('collapsed');

  // popula selects + grids
  if (typeof initBundles === 'function') initBundles();
  if (typeof initPets === 'function') initPets();

  // aba interna padrão
  showBundlesInner('bundles');
}

// Switch de categoria (Weapons)
function showWeaponType(kind) {
  window.CURRENT_KIND = kind;
  setActiveSubtabs(kind);
  renderCategoryPage(kind);
  updateWeightsLabelsForKind(kind);

  if (typeof initCategory === 'function') initCategory(kind);
  if (typeof bindRankingSliders === 'function') bindRankingSliders(() => window.CURRENT_KIND);
  if (typeof bindSearchInputs === 'function') bindSearchInputs(() => window.CURRENT_KIND);

  if (typeof setRankingPreset === 'function') {
    setRankingPreset(kind === 'shields' ? 'shield_balanced' : 'balanced');
  }

  // Iniciam colapsados
  document.getElementById('compare-wrapper')?.classList.add('collapsed');
  document.getElementById('search-wrapper')?.classList.add('collapsed');
  document.getElementById('rank-wrapper')?.classList.add('collapsed');

  if (typeof updateRankAndRender === 'function') updateRankAndRender(kind);
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  showSection('weapons');
  showWeaponType('rifles');
});

// Expor globais usadas em atributos HTML
window.showSection = showSection;
window.toggleMobileMenu = toggleMobileMenu;
window.showWeaponType = showWeaponType;
window.toggleCollapse = toggleCollapse;

window.showBundlesInner = function (which) {
  const b = document.getElementById('bundles-section');
  const p = document.getElementById('pets-section');
  const tb = document.getElementById('bundles-tab-inner');
  const tp = document.getElementById('pets-tab-inner');

  const showB = which === 'bundles';
  b?.classList.toggle('hidden', !showB);
  p?.classList.toggle('hidden', showB);

  tb?.classList.toggle('bg-blue-600', showB);
  tb?.classList.toggle('text-white', showB);
  tb?.classList.toggle('bg-gray-600', !showB);
  tb?.classList.toggle('text-gray-300', !showB);

  tp?.classList.toggle('bg-blue-600', !showB);
  tp?.classList.toggle('text-white', !showB);
  tp?.classList.toggle('bg-gray-600', showB);
  tp?.classList.toggle('text-gray-300', showB);
};
