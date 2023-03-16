import { scene } from "../scene";
import { isWalkable } from "../map";
import { entity } from "./entity";
import { randomVariationInt } from "../utilities";
import { pathfinding } from "./movement/pathfinding";
import { npcPatrolSpeed } from "../constants";
import { modeStore } from '@/stores/mode'

class npc extends entity {
  constructor(sprite) {
    super(sprite);
    this.path = [];

    this.pathFinder = pathfinding(this, npcPatrolSpeed);
  }

  pickPath = () => {
    const { pathFinder, tileIndex } = this;

    const destination = {
      x: randomVariationInt(tileIndex.x, 10),
      y: randomVariationInt(tileIndex.y, 10),
    };

    if (isWalkable(destination)) {
      pathFinder.requestMove(destination);
    }
  };

  update = (delta) => {
    const { pathFinder, pickPath, redraw, isMoving } = this;

    // This is super ugly! I should probably stop the whole loop of NPC actions instead of testing every time!
    if (modeStore().mode !== "editMode") {
      if (!isMoving) {
        pickPath();
      }
      pathFinder.move(delta);
    }

    redraw();
  };
}

export { npc };
