<script setup>
  import { start } from '@/lib'
  import ToolBar from '@/components/ToolBar.vue'
  import GameUi from '@/components/GameUi.vue'
  import PauseMenu from '@/components/PauseMenu.vue'
  import FrameRateMonitor from '@/components/FrameRateMonitor.vue'
  import TileInfo from '@/components/edit/TileInfo.vue'
  
  const canvases = {}

  start(canvases)
</script>

<template>
  <ToolBar />
  <main class="canvasRoot" :ref="function(el) { canvases.canvasRoot = el }">
    <canvas class="layer-canvas" :ref="function(el) { canvases.canvasFloor = el }" />
    <canvas class="layer-canvas" :ref="function(el) { canvases.canvasMid = el }" />
    <canvas class="layer-canvas" :ref="function(el) { canvases.canvasEntity = el }" />
    <canvas class="layer-canvas canvas-top" :ref="function(el) { canvases.canvasTop = el }" />
    <GameUi />
    <FrameRateMonitor />
    <PauseMenu />
    <TileInfo />
  </main>
</template>

<style lang="scss" scoped>
  .canvasRoot {
    flex: 1 1 auto;
    border: solid 1px $primary;
    margin: 5px 10px 10px;
    overflow: hidden;
    background-color: #000;
    position: relative;

    .layer-canvas {
      position: absolute;
    }
  }
</style>