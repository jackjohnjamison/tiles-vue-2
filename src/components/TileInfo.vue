<script setup>
  import { hoveredTileStore } from '@/stores/hovered-tile'
  import { modeStore } from "@/stores/mode";

  const hoveredTile = hoveredTileStore()
  const mode = modeStore()
</script>

<template>
  <aside v-if="mode.mode === 'editMode' && hoveredTile.tileIsHovered" class="tile-info">
    Current tile ( x: {{ hoveredTile.tileIndex.x }} y: {{ hoveredTile.tileIndex.y }})
  </aside>
</template>

<style lang="scss" scoped>
  .tile-info {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px;
    background: rgba(0,0,0,.5)
  }
</style>