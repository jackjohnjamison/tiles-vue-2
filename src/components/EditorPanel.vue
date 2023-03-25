<script setup>
  import { scene } from '@/lib/scene'
  import { panelStore } from '@/stores/editor-panel'
  import TilePainter from '@/components/TilePainter.vue'
  import EntityDialog from '@/components/EntityDialog.vue'

  const panel = panelStore()
  let tilesDeselected
  let entitiesDeselected

  const setActivePanel = (panelName) => {
    panel.switchPanel(panelName)

    // This could use some work
    tilesDeselected = panelName === 'tiles' ? false : true
    entitiesDeselected = panelName === 'entities' ? false : true

    scene.requestRedrawEffects()
  }

  setActivePanel(panel.activePanel)
</script>

<template>
  <div class="edit-mode">
    <div class="tablist" role="tablist" aria-label="Edit mode tabs">
      <button role="tab" @click="setActivePanel('tiles')" :aria-selected="panel.activePanel === 'tiles'" :class="{ deselected: tilesDeselected }">Tile Painter</button>
      <button role="tab" @click="setActivePanel('entities')" :aria-selected="panel.activePanel === 'entities'" :class="{ deselected: entitiesDeselected }">Entities</button>
    </div>

    <section v-if="panel.activePanel === 'tiles'" >
      <TilePainter/>
    </section>

    <section v-else-if="panel.activePanel === 'entities'">
      <EntityDialog />
    </section>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/scss/px-to-rem.scss';

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
    list-style-type: none;
    padding: 0;
    margin: 0;

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

  section {
    margin: 10px;
    min-width: 250px;
  }

  // Deep selects all componenets under this one
  :deep() {
    .select-wrapper {
      display: flex;

      label {
        text-align: center;
      }

      select {
        min-width: 50%;
      }
    }

    select,
    input {
      font-weight: 500;
      font-size: 16px;
      font-family: var(--font);
      border-radius: 2px;
      padding: 2px;
      margin: 2px;
      margin-bottom: 6px;
    }

    button, input, select, label {
      margin: 2px;
    }

    label {
      margin-left: 4px;
    }
  }
</style>