<script setup>
  import { panelStore } from '@/stores/editor-panel'
  import TilePainter from '@/components/TilePainter.vue'

  const panel = panelStore()
  let tilesDeselected
  let entitiesDeselected

  const setActivePanel = (panelName) => {
    panel.switchPanel(panelName)

    tilesDeselected = panelName === 'tiles' ? false : true
    entitiesDeselected = panelName === 'entities' ? false : true
  }

  setActivePanel(panel.activePanel)
</script>

<template>
  <div class="edit-mode">
    <div class="tablist" role="tablist">
      <button role="tab" @click="setActivePanel('tiles')" :class="{ deselected: tilesDeselected }">Tile Painter</button>
      <button role="tab" @click="setActivePanel('entities')" :class="{ deselected: entitiesDeselected }">Entities</button>
    </div>
    <TilePainter v-if="panel.activePanel === 'tiles'" />

    <section v-else-if="panel.activePanel === 'entities'">
      <p>ENTITIES!!!</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/mixins/px-to-rem.scss';

  .edit-mode {
    position: absolute;
    left: 0;
    background-color: rgba(80,80,80,.8);
    margin: 5px;
    border-radius: 2px;
    backdrop-filter: var(--frostedFilter);
    min-width: 300px;
  }

  .tablist {
    display: flex;

    button {
      flex-grow: 1;
      margin: 0;
      font-size: pxToRem(16);
      font-family: var(--font);
      background: none;
      border: none;
      color: var(--font-color-light);
      padding: 6px;

      &.deselected {
        background: rgba(0,0,0,.4);
      }
    }
  }
</style>