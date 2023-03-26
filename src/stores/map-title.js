import { defineStore } from 'pinia'
import { scene } from '@/lib/scene'

export const mapTitleStore = defineStore('mapTitle', {
  state: () => {
    return {
      title: scene?.tileMap?.mapTitle
    }
  },

  actions: {
    updateMapTitle(mapTitle) {
      this.title = mapTitle
    }
  }
})
