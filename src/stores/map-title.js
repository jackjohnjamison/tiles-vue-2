import { defineStore } from 'pinia'
import { scene } from '@/lib/scene'
import { defaultMapTitle } from '@/lib/constants'

export const mapTitleStore = defineStore('mapTitle', {
  state: () => {
    return {
      title: null,
      isEditing: false
    }
  },

  actions: {
    updateMapTitle(mapTitle) {
      this.title = mapTitle
    },

    toEditMode() {
      this.isEditing = true
    },

    saveEdit(newTitle) {
      this.title = scene.tileMap.mapTitle = newTitle || defaultMapTitle
      this.isEditing = false
    }
  }
})
