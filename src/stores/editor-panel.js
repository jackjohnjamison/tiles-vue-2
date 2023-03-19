import { defineStore } from 'pinia'

/* Panel types
 - tiles
 - entities
*/

export const panelStore = defineStore('panel', {
  state: () => {
    return { activePanel: 'tiles' }
  },

  actions: {
    switchPanel(panelName) {
      this.activePanel = panelName
    }
  }
})
