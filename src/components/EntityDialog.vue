<script setup>
  import { entityActionStore } from '@/stores/entity-actions'

  const entityAction = entityActionStore()
</script>

<template>
  <section class="entity-dialog">
    <select class="entity-action-select" v-model="entityAction.action">
      <option value="addNpc">Add NPC</option>
      <option value="travelPoint">Travel Point</option>
      <option value="delete">Delete Entity</option>
    </select>
  </section>
</template>

<style lang="scss" scoped>
  .entity-dialog {
    margin: 10px;
  }

  // Move to common CSS location with the terrain type select
  .entity-action-select {
    font-family: var(--font);
    font-weight: 500;
    font-size: 16px;
    border-radius: 2px;
    margin: 2px;
    padding: 2px;
  }
</style>