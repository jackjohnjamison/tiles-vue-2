<script setup>
  import { ref } from 'vue'
  // import { modeStore } from "@/stores/mode";
  import { tileTypes } from "@/lib/game/map"
  console.log(tileTypes);

  // Gets the first tile type and sets it as selected
  let selectedTileSetKey = ref(Object.keys(tileTypes)[0])
  // let 




</script>

<template>
  <div class="edit-mode">
    <form id="tilePainter">
      
      <select id="terrainType" name="terrainType" v-model="selectedTileSetKey" :value="selectedTileSetKey" >
        <option 
          v-for="brush in tileTypes"
          :key="brush.key"
          :value="brush.key"
        >{{brush.displayName}}</option>
      </select>
      <div>{{ selectedTileSetKey }}</div>
      
      <!-- SpriteDisplay / -->
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .edit-mode {
    position: absolute;
    left: 0;
    background-color: rgba(80,80,80,.8);
    margin: 5px;
    border-radius: 2px;

    button, input, select, label {
      cursor: pointer;
      margin: 2px;
    }

    .paused & {
      display: none;
    }

    #tilePainter {
      margin: 10px;
      min-width: 250px;
    
      #terrainType {
        // font-family: $font;
        font-weight: 500;
        font-size: 16px;
        border-radius: 2px;
      }
    
      select {
        padding: 2px;
      }
    
      label {
        text-transform: capitalize;
      }
    
      .sprite-brushes {
        display: flex;
        margin: 5px 0;
        gap: 5px;
      }
    
      .brush {
        position: relative;
        display: flex;
        align-items: center;
    
        .void-brush,
        .random-tile-brush,
        canvas {
          margin: 1px;
          background-color: rgba(0,0,0,.4);
        } 
    
        .random-tile-brush {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          // font-family: $font;
        }
    
        .void-brush {
          width: 48px;
          line-height: 1.4;
          border: solid 1px var(--color1);
          text-align: center;
          font-size: 32px;
          margin: 5px 10px 0 2px;
          outline: 1px solid #000;
          border-radius: 2px;
          cursor: pointer;
        }
    
        input {
          position: absolute;
          left: 0;
        }
      }
    
      .hue-slider {
        width: 100%;
      }
    
      input[type="radio"] {
        appearance: none;
        border: solid 1px #000;
        border-radius: 2px;
    
        &:checked {
          border-color: var(--color1);
        }
      }
    }
  }
</style>