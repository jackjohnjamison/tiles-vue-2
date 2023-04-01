<script setup>
  import { scene } from '@/lib/scene'
  import { panelStore } from '@/stores/editor-panel'
  import TilePainter from '@/components/edit/TilePainter.vue'
  import EntityDialog from '@/components/edit/EntityDialog.vue'

  const panel = panelStore()

  const setActivePanel = (panelName) => {
    panel.switchPanel(panelName)
    scene.requestRedrawEffects()
  }

  setActivePanel(panel.activePanel)
</script>

<template>
  <div class="edit-mode pane">
    <div class="tablist" role="tablist" aria-label="Edit mode tabs">
      <button role="tab" @click="setActivePanel('tiles')"
      :aria-selected="panel.activePanel === 'tiles'"
      :class="{ deselected: panel.activePanel !== 'tiles' }">
        Tile Painter
      </button>

      <button role="tab" @click="setActivePanel('entities')"
      :aria-selected="panel.activePanel === 'entities'"
      :class="{ deselected: panel.activePanel !== 'entities' }">
        Entities
      </button>
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
  .edit-mode {
    position: absolute;
    left: 0;
    min-width: 300px;
    overflow-y: auto;
    max-height: 100%;
    margin: $spaceSM;
    direction:rtl;

    > * {
      direction:ltr;
    }
  }

  .tablist {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;

    button {
      flex-grow: 1;
      margin: 0;
      font-size: $fontSizeSM;
      background: none;
      border: none;
      color: $light;
      padding: 6px;

      &.deselected {
        background: $darkTrans;
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
      font-size: $fontSizeSM;
      border-radius: 2px;
      padding: 2px;
      margin: 2px;
      margin-bottom: 6px;
    }

    input[type="text"] {
      padding-left: 5px;
    }

    button, input, select, label {
      margin: 2px;
    }

    label {
      margin-left: 4px;
    }
  }
</style>