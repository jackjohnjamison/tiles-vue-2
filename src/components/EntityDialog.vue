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

  entityAction.setInitialMap(filteredMapList[0].name)
  console.log(entityAction.mapName);
</script>

<template>
  <div class=entity-dialog>
    <div class="select-wrapper select-wrapper--entity">
      <select v-model=entityAction.action id=entity-type @change=scene.requestRedrawEffects>
        <option value=travelPoint>Travel Point</option>
        <option value=entryPoint>Entry Point</option>
        <option value=addNpc>Add NPC</option>
        <option value=delete>Delete Entity</option>
      </select>
      <label for=entity-type>Entity type</label>
    </div>

    <!-- Travel Point Dialog -->
    <div v-if="entityAction.action === 'travelPoint'">
      <p>Add a Travel Point to:</p>
      <div class=select-wrapper>
        <select v-model=entityAction.mapName id=map>
          <option
            v-for="map in filteredMapList"
            :key=map.name
            :value=map.name
          >
            {{ map.displayName }}
          </option>
        </select>
        <label for=map>Map Name</label>
      </div>
      <div v-for="(entryPoint, name) in entityAction.entryPoints" :key=name>
        {{ name }}
      </div>
      <!-- <input type=radio> -->
      
    </div>

    <!-- Entry Point Dialog -->
    <div v-else-if="entityAction.action === 'entryPoint'">
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

  // .destination-input {
  //   display: flex;

  //   input[type=number] {
  //     min-width: calc(50% - 10px);
  //     padding-left: 4px;
  //   }
  // }

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

  ul {
    padding-left: 0;
    margin: 0;
    margin-left: 4px;
  }
</style>