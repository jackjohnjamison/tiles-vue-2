import { mouseTracker, resetMousePosition } from './mouse'
import { movementMarkers } from './movment-markers'
import { keyCheck, resetKeys, keyEventFunctions } from './key-check'
import { initControls } from './init-controls'
import { setPlayMode } from './modes/play'
import { setPlayModeAttack } from './modes/attack'
import { setAnimation } from './modes/set-animation'
import { setEditMode } from './modes/edit'

const setMode = {
  playMode: setPlayMode,
  attack: setPlayModeAttack,
  setAmination: setAnimation,
  editMode: setEditMode
}

export {
  mouseTracker,
  keyCheck,
  resetKeys,
  keyEventFunctions,
  initControls,
  movementMarkers,
  resetMousePosition,
  setMode
}
