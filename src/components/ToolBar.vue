<script setup>
  import { scene } from '@/lib/scene'
  import { modeStore } from '@/stores/mode'

  const switchMode = (e) => {
    const { modes } = scene
    const modeName = e.target.value

    modeStore().set(modes[modeName])
  }
</script>

<template>
  <div class="toolbar">
    <div @change="switchMode($event)">
      <input
        type=radio
        id=playRadio
        value=playMode
        name=mode
        checked
      />
      <label for="playRadio">Play Mode</label>
      <input
        type=radio
        id=editModeRadio
        value=editMode
        name=mode
      />
      <label for=editModeRadio>Edit Mode</label>
    </div>
  </div>
</template>

<style lang=scss scoped>
  .toolbar {
    flex: 0 1 auto;
    display: flex;
    margin: $spaceSM $spaceL 0;

    label {
      margin-right: $spaceL;
    }

    input {
      margin-right: $spaceSM;
    }
  }
</style>