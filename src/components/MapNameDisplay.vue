<script setup>
  import { reactive } from 'vue'
  import { scene } from '@/lib/scene'

  const mapDisplayName = reactive({
    name: scene?.tileMap?.displayName
  })
</script>

<template>
  <h1 class=map-name>{{ mapDisplayName.name }}</h1>
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