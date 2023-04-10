<script setup>
  import { scene } from '@/lib/scene'
  import { hoveredTileStore } from '@/stores/hovered-tile'
  import { keyCheck } from '@/lib/controls'
  import { modeStore } from "@/stores/mode";

  const hoveredTile = hoveredTileStore()
  const modes = modeStore()
</script>

<template>
  <aside v-if="modes.mode.modeName === 'editMode' && hoveredTile.tileIsHovered" class="tile-info">
    Current tile ( x: {{ hoveredTile.tileIndex.x }} y: {{ hoveredTile.tileIndex.y }})
    <div v-if="keyCheck('ControlLeft')">
      {{JSON.stringify(
        scene.tileMap.tiles[hoveredTile.tileIndex.x][hoveredTile.tileIndex.y],
        null,
        2
      )}}
    </div>
  </aside>
</template>

<style lang="scss" scoped>
  .tile-info {
    white-space: pre;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: $spaceSM;
    background: $darkTrans;
  }
</style>