import { scene, redrawEntities } from "../scene";
import { getId } from "../utilities";
import { tileIndexToPosition, setWalkable } from "../map";
import { sprites } from "../sprites";
import { drawEllipse } from "../effects";
import { defaultHaloColor, baseMarkerSize } from "../constants";

class entity {
  constructor({ sprite, haloColor }) {
    this.sprite = sprite || sprites.playerTokens.sheild;
    this.haloColor = haloColor || defaultHaloColor;
    this.id = getId();
    this.position = {
      x: 0,
      y: 0,
    };
  }

  afterAdd = () => {};

  addToScene = (tileIndex) => {
    const { entityMap } = scene;
    const { id, render, redraw, afterAdd } = this;

    this.tileIndex = tileIndex;
    this.position = tileIndexToPosition(tileIndex);
    this.positionPrevious = this.position;
    this.redrawEntities = redrawEntities;

    entityMap.addEntity({
      tileIndex,
      render,
    });

    setWalkable(tileIndex, false);

    scene.entities.push(this);
    afterAdd();
    redraw();
  };

  render = () => {
    const { entityCtx } = scene;
    const { sprite, position, haloColor } = this;

    drawEllipse(position, haloColor, baseMarkerSize, entityCtx);

    entityCtx.drawImage(
      sprite.data,
      Math.round(position.x),
      Math.round(position.y - sprite.yOffset)
    );
  };

  redraw = () => {
    const { tileIndex, position, positionPrevious } = this;

    this.redrawEntities(tileIndex, position, positionPrevious);

    this.positionPrevious = {
      x: position.x,
      y: position.y,
    };
  };

  update() {}
}

export { entity };
