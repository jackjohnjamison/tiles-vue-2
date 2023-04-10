import { mouseTracker, resetMousePosition } from './mouse'
import { movementMarkers } from './movment-markers'
import { keyCheck, resetKeys, keyEventFunctions } from './key-check'
import { initControls } from './init-controls'
import { playMode, blankControler } from './modes/base-controlers'
import { baseAttack } from './modes/base-attack'
import { baseAnimation } from './modes/base-animation'
import { editMode } from './modes/edit-mode'

const modes = {
  blankControler,
  playMode,
  editMode,
  baseAttack,
  baseAnimation
}

export {
  mouseTracker,
  keyCheck,
  resetKeys,
  keyEventFunctions,
  initControls,
  movementMarkers,
  resetMousePosition,
  modes
}
