import { scene } from "../scene";
import { redrawTile } from "../scene";
import { setTile } from "./tile-map";
// import { getBrushSelection } from "../../jsx/tile-painter";

let previousTileIndex = {};

const paintTile = (tileIndex) => {
  // if (
  //   tileIndex.x !== previousTileIndex.x ||
  //   tileIndex.y !== previousTileIndex.y
  // ) {
  //   const { tileMap } = scene;
  //   const brushSelection = getBrushSelection();
  //   const { set, colors, variant, type } = brushSelection;

  //   // Make sure no entites are currently in the tile
  //   const entity = scene.entityMap.entities[tileIndex.x][tileIndex.y];
  //   const illegalTileChange = entity && type !== "floor";

  //   if (!illegalTileChange) {
  //     setTile(tileIndex, tileMap, set, colors, variant);

  //     redrawTile(tileIndex);
  //   }
  // }

  // previousTileIndex = tileIndex;
};

const unsetTileLock = () => {
  // previousTileIndex = {};
};

export { paintTile, unsetTileLock };
