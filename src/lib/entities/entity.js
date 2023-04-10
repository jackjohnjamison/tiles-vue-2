import { scene, redrawEntities } from '@/lib/scene'
import { getId } from '@/lib/utils'
import { tileIndexToPosition, setWalkable } from '@/lib/map'
import { drawEllipse } from '@/lib/effects'
import { baseMarkerSize } from '@/lib/constants'
// import { setMode } from '@/lib/controls'
import { createFountainEffect } from '@/lib/effects'

class entity {
  constructor({ sprite, haloColor }) {
    this.sprite = sprite
    this.haloColor = haloColor
    this.id = getId()
    this.position = {
      x: 0,
      y: 0
    }
    this.health = 1
  }

  addToScene = (tileIndex) => {
    const { entityMap } = scene
    const { redraw } = this

    this.tileIndex = tileIndex
    this.position = tileIndexToPosition(tileIndex)
    this.positionPrevious = this.position
    this.redrawEntities = redrawEntities

    entityMap.addEntity(this)

    setWalkable(tileIndex, false)

    scene.entities.push(this)

    redraw()
  }

  render = () => {
    const { ctxEntity } = scene
    const { sprite, position, haloColor } = this

    drawEllipse(position, haloColor, baseMarkerSize, ctxEntity)

    ctxEntity.drawImage(sprite.data, position.x, position.y - sprite.yOffset)
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

    // Returns true because it has been deleted
    return true
  }

  die = () => {
    setMode.setAmination(createFountainEffect, {}, setMode.playMode)
  }

  receiveAttack(attack) {
    const { damage } = attack.weapon

    this.health -= damage
    if (this.health <= 0) {
      return this.die
    } else {
      return false
    }
  }

  update() {}
}

export { entity }
