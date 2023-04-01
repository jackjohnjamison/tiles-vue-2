<script setup>
  import { reloadScene, save, load } from '@/lib/scene'
  import { createTileMapFromParams } from '@/lib/map'
  import { maxTiles, minTiles } from '@/lib/constants'
  import { pauseStore } from '@/stores/pause'

  const pause = pauseStore()

  // Move this into lib
  const generateMap = () => {
    const { xTiles, yTiles } = pause
    const newMap = createTileMapFromParams(
      { xTiles, yTiles },
      pause.mapTitle
    )

    reloadScene(newMap)
    return
  }
</script>

<template>
  <div v-if="pause.isPaused" class="pauseMenu">
    <div class="pause-menu-items pane">
      <p>Paused</p>
      <ul>
        <li><button @click=pause.toggle>Resume</button></li>
        <li><button @click=load(this.$refs.loadButton) ref=loadButton>Load</button></li>
        <li class=group-wrapper>
          <button @click="save(this.$refs.saveButton, this.$refs.saveLink)" class=save ref=saveButton>Save</button>
          <a class=save-link ref=saveLink />
        </li>
        <li class=group-wrapper>
          <button class=generate-map @click=generateMap>Generate New Map</button>
          <input type=text ref=mapTitle v-model=pause.mapTitle />
          <label for=xTiles>X Tiles: {{pause.xTiles}}</label>
          <input
            class=tile-slider
            id=xTiles
            type=range
            :min=minTiles
            :max=maxTiles
            step=1
            v-model.number="pause.xTiles"
          />
          <label for=yTiles>Y Tiles: {{pause.yTiles}}</label>
          <input
            class=tile-slider
            id=yTiles
            type=range
            :min=minTiles
            :max=maxTiles
            step=1
            v-model.number="pause.yTiles"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .pauseMenu {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    color: $light;
    font-size: $fontSizeL;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: $mask;

    .pause-menu-items {
      text-align: center;
      padding: $spaceXL;
      background-color: $panePrimary;
      border-radius: $borderRadius;
      border: solid 2px $dark;
      text-shadow: $textShadow;
    }

    .group-wrapper {
      display: flex;
      flex-direction: column;
      border: solid 1px $dark;
      padding: $spaceL;
      padding-right: 0;
      margin: $spaceSM;
      border-radius: $borderRadius;

      label {
        font-size: $fontSizeSM;
      }
    }

    .save-link {
      color: $light;
      font-size: $fontSizeM;
      text-decoration: none;
    }

    ul {
      padding: 0;
      margin: 0;
    }

    p {
      margin: 0;
    }

    li {
      list-style: none;
      margin-bottom: $spaceL;
      box-sizing:border-box;
    }

    button, input {
      font-size: $fontSizeM;
      width: 96%;
      box-sizing:border-box;
      text-align: center;
      border-radius: $borderRadius;
    }

    input {
      background-color: $light;
    }

    button {
      padding: 4px;
      color: #fff;
      background-color: $primary;
      transition: background-color .2s;

      &:hover {
        background-color: $primaryLight;
      }
    }
  }
</style>