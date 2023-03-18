<script setup>
  import { save, load } from "../lib/game/scene/save-load";
  import { pauseStore } from '@/stores/pause'

  const pause = pauseStore()
</script>

<template>
  <div v-if="pause.isPaused" class="pauseMenu">
    <div class="pause-menu-items">
      <p>Paused</p>
      <ul>
        <li><button @click='pause.toggle'>Resume</button></li>
        <li><button @click='load(this.$refs)' ref="loadButton">Load</button></li>
        <li>
          <button @click='save(this.$refs)' class="save" ref="saveButton">Save</button>
          <input type="text" ref="saveName" value="tile-map" />
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
    color: #fff;
    font-size: 32px;
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
      text-shadow: 0px 0px 4px #000000, 0px 0px 4px #000000;
    }

    ul {
      padding: 0;
    }

    p {
      margin: 20px;
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
      background-color: var(--color1);
      transition: background-color .2s;

      &:hover {
        background-color: #8040bf;
      }
    }
  }
</style>