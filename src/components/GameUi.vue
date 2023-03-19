<script setup>
  import TilePainter from '@/components/TilePainter.vue'
  import { modeStore } from "@/stores/mode";
  import { pauseStore } from '@/stores/pause'

  const pause = pauseStore()
  const mode = modeStore()
</script>

<template>
  <div v-if="!pause.isPaused">
    <div v-if="mode.mode === 'playMode'">
      <!-- h2>Play mode</h2 -->
    </div>

    <TilePainter v-else-if="mode.mode === 'editMode'" />
    
  </div>
</template>