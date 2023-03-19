import { scene } from "./scene";
import { sprites } from "./sprites";

const start = async (canvases) => {
  await sprites.load();
  scene.start(canvases, "riddle");
  window.dump = () => console.log(scene);
};

export { start };