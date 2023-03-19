<script setup>
  import { ref, onUpdated, onMounted } from 'vue'
  import { brushStore } from "@/stores/brushes"
  import { tileTypes } from "@/lib/game/map"
  import { sprites } from "@/lib/game/sprites"

  const brush = brushStore()
  const spriteCanvases = ref([])

  // Styling pixel widths for the brush canvases
  const paddingSides = 5
  const paddingBottom = 6
  const offset = 4

  let spriteWidth
  let spriteHeight
  let selectedTileSetSprites
  let selectedTileSetKey = brush.selectedTileSetKey

  const setSelectedTileSet = () => {
    brush.setSelectedTileSet(selectedTileSetKey)
    selectedTileSetSprites = sprites[selectedTileSetKey]

    if(selectedTileSetSprites) {
      spriteWidth = Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.width))
        + paddingSides

      spriteHeight = Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.height))
        + paddingBottom
    }
  }

  const updateSpriteCanvases = () => {
    const { floor, feature } = brush.selectedTileSet

    spriteCanvases.value.forEach((canvas, i) => {
      if(canvas) {
        canvas.width = spriteWidth
        canvas.height = spriteHeight
        const ctx = canvas.getContext("2d")

        if(floor) {
          ctx.filter = `hue-rotate(${brush.floorHueValue}deg)`
          const image = sprites[selectedTileSetKey][i].data
          ctx.drawImage(image, offset, offset);
        }

        if(feature) {
          ctx.filter = `hue-rotate(${brush.featureHueValue}deg)`
          const featureImage = sprites[brush.selectedTileSet.feature][i].data
          ctx.drawImage(featureImage, offset, offset);
        }
      }
    })

    brush.setHues()
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
      <div v-if="brush.selectedTileSet.type === 'void'" class="brush">
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
              :value="null"
              name="tileVariant"
              v-model="brush.variant"
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
              v-model="brush.variant"
              :style="{ width: spriteWidth + 'px', height: spriteHeight + 'px' }"
            />
          </div>
        </div>

        <!-- Hue sliders -->
        <div v-if="brush.selectedTileSet.feature">
          <div>
            <label for="featureHue">Feature Hue: </label>
            <span>{{ brush.featureHueValue }}</span>
          </div>
          <input
            class="hue-slider"
            id="featureHue"
            type="range"
            min="-180"
            max="180"
            step="1"
            v-model="brush.featureHueValue"
          />
        </div>

        <div v-if="brush.selectedTileSet.floor && brush.selectedTileSet.type === 'linked'">
          <div>
            <label for="floorHue">Floor Hue: </label>
            <span>{{ brush.floorHueValue }}</span>
          </div>
          <input
            class="hue-slider"
            id="floorHue"
            type="range"
            min="-180"
            max="180"
            step="1"
            v-model="brush.floorHueValue"
          />
        </div>

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