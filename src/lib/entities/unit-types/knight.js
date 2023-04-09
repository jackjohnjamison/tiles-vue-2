import { imageAssetPath } from '@/lib/constants'

export const weapons = {
  longSword: {
    damage: 10,
    range: 1,
    icon: '&#x2694',
    cursor: null
  },

  shortBow: {
    damage: 5,
    range: 5,
    icon: '&#x1F3F9;',
    cursor: null
  }
}

export const knight = {
  maxHealth: 100,
  speed: 2,

  portrait: `${imageAssetPath}portraits/knight-sm.jpg`,

  actions: [
    {
      type: 'attack',
      name: 'Melee',
      weapon: weapons.longSword,
      icon: weapons.longSword.icon
    },
    {
      type: 'attack',
      name: 'Ranged',
      weapon: weapons.shortBow,
      icon: weapons.shortBow.icon
    }
  ]
}
