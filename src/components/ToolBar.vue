<script setup>
  import { modeStore } from "@/stores/mode";

  const mode = modeStore()
  
  const switchMode = (event) => {
    const type = event.target._value

    mode.set(type);
  }
</script>

<template>
  <div class="toolbar">
    <form @change="switchMode($event)" class="margin-right-10">
      <input
        type="radio"
        id="playRadio"
        value="playMode"
        class="margin-right-10"
        name="mode"
        checked
      />
      <label for="playRadio">Play Mode</label>
      <input
        type="radio"
        id="editModeRadio"
        value="editMode"
        class="margin-left-10 margin-right-10"
        name="mode"
      />
      <label for="editModeRadio">Edit Mode</label>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .toolbar {
    flex: 0 1 auto;
    display: flex;
    margin: 5px 10px 0;
  }
</style>