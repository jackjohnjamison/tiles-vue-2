<script setup>
  import { ref, onUpdated, onMounted } from 'vue'
  import { brushStore } from "@/stores/brushes"
  import { tileTypes } from "@/lib/map"
  import { sprites } from "@/lib/sprites"
  import { spaceSM, spaceL } from '@/scss/global-imports/spacing.module.scss'

  const spaceSMPixels = parseInt(spaceSM, 10);
  const spaceLPixels = parseInt(spaceL, 10);
  const brush = brushStore()
  const spriteCanvases = ref([])

  let spriteWidth
  let spriteHeight
  let selectedTileSetSprites
  let selectedTileSetKey = brush.selectedTileSetKey

  const setSelectedTileSet = () => {
    brush.setSelectedTileSet(selectedTileSetKey)
    selectedTileSetSprites = sprites[selectedTileSetKey]

    if(selectedTileSetSprites) {
      spriteWidth = Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.width))
        + spaceLPixels

      spriteHeight = Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.height))
        + spaceLPixels
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
          ctx.drawImage(image, spaceSMPixels, spaceSMPixels);
        }

        if(feature) {
          ctx.filter = `hue-rotate(${brush.featureHueValue}deg)`
          const featureImage = sprites[brush.selectedTileSet.feature][i].data
          ctx.drawImage(featureImage, spaceSMPixels, spaceSMPixels);
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
  <div class=tile-painter>
    <select :value="selectedTileSetKey"
      v-model="selectedTileSetKey"
      @change="setSelectedTileSet()"
      aria-label="Select tile set"
      >
      <option 
        v-for="(tileSet, key) in tileTypes"
        :key="key"
        :value="key"
      >{{tileSet.displayName}}</option>
    </select>

    <!-- The Void (delete) brush -->
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
            :ref="function(el) { spriteCanvases[i] = el }"
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

      <!-- Hue slider feature -->
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

      <!-- Hue slider floor -->
      <div v-if="brush.selectedTileSet.type !== 'feature'">
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
</template>

<style lang="scss" scoped>
  .tile-painter {  
    .sprite-brushes {
      display: flex;
      margin: $spaceSM 0;
      gap: $spaceSM;
    }
  
    .brush {
      position: relative;
      display: flex;
      align-items: center;
  
      .void-brush,
      .random-tile-brush,
      canvas {
        background-color: $darkTrans;
        margin-left: $spaceSM;
      }

      .random-tile-brush,
      canvas {
        margin-top: - $spaceSM;
      } 
  
      .random-tile-brush {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $fontSizeL;
      }
  
      .void-brush {
        width: 48px;
        border: solid 1px $primary;
        text-align: center;
        font-size: $fontSizeL;
        margin-right: $spaceL;
        outline: 1px solid $dark;
        border-radius: $borderRadius;
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
      border: solid 1px $dark;
      border-radius: $borderRadius;
  
      &:checked {
        border-color: $primary;
      }
    }
  }
</style>