<script setup>
  import { scene } from '@/lib/scene'
  import { modeStore } from '@/stores/mode'

  let selectedUnit

  const setSelectedUnit = (unit) => {
    selectedUnit = {
      health: unit.health,
      name: unit.name,
      ...unit.properties,
    }
  }

  setSelectedUnit(scene.player)

  const setUnitAction = (e) => {
    const { index } = e.target.dataset
    const action = selectedUnit.actions[index]

    modeStore().set(new action.controler(action))
  }
</script>

<template>
  <section class="character-dialog pane">
    <img :src=selectedUnit.portrait />
    <div class=character-controls>
      <p>{{ selectedUnit.name }}</p>

      <button
        v-for="(action, i) in selectedUnit.actions"
        :key=i
        :data-index=i
        class=button--dialog
        @click=setUnitAction($event)
        v-html="`${action.name} ${action.icon}`"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
   .character-dialog {
    position: absolute;
    bottom: 0;
    display: flex;
    margin: $spaceSM;
    padding: $spaceSM;

    img {
      display: block;
      border: solid 1px $primary;
      border-top-left-radius: $borderRadius;
      border-bottom-left-radius: $borderRadius;
    }

    .character-controls {
      margin: 0 $spaceSM;

      > * {
        margin: 0 $spaceSM $spaceSM 0;
      }
    }
  }
</style>