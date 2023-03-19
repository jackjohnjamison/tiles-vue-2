import { defineStore } from 'pinia'
import { tileTypes } from "@/lib/game/map"

const defaultHueValue = 1

export const brushStore = defineStore('brush', {
  state: () => {
    return {
      selectedTileSetKey: Object.keys(tileTypes)[0],
      selectedTileSet: null,
      currentBrush: null,
      floorHueValue: defaultHueValue,
      featureHueValue: defaultHueValue,
      spriteHues: {},
    }
  },

  actions: {
    setSelectedTileSet(tileSetKey) {
      this.selectedTileSet = tileTypes[tileSetKey]
      this.selectedTileSetKey = tileSetKey
      this.floorHueValue = this.spriteHues[tileSetKey]?.floorHueValue || defaultHueValue
      this.featureHueValue = this.spriteHues[tileSetKey]?.featureHueValue || defaultHueValue
    },

    setHues() {
      const { floorHueValue, featureHueValue } = this

      this.spriteHues[this.selectedTileSetKey] = {
        floorHueValue,
        featureHueValue
      }
    },

    setBrush() {

    },
  }
})