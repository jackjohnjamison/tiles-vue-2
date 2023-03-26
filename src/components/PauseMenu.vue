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
    <div class="pause-menu-items">
      <p>Paused</p>
      <ul>
        <li><button @click=pause.toggle>Resume</button></li>
        <li><button @click=load(this.$refs) ref=loadButton>Load</button></li>
        <li class=group-wrapper>
          <button @click=save(this.$refs) class=save ref=saveButton>Save</button>
          <input type=text ref=saveName value=tile-map />
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
  @import '@/scss/px-to-rem.scss';

  .pauseMenu {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    color: #fff;
    font-size: pxToRem(32);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(100,100,100,.4);

    .pause-menu-items {
      text-align: center;
      padding: 20px;
      background-color: rgba(102, 51, 153, .8);
      border-radius: 3px;
      border: solid 2px #000;
      text-shadow: 0px 0px 4px #000000, 0px 0px 2px #000000;
      backdrop-filter: var(--frostedFilter);
    }

    .group-wrapper {
      display: flex;
      flex-direction: column;
      border: solid 1px #1b1b1b;
      padding: 6px;
      padding-right: 0;
      margin: 4px;
      border-radius: 3px;

      label {
        font-size: pxToRem(16);
      }
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
      margin-bottom: 10px;
      box-sizing:border-box;
    }

    button, input {
      font-size: 20px;
      width: 96%;
      box-sizing:border-box;
      text-align: center;
      border-radius: 3px;
    }

    input {
      background-color: rgba(255,255,255,.9);
    }

    button {
      padding: 4px;
      color: #fff;
      background-color: var(--color-accent);
      transition: background-color .2s;

      &:hover {
        background-color: #8040bf;
      }
    }
  }
</style>