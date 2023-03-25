<script setup>
  import { scene } from '@/lib/scene'
  import { hoveredTileStore } from '@/stores/hovered-tile'
  import { keyCheck } from '@/lib/controls'
  import { modeStore } from "@/stores/mode";

  const hoveredTile = hoveredTileStore()
  const mode = modeStore()
</script>

<template>
  <aside v-if="mode.mode === 'editMode' && hoveredTile.tileIsHovered" class="tile-info">
    <div v-if="keyCheck('ControlLeft')">
      {{JSON.stringify(
        scene.tileMap.tiles[hoveredTile.tileIndex.x][hoveredTile.tileIndex.y],
        null,
        2
      )}}
    </div>
    Current tile ( x: {{ hoveredTile.tileIndex.x }} y: {{ hoveredTile.tileIndex.y }})
  </aside>
</template>

<style lang="scss" scoped>
  .tile-info {
    white-space: pre;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px;
    background: rgba(0,0,0,.5)
  }
</style>