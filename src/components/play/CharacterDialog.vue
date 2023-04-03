<script setup>
  import { scene } from '@/lib/scene'
  import { setMode } from '@/lib/controls'

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
    const actionName = e.target.value
    
    setMode[actionName]()
  }
</script>

<template>
  <section class="character-dialog pane">
    <img :src=selectedUnit.portrait />
    <div class=character-controls>
      <p>{{ selectedUnit.name }}</p>

      <button
        v-for="(attack, i) in selectedUnit.attacks"
        :key=i
        class=button--dialog
        value=playModeAttack
        @click=setUnitAction($event)
      >
        {{attack.name}}
        <span v-html=attack.weapon.icon></span>
      </button>

      <!-- <button class=button--dialog
      value=playModeAttack
      @click=setUnitAction($event)>
        &#x2694;
      </button>

      <button class=button--dialog>&#x1F3F9;</button> -->
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