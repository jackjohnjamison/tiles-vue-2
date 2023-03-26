<script setup>
  import { mapTitleStore } from '@/stores/map-title'

  const mapTitle = mapTitleStore()
</script>

<template>
  <h1 class=map-title>{{ mapTitle.title }}</h1>
</template>

<style lang="scss" scoped>
  .map-title {
    position: absolute;
    right: 0;
    left: 0;
    margin: -4px auto 0 auto;
    width: fit-content;
    padding: 0 16px 6px;
    pointer-events: none;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background: rgba(100, 100, 100, 0.4);
  }
</style>