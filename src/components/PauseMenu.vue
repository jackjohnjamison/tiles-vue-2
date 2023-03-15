<script>
  import { pauseToggle } from "../lib/game/controls/set-mode";

  export default {
    methods: {
      pauseToggle
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
            <li><button id="loadButton">Load</button></li>
            <li>
              <button class="save" id="saveButton">Save</button>
              <input type="text" id="saveName" value="tile-map" />
            </li>
          </ul>
        </div>
      </div>
    </div> 
</template>