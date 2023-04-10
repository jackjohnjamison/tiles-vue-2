import { mouseTracker, resetMousePosition } from './mouse'
import { movementMarkers } from './movment-markers'
import { keyCheck, resetKeys, keyEventFunctions } from './key-check'
import { initControls } from './init-controls'
import { playMode, blankControler } from './modes/base-controlers'
// import { setPlayModeAttack } from './modes/attack'
// import { setAnimation } from './modes/set-animation'
import { editMode } from './modes/edit-mode'

const modes = {
  blankControler,
  playMode,
  editMode
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
