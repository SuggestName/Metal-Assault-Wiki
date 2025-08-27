// ui/collapse.js
export function toggleCollapse(wrapperId, contentId) {
  const wrap = document.getElementById(wrapperId);
  const cont = document.getElementById(contentId);
  if (!wrap || !cont) return;
  wrap.classList.toggle('collapsed');
  cont.classList.toggle('hidden');
}
window.toggleCollapse = toggleCollapse; // back-compat
