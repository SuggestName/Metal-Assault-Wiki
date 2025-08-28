// data/datasets.js
// Central place for dataset-related constants & accessors

export const UPGRADE_CFG = {
  rifles: { prefix: 'rifle', labelW: 'w-16', singular: 'rifle' },
  snipers: { prefix: 'sniper', labelW: 'w-16', singular: 'sniper' },
  bazookas: { prefix: 'bazooka', labelW: 'w-16', singular: 'bazooka' },
  pistols: { prefix: 'pistol', labelW: 'w-16', singular: 'pistol' },
  shotguns: { prefix: 'shotgun', labelW: 'w-20', singular: 'shotgun' },
  shields: { prefix: 'shield', labelW: 'w-24', singular: 'shield' },
};

export const UPGRADE_STATS_BY_KIND = {
  default: ['rateOfFire', 'range', 'accuracy', 'bulletSpeed'],
  shields: ['rateOfFire', 'range', 'defense'],
};
export const getUpgradableStats = (kind) =>
  kind === 'shields' ? UPGRADE_STATS_BY_KIND.shields : UPGRADE_STATS_BY_KIND.default;

export const STAT_LABELS = {
  damage: 'Damage',
  rateOfFire: 'Rate of Fire',
  range: 'Range',
  accuracy: 'Accuracy',
  bulletSpeed: 'Bullet Speed',
  mobility: 'Mobility',
  defense: 'Defense',
  explosionResist: 'Explosion Resistence',
  hp: 'HP',
  mp: 'MP',
  sp: 'SP',
  speed: 'Movement Speed',
  hitRate: 'Hit Rate',
  itemSlot: 'Item Slot',
  attackPower: 'Attack Power'
};

export const STAT_ORDER = [
  'damage', 'attackPower', 'rateOfFire', 'bulletSpeed', 'range', 'accuracy', 'hitRate',
  'defense', 'explosionResist', 'speed', 'mobility', 'hp', 'mp', 'sp', 'itemSlot'
];

export const STAT_COLORS = {
  damage: 'text-orange-400',
  attackPower: 'text-orange-400',
  rateOfFire: 'text-yellow-300',
  bulletSpeed: 'text-blue-400',
  range: 'text-cyan-300',
  accuracy: 'text-emerald-300',
  hitRate: 'text-emerald-300',
  defense: 'text-purple-400',
  explosionResist: 'text-pink-400',
  speed: 'text-green-400',
  mobility: 'text-green-400',
  hp: 'text-red-400',
  mp: 'text-sky-300',
  sp: 'text-indigo-300',
  itemSlot: 'text-gray-300'
};

export const STAT_ALIASES = [
  ['damage', /\b(attack\s*power|atk(\s*power)?|damage)\b/i],
  ['rateOfFire', /\brate\s*of\s*fire\b|\brof\b/i],
  ['bulletSpeed', /\bbullet\s*speed\b/i],
  ['range', /\brange\b/i],
  ['accuracy', /\baccuracy\b/i],
  ['hitRate', /\bhit\s*rate\b/i],
  ['defense', /\bdefen[cs]e\b/i],
  ['explosionResist', /\bexplosion\s*res(ist(ance)?)?\b/i],
  ['speed', /\bmovement\s*speed\b|\bspeed\b/i],
  ['mobility', /\bmobility\b/i],
  ['hp', /\bhp\b/i],
  ['mp', /\bmp\b/i],
  ['sp', /\bsp\b/i],
  ['itemSlot', /\bitem\s*slot\b/i]
];

export const DATASETS = {
  rifles: () => (typeof rifles !== 'undefined' ? rifles : []),
  snipers: () => (typeof snipers !== 'undefined' ? snipers : []),
  bazookas: () => (typeof bazookas !== 'undefined' ? bazookas : []),
  pistols: () => (typeof pistols !== 'undefined' ? pistols : []),
  shotguns: () => (typeof shotguns !== 'undefined' ? shotguns : []),
  shields: () => (typeof shields !== 'undefined' ? shields : []),
};

export function colorizeStatLabelByKey(key, fallbackText) {
  const label = STAT_LABELS[key] || fallbackText || key;
  const color = STAT_COLORS[key] || 'text-gray-200';
  return `<span class="${color} font-semibold">${label}</span>`;
}

export function colorizeEffectTextUniversal(text) {
  let out = String(text ?? '');
  for (const [key, rx] of STAT_ALIASES) {
    if (rx.test(out)) {
      out = out.replace(rx, colorizeStatLabelByKey(key));
      break;
    }
  }
  return out;
}

export function statsObjectToEffectLines(stats = {}) {
  const lines = [];

  STAT_ORDER.forEach(key => {
    if (stats[key] != null) {
      lines.push(`${colorizeStatLabelByKey(key)} ${stats[key]}`);
    }
  });

  Object.keys(stats).forEach(k => {
    if (!STAT_ORDER.includes(k) && stats[k] != null) {
      lines.push(`${colorizeStatLabelByKey(k)} ${stats[k]}`);
    }
  });
  return lines;
}