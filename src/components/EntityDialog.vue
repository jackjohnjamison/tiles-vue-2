<script setup>
  import { entityActionStore } from '@/stores/entity-actions'

  const mapList = [
    { name: 'windows', displayName: 'Windows' },
    { name: 'lake', displayName: 'The Lake' },
  ]

  const entityAction = entityActionStore()
</script>

<template>
  <section class="entity-dialog">
    <select v-model="entityAction.action">
      <option value="addNpc">Add NPC</option>
      <option value="travelPoint">Travel Point</option>
      <option value="delete">Delete Entity</option>
    </select>

    <div v-if="entityAction.action === 'travelPoint'">
      <select v-model="entityAction.mapName">
        <option v-for="map in mapList" :key="map.name" :value="map.name">{{ map.displayName }}</option>
      </select>
      <div>
        <label for=travelX>Entry point X</label>
        <input id=travelX v-model=entityAction.travelX type=number min=0 max=32 />
      </div>
      <div>
        <label for=travelY>Entry point Y</label>
        <input id=travelY v-model=entityAction.travelY type=number min=0 max=32 />
      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
  .entity-dialog {
    margin: 10px;
  }

  // Move to common CSS location with the terrain type select
  select {
    font-family: var(--font);
    font-weight: 500;
    font-size: 16px;
    border-radius: 2px;
    margin: 2px;
    padding: 2px;
  }
</style>