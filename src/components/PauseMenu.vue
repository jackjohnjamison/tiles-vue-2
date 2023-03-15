<script>
  import { pauseToggle } from "../lib/game/controls/set-mode";
  import { reloadScene } from "../lib/game/scene/reload-scene";
  import { loadTileMapFromJSON, saveTileMaptoJSON } from "../lib/game/map";

  export default {
    methods: {
      pauseToggle,

      save() {
        const { saveName, saveButton } = this.$refs
        const mapData = saveTileMaptoJSON();
        const downloadNode = document.createElement("a");
        downloadNode.setAttribute("href", mapData);
        downloadNode.setAttribute("download", saveName.value + ".json");
        saveButton.after(downloadNode);

        downloadNode.click();
        downloadNode.remove();
      },

      load() {
        const { loadButton } = this.$refs
        const loadNode = document.createElement("input");
        loadNode.type = "file";

        loadButton.after(loadNode);
        loadNode.onchange = () => {
          const reader = new FileReader();

          reader.onload = (e) => {
            const tileMap = loadTileMapFromJSON(e.target.result);
            reloadScene(tileMap);
          };

          reader.readAsText(loadNode.files[0]);
        };

        loadNode.click();
        loadNode.remove();
      }
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
            <li><button @click='load' ref="loadButton">Load</button></li>
            <li>
              <button @click='save' class="save" ref="saveButton">Save</button>
              <input type="text" ref="saveName" value="tile-map" />
            </li>
          </ul>
        </div>
      </div>
    </div> 
</template>