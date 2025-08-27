// app.js
import { syncTopNavActive } from './lib/ui-utils.js';
import { setActiveTopTabs, setActiveSubtabs } from './ui/nav.js';
import { renderCategoryPage, updateWeightsLabelsForKind } from './pages/weapons.page.js';
import { renderBundlesPage } from './pages/bundles.page.js';
import { toggleCollapse } from './ui/collapse.js';

// App state
window.CURRENT_KIND = 'rifles';

export function toggleMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('hidden');
}
window.toggleMobileMenu = toggleMobileMenu;

function setDynamicTitle(name) {
  const titleEl = document.getElementById('page-title');
  if (!titleEl) return;
  titleEl.textContent = (name === 'bundles') ? 'Bundles & Pets' : (name === 'dropguide') ? 'Drop Guide' : 'Weapon Analyzer';
}

export function showSection(name) {
  setActiveTopTabs(name);
  setDynamicTitle(name);
  const weaponsSubmenu = document.getElementById('weapons-submenu');
  if (weaponsSubmenu) weaponsSubmenu.classList.add('hidden');

  if (name === 'weapons') {
    showWeaponType(window.CURRENT_KIND || 'rifles');
  } else if (name === 'bundles') {
    renderBundlesPage();
    document.getElementById('bundles-compare-wrapper')?.classList.add('collapsed');
    document.getElementById('pets-compare-wrapper')?.classList.add('collapsed');
  } else {
    const c = document.getElementById('category-container');
    if (c) {
      c.innerHTML = `
        <div class="military-card rounded-xl p-6">
          <h3 class="font-bold text-blue-400 text-sm">Drop Guide</h3>
          <p class="text-gray-300 text-sm mt-2">Content coming soon.</p>
        </div>`;
    }
  }
}
window.showSection = showSection;

export function showWeaponType(kind) {
  window.CURRENT_KIND = kind;
  setActiveSubtabs(kind);
  renderCategoryPage(kind);
  updateWeightsLabelsForKind(kind);
}
window.showWeaponType = showWeaponType;

document.addEventListener('DOMContentLoaded', () => {
  syncTopNavActive();
  showSection('weapons');
  showWeaponType('rifles');
});
