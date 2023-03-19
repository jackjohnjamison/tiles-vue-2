<script setup>
  import { start } from '../lib/game'
  import ToolBar from './ToolBar.vue'
  import GameUi from './GameUi.vue'
  import PauseMenu from './PauseMenu.vue'

  start()
</script>

<template>
  <ToolBar />
  <main id="canvasRoot">
    <canvas class="layer-canvas" id="floorCanvas" />
    <canvas class="layer-canvas" id="canvasMid" />
    <canvas class="layer-canvas" id="entityCanvas" />
    <canvas class="layer-canvas" id="canvasTop" />
    <GameUi />
    <PauseMenu />
  </main>
</template>

<style lang="scss" scoped>
  #canvasRoot {
    flex: 1 1 auto;
    border: solid 1px var(--color-accent);
    margin: 5px 10px 10px;
    overflow: hidden;
    background-color: #000;
    position: relative;

    .layer-canvas {
      position: absolute;
    }

    #canvasTop {
      mix-blend-mode: hard-light;
    }
  }
</style>