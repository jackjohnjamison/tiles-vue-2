<script setup>
  import { mapTitleStore } from '@/stores/map-title'
  import { modeStore } from "@/stores/mode"

  const mode = modeStore()
  const mapTitle = mapTitleStore()
</script>

<template>
  <div class=map-title>
    <div v-if="mode.mode === 'editMode'" class=title-wrapper>
      <h1>{{ mapTitle.title }}</h1><button>&#x1F589;</button>
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

    .title-wrapper {
      display: flex;
      width: fit-content;
      padding: 0 16px 6px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      background: rgba(100, 100, 100, 0.4);
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
      font-size: 24px;
      padding: 0 10px;
      border-radius: 3px;
    }
  }
</style>