<script setup>
  import { pauseStore } from '@/stores/pause'
  const paused = pauseStore()
</script>

<script>
  // import { pauseToggle } from "../lib/game/controls/set-mode";
  import { save, load } from "../lib/game/scene/save-load";
  

  
  // console.log(pauseStore);

  export default {
    methods: {
      save,
      load,
      // pauseToggle,
    }
  }
</script>

<template>
    <div>
      <div id="pauseMenu">
        {{ paused.isPaused }}
        <div class="pause-menu-items">
          <p>Paused</p>
          <ul>
            <li><button @click='paused.toggle'>Resume</button></li>
            {{ paused.isPaused }}
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