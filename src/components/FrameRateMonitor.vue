<script setup>
  import { onMounted } from 'vue'
  import { additionalFunctions } from '@/lib/scene'
  import { color } from '@/lib/constants'

  const monitorWidth = 150;
  const monitorHeight = 70;
  const deltaMaxMeasure = 100;
  let monitor

  // Adds the frame rate monitor to additional functions
  onMounted(() => {
    const monitorCtx = monitor.getContext("2d")
    monitorCtx.strokeStyle = color.alert;

    additionalFunctions.push((delta) => {
      monitorCtx.globalCompositeOperation = "copy";
      monitorCtx.drawImage(monitor, -1, 0);
      monitorCtx.globalCompositeOperation = "source-over";

      const deltaLineTop = monitorHeight - (delta / deltaMaxMeasure) * monitorHeight;

      monitorCtx.beginPath();
      monitorCtx.moveTo(monitorWidth, monitorHeight);
      monitorCtx.lineTo(monitorWidth, deltaLineTop);
      monitorCtx.stroke();
    })
  })
</script>

<template>
  <canvas class="monitor" :width="monitorWidth" :height="monitorHeight" ref="monitor" />
</template>

<style lang="scss" scoped>
  .monitor {
    position: absolute;
    right: 0;
    background-color: $pane;
    backdrop-filter: $frostedFilter;
  }
</style>
