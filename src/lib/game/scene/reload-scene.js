import { scene } from ".";
import { pauseStore } from '@/stores/pause'
import { renderLoop } from "./render-loop";

const reloadScene = (tileMap) => {
  renderLoop.stop();

  delete scene.entites;
  delete scene.tileMap;
  delete scene.entityMap;

  const { xTiles, yTiles } = tileMap;

  scene.view = scene.setView({
    xTiles,
    yTiles,
  });

  scene.loadMap(tileMap);

  pauseStore().unpause()
};

export { reloadScene };
