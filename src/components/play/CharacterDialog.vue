<script setup>
  import { imageAssetPath } from '@/lib/constants'
  import { setMode } from '@/lib/controls'

  const portraitSrc = `${imageAssetPath}portraits/knight-sm.jpg`

  const setUnitAction = (e) => {
    const actionName = e.target.value
    
    setMode[actionName]()
  }
</script>

<template>
  <section class="character-dialog pane">
    <img :src=portraitSrc />
    <div class=character-controls>
      <p>Kobol the knight</p>

      <button class=button--dialog
      value=playModeAttack
      @click=setUnitAction($event)>
        &#x2694;
      </button>

      <button class=button--dialog>&#x1F3F9;</button>
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