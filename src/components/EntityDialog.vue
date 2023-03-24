<script setup>
  import { entityActionStore } from '@/stores/entity-actions'

  const mapList = [
    { name: 'windows', displayName: 'Windows' },
    { name: 'lake', displayName: 'The Lake' },
  ]

  const entityAction = entityActionStore()
</script>

<template>
  <div class=entity-dialog>
    <div class="select-wrapper select-wrapper--entity">
      <select v-model=entityAction.action id=entity-type>
        <option value=addNpc>Add NPC</option>
        <option value=travelPoint>Travel Point</option>
        <option value=delete>Delete Entity</option>
      </select>
      <label for=entity-type>Entity type</label>
    </div>

    <!-- Travel Point Dialog -->
    <div v-if="entityAction.action === 'travelPoint'">
      <div class=select-wrapper>
        <select v-model="entityAction.mapName" id=map>
          <option v-for="map in mapList" :key="map.name" :value="map.name">{{ map.displayName }}</option>
        </select>
        <label for=map>Map Name</label>
      </div>

      <div class=destination-input>
        <input id=destinationX v-model=entityAction.destinationX type=number min=0 max=32 />
        <label for=destinationX>Entry point X</label>
      </div>

      <div class=destination-input>
        <input id=destinationY v-model=entityAction.destinationY type=number min=0 max=32 />
        <label for=destinationY>Entry point Y</label>
      </div>
    </div>

    <!-- NPC Dialog -->
    <div v-else-if="entityAction.action === 'addNpc'">
      <p>Add an NPC</p>
    </div>

    <!-- Delete entity -->
    <div v-else-if="entityAction.action === 'delete'">
      <p>Delete an entity</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .destination-input {
    display: flex;

    input[type=number] {
      min-width: calc(50% - 10px);
      padding-left: 4px;
    }
  }

  .select-wrapper--entity {
    margin-bottom: 4px;
    padding-bottom: 4px;
    border-bottom: solid 1px #1b1b1b;
  }
</style>