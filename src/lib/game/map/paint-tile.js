import { scene } from "../scene";
import { redrawTile } from "../scene";
import { setTile } from "./tile-map";
import { brushStore } from "@/stores/brushes"

let previousTileIndex = {};

const paintTile = (tileIndex) => {
  if (
    tileIndex.x !== previousTileIndex.x ||
    tileIndex.y !== previousTileIndex.y
  ) {
    const { tileMap } = scene;
    const brush = brushStore()

    // Make sure no entites are currently in the tile
    const entity = scene.entityMap.entities[tileIndex.x][tileIndex.y];
    const illegalTileChange = entity && brush.selectedTileSet.type !== "floor";

    if (!illegalTileChange) {
      setTile(
        tileIndex,
        tileMap,
        brush
      );

      redrawTile(tileIndex);
    }
  }

  previousTileIndex = tileIndex;
};

const unsetTileLock = () => {
  previousTileIndex = {};
};

export { paintTile, unsetTileLock };
