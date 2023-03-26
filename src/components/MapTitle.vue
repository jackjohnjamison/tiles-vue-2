<script setup>
  import { mapTitleStore } from '@/stores/map-title'

  const mapTitle = mapTitleStore()
</script>

<template>
  <h1 class=map-name>{{ mapTitle.title }}</h1>
</template>

<style lang="scss" scoped>
  .map-name {
    position: absolute;
    text-align: center;
    right: 0;
    left: 0;
    pointer-events: none;
    margin: 0;
    background: rgba(100,100,100,.4);
  }
</style>