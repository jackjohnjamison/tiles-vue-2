import { imageAssetPath } from '@/lib/constants'
import { modes } from '@/lib/controls'
import { createSparkEffect } from '@/lib/effects'

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
      controler: modes.baseAttack,
      name: 'Melee',
      weapon: weapons.longSword,
      icon: weapons.longSword.icon,
      animation: createSparkEffect
    },
    {
      type: 'attack',
      controler: modes.baseAttack,
      name: 'Ranged',
      weapon: weapons.shortBow,
      icon: weapons.shortBow.icon,
      animation: createSparkEffect
    }
  ]
}
