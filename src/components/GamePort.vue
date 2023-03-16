<script setup>
  import { onMounted } from 'vue'
  import { start } from '../lib/game'
  import ToolBar from './ToolBar.vue'
  import PauseMenu from './PauseMenu.vue'

  onMounted(() => {
    start()
  })
</script>

<template>
  <ToolBar />
  <main id="canvasRoot">
    <canvas class="layer-canvas" id="floorCanvas" />
    <canvas class="layer-canvas" id="canvasMid" />
    <canvas class="layer-canvas" id="entityCanvas" />
    <canvas class="layer-canvas" id="canvasTop" />
    <div id="uiMount" />
    <PauseMenu />
  </main>
</template>

<style lang="scss" scoped>
  #canvasRoot {
    flex: 1 1 auto;
    border: solid 1px var(--color1);
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

  .margin-left-auto {
    margin-left: auto;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .margin-left-10 {
    margin-left: 10px;
  }
</style>