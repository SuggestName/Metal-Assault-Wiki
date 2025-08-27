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
  shields: ['rateOfFire', 'range', 'explosionDefense', 'defense'],
};
export const getUpgradableStats = (kind) =>
  kind === 'shields' ? UPGRADE_STATS_BY_KIND.shields : UPGRADE_STATS_BY_KIND.default;

export const STAT_LABELS = {
  rateOfFire: 'Rate of Fire',
  range: 'Range',
  accuracy: 'Accuracy',
  bulletSpeed: 'Bullet Speed',
  explosionDefense: 'Explosion Defense',
  defense: 'Defense',
};

export const DATASETS = {
  rifles: () => (typeof rifles !== 'undefined' ? rifles : []),
  snipers: () => (typeof snipers !== 'undefined' ? snipers : []),
  bazookas: () => (typeof bazookas !== 'undefined' ? bazookas : []),
  pistols: () => (typeof pistols !== 'undefined' ? pistols : []),
  shotguns: () => (typeof shotguns !== 'undefined' ? shotguns : []),
  shields: () => (typeof shields !== 'undefined' ? shields : []),
};
