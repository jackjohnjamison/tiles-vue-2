<script setup>
  import { modeStore } from "@/stores/mode"
  import { pauseStore } from '@/stores/pause'
  import MapTitle from '@/components/MapTitle.vue'
  import EditorPanel from '@/components/edit/EditorPanel.vue'
  import CharacterDialog from '@/components/play/CharacterDialog.vue'

  const pause = pauseStore()
  const modes = modeStore()
</script>

<template>
  <div v-if="!pause.isPaused">
    <MapTitle />
    <div v-if="modes.modeType === 'playMode'">
      <CharacterDialog />
    </div>

    <EditorPanel v-else-if="modes.modeType === 'editMode'" />
    
  </div>
</template>