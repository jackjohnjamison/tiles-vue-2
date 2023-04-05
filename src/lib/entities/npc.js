import { isWalkable } from '@/lib/map'
import { randomVariation } from '@/lib/utils'
import { pathfinding } from './movement/pathfinding'
import { npcPatrolSpeed } from '@/lib/constants'
import { modeStore } from '@/stores/mode'
import { entity } from './entity'

class npc extends entity {
  constructor(sprite) {
    super(sprite)
    this.path = []

    this.pathFinder = pathfinding(this, npcPatrolSpeed)
  }

  pickPath = () => {
    const { pathFinder, tileIndex } = this

    const destination = {
      x: randomVariation(tileIndex.x, 10, true),
      y: randomVariation(tileIndex.y, 10, true)
    }

    if (isWalkable(destination)) {
      pathFinder.requestMove(destination)
    }
  }

  update = (delta) => {
    // This is super ugly! I should probably stop the whole loop of NPC actions instead of testing every time!
    if (modeStore().modeName !== 'editMode') {
      const { pathFinder, pickPath, redraw, isMoving } = this
      if (!isMoving) {
        pickPath()
      }
      pathFinder.move(delta)
      redraw()
    }
  }
}

export { npc }
