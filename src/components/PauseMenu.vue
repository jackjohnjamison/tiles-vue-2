<script>
  import { pauseToggle } from "../lib/game/controls/set-mode";
  import { save, load } from "../lib/game/scene/save-load";

  export default {
    methods: {
      save,
      load,
      pauseToggle,
    }
  }
</script>

<template>
    <div>
      <div id="pauseMenu">
        <div class="pause-menu-items">
          <p>Paused</p>
          <ul>
            <li><button @click='pauseToggle'>Resume</button></li>
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