import { scene, redrawEntities } from '@/lib/scene'
import { getId } from '@/lib/utilities'
import { tileIndexToPosition, setWalkable } from '@/lib/map'
import { sprites } from '@/lib/sprites'
import { drawEllipse } from '@/lib/effects'
import { defaultHaloColor, baseMarkerSize } from '@/lib/constants'

class entity {
  constructor({ sprite, haloColor }) {
    this.sprite = sprite || sprites.playerTokens.sheild
    this.haloColor = haloColor || defaultHaloColor
    this.id = getId()
    this.position = {
      x: 0,
      y: 0
    }
  }

  afterAdd = () => {}

  addToScene = (tileIndex) => {
    const { entityMap } = scene
    const { render, redraw, afterAdd, id } = this

    this.tileIndex = tileIndex
    this.position = tileIndexToPosition(tileIndex)
    this.positionPrevious = this.position
    this.redrawEntities = redrawEntities

    entityMap.addEntity(tileIndex, render, id)

    setWalkable(tileIndex, false)

    scene.entities.push(this)
    afterAdd()
    redraw()
  }

  render = () => {
    const { entityCtx } = scene
    const { sprite, position, haloColor } = this

    drawEllipse(position, haloColor, baseMarkerSize, entityCtx)

    entityCtx.drawImage(
      sprite.data,
      Math.round(position.x),
      Math.round(position.y - sprite.yOffset)
    )
  }

  redraw = () => {
    const { tileIndex, position, positionPrevious } = this

    this.redrawEntities(tileIndex, position, positionPrevious)

    this.positionPrevious = {
      x: position.x,
      y: position.y
    }
  }

  deleteEntity = () => {
    const { tileIndex, position, positionPrevious } = this
    const { entityMap } = scene
    entityMap.removeEntity(this.tileIndex)
    this.redrawEntities(tileIndex, position, positionPrevious)
  }

  update() {}
}

export { entity }
