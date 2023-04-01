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
      <button class=button--dialog @click=setMapTitle>&#x2714;</button>
    </div>

    <div v-else-if="mode.mode === 'editMode'" class=title-wrapper>
      <h1>{{ mapTitle.title }}</h1>
      <button class=button--dialog @click=mapTitle.toEditMode>&#x1F589;</button>
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
    border-radius: 0 0 $spaceL $spaceL;

    .title-wrapper {
      display: flex;
      align-items: center;
      width: fit-content;
    }

    h1 {
      width: fit-content;
      padding: 0 $spaceXL $spaceSM;
      margin: 0;
    }

    button {
      pointer-events: all;
      font-size: $fontSizeM;
      margin-right: $spaceL;
      height: pxToRem(40);
      width: pxToRem(40);
      padding: 0;
    }

    input {
      pointer-events: all;
      font-size: $fontSizeL;
      font-weight: 700;
      width: fit-content;
      margin-right: $spaceL;
      background: $light;
      padding-left: $spaceL;
      border: none;
      border-bottom-left-radius: $spaceL;
    }
  }
</style>