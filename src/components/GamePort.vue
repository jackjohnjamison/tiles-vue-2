<script setup>

  import { onMounted } from 'vue'
  import { start } from '../lib/game'

  onMounted(() => {
    start()
  })

</script>

<template>
  <div class="wrapper">
    <!-- Toolbar /-->
    <div id="canvasRoot">
      <canvas class="layer-canvas" id="floorCanvas" />
      <canvas class="layer-canvas" id="canvasMid" />
      <canvas class="layer-canvas" id="entityCanvas" />
      <canvas class="layer-canvas" id="canvasTop" />
      <div id="uiMount" />
      <!-- PauseMenu /-->
    </div>
  </div>
</template>
