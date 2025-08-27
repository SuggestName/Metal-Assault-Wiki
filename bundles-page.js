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
