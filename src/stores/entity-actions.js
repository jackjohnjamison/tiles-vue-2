import { defineStore } from 'pinia'
import { scene } from '@/lib/scene'

export const entityActionStore = defineStore('entityAction', {
  state: () => {
    return {
      action: 'addNpc',
      mapName: null,
      entryPointName: 'default',
      entryPoints: scene.tileMap.entryPoints,
      filteredMapList: null
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
      scene.requestRedrawEffects()
    },

    setInitialMap(mapName) {
      this.mapName = scene.mapConfig.mapList[mapName].name
      console.log('SET AS THIS', this.mapName)
    }
  }
})
