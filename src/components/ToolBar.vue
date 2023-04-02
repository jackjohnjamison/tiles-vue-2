<script setup>
  import { setMode } from '@/lib/controls'

  const switchMode = (e) => {
    const modeName = e.target.value

    setMode[modeName]()
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