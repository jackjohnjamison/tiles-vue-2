<script setup>
  import { scene } from '@/lib/scene'
  import { maxMapNameLength } from '@/lib/constants'
  import { entityActionStore } from '@/stores/entity-actions'

  const { mapConfig: { mapList }, tileMap: { id } } = scene
  const entityAction = entityActionStore()

  const mapKeys = Object.keys(mapList)
  const mapArray = Object.values(mapList)
  const filteredMapList = mapArray.filter((map, i) => {
    map.name = mapKeys[i]
    return map.id !== id
  })
</script>

<template>
  <div class=entity-dialog>
    <div class="select-wrapper select-wrapper--entity">
      <select v-model=entityAction.action id=entity-type @change=scene.requestRedrawEffects>
        <option value=entryPoint>Entry Point</option>
        <option value=travelPoint>Travel Point</option>
        <option value=addNpc>Add NPC</option>
        <option value=delete>Delete Entity</option>
      </select>
      <label for=entity-type>Entity type</label>
    </div>

    <!-- Entry Point Dialog -->
    <div v-if="entityAction.action === 'entryPoint'">
      <p>Add an Entry Point</p>
      <input type=text :maxlength=maxMapNameLength v-model=entityAction.entryPointName />
      <div v-if=Object.keys(entityAction.entryPoints).length>
        <p>Exisiting Entry Points</p>
        <ul>
          <li v-for="(entryPoint, name) in entityAction.entryPoints" :key=name class=entry-point>
            {{ name }} ( X: {{ entryPoint.x}} Y: {{ entryPoint.y }} )
            <button class=delete-entry-point @click=entityAction.deleteEntryPoint(name)>&#x1f5d1;</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Travel Point Dialog -->
    <div v-else-if="entityAction.action === 'travelPoint'">
      <p>Add a Travel Point to:</p>
      <div>
        <input type=text v-model=entityAction.mapName id=mapName :maxlength=maxMapNameLength>
        <label for=mapName>Map name</label>
      </div>
      <div>
        <input type=text v-model=entityAction.travelPoint id=entryPointName :maxlength=maxMapNameLength>
        <label for=mapName>Entry Point Name</label>
      </div>
      <p>Exisiting Entry Points in maps:</p>
      <div v-for="(map) in filteredMapList" :key=map.name class=entry-point-map>
        <p>{{ map.mapTitle }} ({{ map.name }})</p>
        <ul class=entry-points-in-map>
          <li v-for="(entryPoints, entryPointName) in map.entryPoints" :key=entryPointName>
            {{ entryPointName }}
            <button @click="entityAction.fillEntityPoint(map.name, entryPointName)">
              Fill
            </button>
          </li>
        </ul>
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
  @import '@/scss/px-to-rem.scss';
  
  .entity-dialog {
    p {
      margin: 8px 2px;
    }
  }

  .entry-point-map {
    border-top:  solid 1px #1b1b1b;
  }

  .select-wrapper--entity {
    margin-bottom: 4px;
    padding-bottom: 4px;
    border-bottom: solid 1px #1b1b1b;
  }

  .entry-point {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .delete-entry-point {
      border: none;
      background: none;
      color: inherit;
      font-size: 24px;
    }
  }

  .entry-points-in-map {
    padding-left: 18px;

    button {
      border: none;
      background: #1b1b1b;
      font-family: inherit;
      color: inherit;
      border: none;
      background: #1b1b1b;
      font-family: inherit;
      color: inherit;
      font-size: 16px;
      padding: 1px 8px;
      border-radius: 3px;
      margin-left: 3px;
    }
  }

  ul {
    padding-left: 0;
    margin: 0;
    margin-left: 4px;
  }
</style>