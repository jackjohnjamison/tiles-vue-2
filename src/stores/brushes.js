import { defineStore } from 'pinia'
import { tileTypes } from "@/lib/game/map"

const defaultHueValue = 0

export const brushStore = defineStore('brush', {
  state: () => {
    return {
      selectedTileSetKey: Object.keys(tileTypes)[0],
      selectedTileSet: null,
      floorHueValue: defaultHueValue,
      featureHueValue: defaultHueValue,
      spriteHues: {},
      variant: null
    }
  },

  actions: {
    setSelectedTileSet(tileSetKey) {
      this.selectedTileSet = tileTypes[tileSetKey]
      this.selectedTileSetKey = tileSetKey
      this.floorHueValue = this.spriteHues[tileSetKey]?.floorHueValue || defaultHueValue
      this.featureHueValue = this.spriteHues[tileSetKey]?.featureHueValue || defaultHueValue
      this.variant = null
    },

    setHues() {
      const { floorHueValue, featureHueValue } = this

      this.spriteHues[this.selectedTileSetKey] = {
        floorHueValue,
        featureHueValue
      }
    }
  }
})