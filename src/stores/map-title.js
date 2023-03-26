import { defineStore } from 'pinia'
import { scene } from '@/lib/scene'
import { defaultMapTitle } from '@/lib/constants'

export const mapTitleStore = defineStore('mapTitle', {
  state: () => {
    return {
      title: scene?.tileMap?.displayName || defaultMapTitle
    }
  },

  actions: {
    updateMapTitle(mapTitle) {
      this.title = mapTitle
    }
  }
})
