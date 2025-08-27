// bundles-page.js
(function () {
    function toggleCollapse(wrapperId, contentId) {
        const wrap = document.getElementById(wrapperId);
        const cont = document.getElementById(contentId);
        if (!wrap || !cont) return;
        wrap.classList.toggle('collapsed');
        cont.classList.toggle('hidden');
    }

    function showBundlesInner(which) {
        const b = document.getElementById('bundles-section');
        const p = document.getElementById('pets-section');
        const tb = document.getElementById('bundles-tab-inner');
        const tp = document.getElementById('pets-tab-inner');
        const showB = which === 'bundles';
        if (b) b.classList.toggle('hidden', !showB);
        if (p) p.classList.toggle('hidden', showB);
        if (tb) {
            tb.classList.toggle('bg-blue-600', showB);
            tb.classList.toggle('text-white', showB);
            tb.classList.toggle('bg-gray-600', !showB);
            tb.classList.toggle('text-gray-300', !showB);
        }
        if (tp) {
            tp.classList.toggle('bg-blue-600', !showB);
            tp.classList.toggle('text-white', !showB);
            tp.classList.toggle('bg-gray-600', showB);
            tp.classList.toggle('text-gray-300', showB);
        }
    }


    // Cria o cartão "Search" para Bundles se não existir (igual Weapons)
    function ensureBundlesSearchUI() {
        if (document.getElementById('bundles-search-wrapper')) return;
        const grid = document.getElementById('bundles-grid');
        if (!grid) return;
        const wrap = document.createElement('div');
        wrap.id = 'bundles-search-wrapper';
        wrap.className = 'military-card rounded-xl';
        wrap.innerHTML = `
          <div id="bundles-search-head" class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer">
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
              <button onclick="resetBundleFilters()" class="px-3 py-1.5 rounded-lg border border-gray-500 hover:bg-gray-700 text-xs">Clear</button>
            </div>
          </div>
        `;
        grid.parentElement.insertBefore(wrap, grid);
        // collapse por padrão e bind do cabeçalho
        wrap.classList.add('collapsed');
        document.getElementById('bundles-search-head')?.addEventListener('click', () =>
            toggleCollapse('bundles-search-wrapper', 'bundles-search-content'));
        // binds dos inputs + primeira render
        if (typeof bindBundleSearchInputs === 'function') bindBundleSearchInputs();
        if (typeof renderBundlesGridFiltered === 'function') renderBundlesGridFiltered();
    }

    // Cria o cartão "Search" para Pets se não existir
    function ensurePetsSearchUI() {
        if (document.getElementById('pets-search-wrapper')) return;
        const grid = document.getElementById('pets-grid');
        if (!grid) return;
        const wrap = document.createElement('div');
        wrap.id = 'pets-search-wrapper';
        wrap.className = 'military-card rounded-xl';
        wrap.innerHTML = `
          <div id="pets-search-head" class="flex items-center justify-between p-3 border-b border-gray-700 cursor-pointer">
            <h3 class="font-bold text-blue-400 text-sm">Search</h3>
            <span class="chev text-lg">▾</span>
          </div>
          <div id="pets-search-content" class="hidden p-4">
            <div class="grid md:grid-cols-3 gap-3">
              <input id="pet-search-name" type="text" placeholder="Name" class="p-2 bg-gray-800 border border-gray-600 rounded text-sm">
            </div>
            <div class="flex justify-end mt-3">
              <button onclick="resetPetsFilters()" class="px-3 py-1.5 rounded-lg border border-gray-500 hover:bg-gray-700 text-xs">Clear</button>
            </div>
          </div>
        `;
        grid.parentElement.insertBefore(wrap, grid);
        wrap.classList.add('collapsed');
        document.getElementById('pets-search-head')?.addEventListener('click', () =>
            toggleCollapse('pets-search-wrapper', 'pets-search-content'));
        if (typeof bindPetsSearchInputs === 'function') bindPetsSearchInputs();
        if (typeof renderPetsGridFiltered === 'function') renderPetsGridFiltered();
    }
    function render() {
        const c = document.getElementById('category-container');
        if (!c) return;

        // colapsar por padrão
        document.getElementById('bundles-compare-wrapper')?.classList.add('collapsed');
        document.getElementById('pets-compare-wrapper')?.classList.add('collapsed');

        // tabs internas
        document.getElementById('bundles-tab-inner')?.addEventListener('click', () => showBundlesInner('bundles'));
        document.getElementById('pets-tab-inner')?.addEventListener('click', () => showBundlesInner('pets'));

        // collapse headers
        document.getElementById('bundles-compare-head')?.addEventListener('click', () =>
            toggleCollapse('bundles-compare-wrapper', 'bundles-compare-content'));
        document.getElementById('pets-compare-head')?.addEventListener('click', () =>
            toggleCollapse('pets-compare-wrapper', 'pets-compare-content'));

        // popula grids + selects
        if (typeof initBundles === 'function') initBundles();
        if (typeof initPets === 'function') initPets();

        // garantir UI de busca (injeta se não existir)
        ensureBundlesSearchUI();
        ensurePetsSearchUI();

        // binds dos selects (sem inline)
        document.getElementById('bundle1-select')?.addEventListener('change', () => updateComparisonBundles());
        document.getElementById('bundle2-select')?.addEventListener('change', () => updateComparisonBundles());
        document.getElementById('pet1-select')?.addEventListener('change', () => updateComparisonPets());
        document.getElementById('pet2-select')?.addEventListener('change', () => updateComparisonPets());

        // aba padrão
        showBundlesInner('bundles');
    }

    document.addEventListener('DOMContentLoaded', render);
})();
