<script setup>
  import { maxMapNameLength } from '@/lib/constants'
  import { mapTitleStore } from '@/stores/map-title'
  import { modeStore } from "@/stores/mode"

  const mode = modeStore()
  const mapTitle = mapTitleStore()
  let newTitle

  const setMapTitle = () => {
    mapTitle.saveEdit(newTitle.value)
  }
</script>

<template>
  <div class="map-title pane">
    <div v-if="mode.mode === 'editMode' && mapTitle.isEditing" class=title-wrapper>
      <input type=text :maxlength=maxMapNameLength ref=newTitle :value=mapTitle.title />
      <button @click=setMapTitle>&#x2714;</button>
    </div>

    <div v-else-if="mode.mode === 'editMode'" class=title-wrapper>
      <h1>{{ mapTitle.title }}</h1><button @click=mapTitle.toEditMode>&#x1F589;</button>
    </div>

    <div v-else class=title-wrapper>
      <h1>{{ mapTitle.title }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .map-title {
    position: absolute;
    right: 0;
    left: 0;
    margin: 0 auto 0 auto;
    width: fit-content;
    pointer-events: none;
    border-radius: 0 0 10px 10px;

    .title-wrapper {
      display: flex;
      align-items: center;
      width: fit-content;
      padding: 0 16px 6px;
    }

    h1 {
      width: fit-content;
      padding: 0 16px 6px;
      margin: 0;
    }

    button {
      pointer-events: all;
      
      // Maybe inherit a common button style?
      border: none;
      background: #1b1b1b;
      font-family: inherit;
      color: inherit;
      font-size: pxToRem(24);
      height: pxToRem(40);
      width: pxToRem(40);
      border-radius: 3px;
    }

    input {
      pointer-events: all;
      font-size: pxToRem(32);
      font-weight: 700;
      width: fit-content;
    }
  }
</style>