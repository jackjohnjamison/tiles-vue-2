<script setup>
  import { modeStore } from "@/stores/mode"
  import { pauseStore } from '@/stores/pause'
  import EditorPanel from '@/components/EditorPanel.vue'
  import MapTitle from '@/components/MapTitle.vue'

  const pause = pauseStore()
  const mode = modeStore()
</script>

<template>
  <div v-if="!pause.isPaused">
    <MapTitle />
    <div v-if="mode.mode === 'playMode'">
      <!-- h2>Play mode</h2 -->
    </div>

    <EditorPanel v-else-if="mode.mode === 'editMode'" />
    
  </div>
</template>