<script setup>
  import { ref, onUpdated, onMounted } from 'vue'
  import { brushStore } from "@/stores/brushes"
  import { tileTypes } from "@/lib/game/map"
  import { sprites } from "@/lib/game/sprites"

  const brushes = brushStore()
  const spriteCanvases = ref([])

  // Styling pixel widths
  const paddingSides = 5
  const paddingBottom = 6
  const offset = 4

  let spriteWidth
  let spriteHeight
  let selectedTileSetSprites
  let [ selectedTileSetKey ] = Object.keys(tileTypes)

  const setSelectedTileSet = () => {
    brushes.setSelectedTileSet(selectedTileSetKey)
    selectedTileSetSprites = sprites[selectedTileSetKey]

    if(selectedTileSetSprites) {
      spriteWidth = Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.width))
        + paddingSides

      spriteHeight = Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.height))
        + paddingBottom
    }
  }

  const updateSpriteCanvases = () => {
    spriteCanvases.value.forEach((canvas, i) => {
      if(canvas) {
        canvas.width = spriteWidth
        canvas.height = spriteHeight
        const ctx = canvas.getContext("2d")
        const image = sprites[selectedTileSetKey][i].data
        ctx.drawImage(image, offset, offset);
      }
    })
  }

  onUpdated(() => {
    updateSpriteCanvases()
  })

  onMounted(() => {
    updateSpriteCanvases()
  })

  setSelectedTileSet()
</script>

<template>
  <div class="edit-mode">
    <div class="tilePainter">
      <select class="terrainType" :value="selectedTileSetKey"
        v-model="selectedTileSetKey"
        @change="setSelectedTileSet()">
        <option 
          v-for="tileSet in tileTypes"
          :key="tileSet.key"
          :value="tileSet.key"
        >{{tileSet.displayName}}</option>
      </select>

      <!-- The Void brush -->
      <div v-if="brushes.selectedTileSet.type === 'void'" class="brush">
        <div class="void-brush">X</div>
        <span>Delete tiles</span>
      </div>

      <!-- Other brushes -->
      <div v-else>
        <div class="sprite-brushes">
          <div class="brush">
            <div
              class="random-tile-brush"
              :style="{ width: spriteWidth + 'px', height: spriteHeight + 'px' }"
            ><div>?</div></div>
            <input
              checked
              type="radio"
              value="random"
              name="tileVariant"
              :style="{ width: spriteWidth + 'px', height: spriteHeight + 'px' }"
            />
          </div>
          <div v-for="(sprite, i) in selectedTileSetSprites" :key="i" class="brush">
            <canvas
              class="sprite-canvas"
              :ref="el => spriteCanvases[i] = el"
            />
            <input
              type="radio"
              :value="i"
              name="tileVariant"
              :style="{ width: spriteWidth + 'px', height: spriteHeight + 'px' }"
            />
          </div>
        </div>
        <!-- { tileSetArray.map((type) => (
          <HueSlider { ...{
            tileSet: tileSets[type],
            label: tileSetArray.length > 1 ? type + " Hue" : "Hue",
            tiles: tileSets,
            type,
          }}/>
        ))} -->
      </div>
    </div>
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

    .tilePainter {
      margin: 10px;
      min-width: 250px;
    
      .terrainType {
        font-family: var(--font);
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
          font-family: var(--font);
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