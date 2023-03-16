<script setup>
  import { pauseStore } from '@/stores/pause'
  const pause = pauseStore()
</script>

<script>
  import { save, load } from "../lib/game/scene/save-load";

  export default {
    methods: {
      save,
      load,
    }
  }
</script>

<template>
  <div v-if="pause.isPaused">
    <div id="pauseMenu">
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
  </div> 
</template>