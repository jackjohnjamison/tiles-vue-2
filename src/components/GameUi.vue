<script setup>
  import TilePainter from './TilePainter.vue'
  import { modeStore } from "@/stores/mode";

  const mode = modeStore()
</script>

<template>
  <div>
    <div v-if="mode.mode === 'playMode'">
      <!-- h2>Play mode</h2 -->
    </div>

    <TilePainter v-else-if="mode.mode === 'editMode'" />
    
  </div>
</template>

<style lang="scss" scoped>

</style>