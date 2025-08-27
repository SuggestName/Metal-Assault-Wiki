// ui/nav.js
export function setActiveTopTabs(name) {
  ['weapons', 'bundles', 'dropguide'].forEach(n => {
    const on = (n === name);
    [document.getElementById(`${n}-tab`), document.getElementById(`${n}-tab-desktop`)].forEach(btn => {
      if (!btn) return;
      btn.classList.toggle('bg-blue-600', on);
      btn.classList.toggle('text-white', on);
      btn.classList.toggle('bg-gray-600', !on);
      btn.classList.toggle('text-gray-300', !on);
    });
  });
}

export function setActiveSubtabs(kind) {
  const kinds = ['rifles', 'snipers', 'bazookas', 'pistols', 'shotguns', 'shields'];
  kinds.forEach(k => {
    const on = (k === kind);
    [document.getElementById(`${k}-subtab`), document.getElementById(`${k}-subtab-desktop`)].forEach(btn => {
      if (!btn) return;
      btn.classList.toggle('bg-blue-600', on);
      btn.classList.toggle('text-white', on);
      btn.classList.toggle('bg-gray-600', !on);
      btn.classList.toggle('text-gray-300', !on);
    });
  });
}
