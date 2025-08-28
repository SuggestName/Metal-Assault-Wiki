// pages/bundles.page.js
import { toggleCollapse } from '../ui/collapse.js';
import {
  initBundles,
  initPets,
  initWings,
  bindBundleSearchInputs,
  bindPetsSearchInputs,
  bindWingsSearchInputs,
  renderBundlesGridFiltered,
  renderPetsGridFiltered,
  renderWingsGridFiltered,
  updateComparisonBundles,
  updateComparisonPets,
  updateComparisonWings
} from '../features/bundles/engine.js';

export function showBundlesInner(which) {
  const b = document.getElementById('bundles-section');
  const p = document.getElementById('pets-section');
  const w = document.getElementById('wings-section');

  const tb = document.getElementById('bundles-tab-inner');
  const tp = document.getElementById('pets-tab-inner');
  const tw = document.getElementById('wings-tab-inner');

  const showB = which === 'bundles';
  const showP = which === 'pets';
  const showW = which === 'wings';

  b?.classList.toggle('hidden', !showB);
  p?.classList.toggle('hidden', !showP);
  w?.classList.toggle('hidden', !showW);

  [[tb, showB], [tp, showP], [tw, showW]].forEach(([el, on]) => {
    if (!el) return;
    el.classList.toggle('bg-blue-600', on);
    el.classList.toggle('text-white', on);
    el.classList.toggle('bg-gray-600', !on);
    el.classList.toggle('text-gray-300', !on);
  });
}
window.showBundlesInner = showBundlesInner;

export function renderBundlesPage() {
  const c = document.getElementById('category-container');
  if (!c) return;

  c.innerHTML = `
    <div class="mb-6 p-4 military-card rounded-xl">
      <h2 class="text-xl font-bold text-blue-400 mb-4 text-center">BUNDLE CATEGORIES</h2>
      <div class="flex justify-center gap-3">
        <button id="bundles-tab-inner" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">BUNDLES</button>
        <button id="pets-tab-inner" class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">PETS</button>
        <button id="wings-tab-inner" class="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold">WINGS</button>
      </div>
    </div>

    <section id="bundles-section" class="space-y-6">
      <div id="bundles-compare-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="bundles-compare-head">
          <h3 class="font-bold text-blue-400 text-sm">Bundle Comparator</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="bundles-compare-content" class="hidden p-3">
          <div class="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="text-xs text-gray-300">Bundle 1</label>
              <select id="bundle1-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                <option value="" selected disabled>Select Bundle</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-300">Bundle 2</label>
              <select id="bundle2-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                <option value="" selected disabled>Select Bundle</option>
              </select>
            </div>
          </div>
          <div id="bundles-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
        </div>
      </div>

      <div id="bundles-search-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="bundles-search-head">
          <h3 class="font-bold text-blue-400 text-sm">Search</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="bundles-search-content" class="hidden p-4">
          <div class="grid md:grid-cols-3 gap-3">
            <input id="bundle-search-name" type="text" placeholder="Name" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
            <input id="bundle-price-max" type="number" min="0" step="1" placeholder="Max price" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
            <label class="inline-flex items-center gap-2 text-sm">
              <input id="bundle-only-permanent" type="checkbox" class="accent-blue-500">
              <span class="text-gray-300">Permanent only</span>
            </label>
          </div>
          <div class="flex justify-end mt-3">
            <button id="bundle-filters-clear" class="px-3 py-1.5 rounded-lg border border-gray-500 hover:bg-gray-700 text-xs">Clear</button>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-blue-400">Bundles</h3>
      <div id="bundles-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </section>

    <section id="pets-section" class="space-y-6 hidden">
      <div id="pets-compare-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="pets-compare-head">
          <h3 class="font-bold text-blue-400 text-sm">Pet Comparator</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="pets-compare-content" class="hidden p-3">
          <div class="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="text-xs text-gray-300">Pet 1</label>
              <select id="pet1-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                <option value="" selected disabled>Select Pet</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-300">Pet 2</label>
              <select id="pet2-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                <option value="" selected disabled>Select Pet</option>
              </select>
            </div>
          </div>
          <div id="pets-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
        </div>
      </div>

      <div id="pets-search-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="pets-search-head">
          <h3 class="font-bold text-blue-400 text-sm">Search</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="pets-search-content" class="hidden p-4">
          <div class="grid md:grid-cols-3 gap-3">
            <input id="pet-search-name" type="text" placeholder="Name" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
          </div>
          <div class="flex justify-end mt-3">
            <button id="pet-filters-clear" class="px-3 py-1.5 rounded-lg border border-gray-500 hover:bg-gray-700 text-xs">Clear</button>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-blue-400">Pets</h3>
      <div id="pets-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </section>

    <section id="wings-section" class="space-y-6 hidden">
      <div id="wings-compare-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="wings-compare-head">
          <h3 class="font-bold text-blue-400 text-sm">Wing Comparator</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="wings-compare-content" class="hidden p-3">
          <div class="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="text-xs text-gray-300">Wing 1</label>
              <select id="wing1-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                <option value="" selected disabled>Select Wing</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-300">Wing 2</label>
              <select id="wing2-select" class="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm">
                <option value="" selected disabled>Select Wing</option>
              </select>
            </div>
          </div>
          <div id="wings-comparison-display" class="grid md:grid-cols-2 gap-3"></div>
        </div>
      </div>

      <div id="wings-search-wrapper" class="military-card rounded-xl">
        <div class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer" id="wings-search-head">
          <h3 class="font-bold text-blue-400 text-sm">Search</h3>
          <span class="chev text-lg">▾</span>
        </div>
        <div id="wings-search-content" class="hidden p-4">
          <div class="grid md:grid-cols-3 gap-3">
            <input id="wing-search-name" type="text" placeholder="Name" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
            <input id="wing-price-max" type="number" min="0" step="1" placeholder="Max price" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
          </div>
          <div class="flex justify-end mt-3">
            <button id="wing-filters-clear" class="px-3 py-1.5 rounded-lg border border-gray-500 hover:bg-gray-700 text-xs">Clear</button>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-blue-400">Wings</h3>
      <div id="wings-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </section>
  `;

  // Colapsáveis
  document.getElementById('bundles-compare-head')?.addEventListener('click', () => toggleCollapse('bundles-compare-wrapper', 'bundles-compare-content'));
  document.getElementById('pets-compare-head')?.addEventListener('click', () => toggleCollapse('pets-compare-wrapper', 'pets-compare-content'));
  document.getElementById('wings-compare-head')?.addEventListener('click', () => toggleCollapse('wings-compare-wrapper', 'wings-compare-content'));
  document.getElementById('bundles-search-head')?.addEventListener('click', () => toggleCollapse('bundles-search-wrapper', 'bundles-search-content'));
  document.getElementById('pets-search-head')?.addEventListener('click', () => toggleCollapse('pets-search-wrapper', 'pets-search-content'));
  document.getElementById('wings-search-head') ?.addEventListener('click', () => toggleCollapse('wings-search-wrapper', 'wings-search-content'));

  // Dados + listas
  initBundles();
  initPets();
  initWings();

  // Compare: listeners corretos
  document.getElementById('bundle1-select')?.addEventListener('change', () => updateComparisonBundles());
  document.getElementById('bundle2-select')?.addEventListener('change', () => updateComparisonBundles());
  document.getElementById('pet1-select')?.addEventListener('change', () => updateComparisonPets());
  document.getElementById('pet2-select')?.addEventListener('change', () => updateComparisonPets());
  document.getElementById('wing1-select')?.addEventListener('change', () => updateComparisonWings());
  document.getElementById('wing2-select')?.addEventListener('change', () => updateComparisonWings());


  // Busca: bind e primeira render
  bindBundleSearchInputs();
  bindPetsSearchInputs();
  bindWingsSearchInputs();

  renderBundlesGridFiltered();
  renderPetsGridFiltered();
  renderWingsGridFiltered();

  // Tabs internas
  document.getElementById('bundles-tab-inner')?.addEventListener('click', () => showBundlesInner('bundles'));
  document.getElementById('pets-tab-inner')   ?.addEventListener('click', () => showBundlesInner('pets'));
  document.getElementById('wings-tab-inner')  ?.addEventListener('click', () => showBundlesInner('wings'));

  // Abre Bundles por padrão
  showBundlesInner('bundles');
}
window.renderBundlesPage = renderBundlesPage;
