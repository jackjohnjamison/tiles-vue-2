import { scene, redrawEntities } from '@/lib/scene'
import { getId } from '@/lib/utils'
import { tileIndexToPosition, setWalkable, resetWalkable } from '@/lib/map'
import { drawEllipse } from '@/lib/effects'
import { baseMarkerSize, centerOffsetX } from '@/lib/constants'
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

  deleteEntity = (entityIndex = null) => {
    const { tileIndex, position, positionPrevious } = this
    const { entityMap, entities } = scene

    entityMap.removeEntity(this.tileIndex)
    resetWalkable(this.tileIndex)
    this.redrawEntities(tileIndex, position, positionPrevious)

    if (entityIndex) {
      entities.splice(entityIndex, 1)
    } else {
      const entityIndex = entities.findIndex((ent) => {
        return ent.id === this.id
      })

      if (entityIndex && entityIndex !== -1) {
        entities.splice(entityIndex, 1)
      }
    }
  }

  die = () => {
    const { position } = this
    const dealthAnimationFrames = 100

    let remainingFrames = dealthAnimationFrames

    this.update = () => {
      remainingFrames--

      if (remainingFrames >= 0) {
        this.redraw()
      } else {
        this.deleteEntity()
      }
    }

    this.render = () => {
      const { ctxEntity } = scene
      const { sprite, position } = this

      ctxEntity.globalAlpha = Math.max(remainingFrames / dealthAnimationFrames, 0)

      // If remaining frames is even
      if (remainingFrames % 2 == 0) {
        ctxEntity.filter = `blur(${(dealthAnimationFrames - remainingFrames) / 10}px)`
        ctxEntity.drawImage(sprite.data, position.x, position.y - sprite.yOffset)
      } else {
        ctxEntity.filter = `brightness(200%)`
        ctxEntity.drawImage(sprite.data, position.x, position.y - sprite.yOffset)
      }

      ctxEntity.filter = 'none'
      ctxEntity.globalAlpha
    }

    return {
      deathAnimation: {
        animation: createFountainEffect,
        props: {
          origin: {
            x: position.x + centerOffsetX,
            y: position.y
          },
          entity: this,
          runtime: dealthAnimationFrames
        }
      }
    }
  }

  receiveAttack(attack) {
    const { damage } = attack.weapon

    this.health -= damage
    if (this.health <= 0) {
      return this.die()
    } else {
      return false
    }
  }

  update() {}
}

export { entity }
