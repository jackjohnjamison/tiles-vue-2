import { defineStore } from 'pinia'
import { scene } from '@/lib/scene'

export const entityActionStore = defineStore('entityAction', {
  state: () => {
    return {
      action: 'addNpc',
      mapName: 'windows',
      destinationX: 0,
      destinationY: 0,
      entryPointName: 'Default',
      entryPoints: scene.tileMap.entryPoints
    }
  },

  actions: {
    updateEntryPoints() {
      // Setting entryPoints as empty first is a dirty hack to force the v-for to re-render
      this.entryPoints = {}
      this.entryPoints = scene.tileMap.entryPoints
    },

    deleteEntryPoint(name) {
      delete scene.tileMap.entryPoints[name]
      this.updateEntryPoints()
    }
  }
})
