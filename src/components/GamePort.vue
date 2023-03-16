<script setup>
  import { onMounted } from 'vue'
  import { start } from '../lib/game'
  import PauseMenu from './PauseMenu.vue'

  onMounted(() => {
    start()
  })

</script>

<template>
  <!-- Toolbar /-->
  <div id="canvasRoot">
    <canvas class="layer-canvas" id="floorCanvas" />
    <canvas class="layer-canvas" id="canvasMid" />
    <canvas class="layer-canvas" id="entityCanvas" />
    <canvas class="layer-canvas" id="canvasTop" />
    <div id="uiMount" />
    <PauseMenu />
  </div>
</template>

<style lang="scss">
  .toolbar {
    flex: 0 1 auto;
    display: flex;
    margin: 5px 10px 0;
  }

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

  .monitor {
    position: absolute;
    right: 0;
    background-color: rgba(100,100,100,.5);
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

  button, input, select, label {
    cursor: pointer;
    margin: 2px;
  }

  input[type="text"] {
    cursor: text;
  }
</style>