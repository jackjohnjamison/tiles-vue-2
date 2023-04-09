import { mouseTracker, resetMousePosition } from './mouse'
import { movementMarkers } from './movment-markers'
import { keyCheck, resetKeys, keyEventFunctions } from './key-check'
import { initControls } from './init-controls'
import { setPlayMode, setPlayModeAttack } from './modes/play'
import { setAnimation } from './modes/set-animation'
import { setEditMode } from './modes/edit'

const setMode = {
  playMode: setPlayMode,
  playModeAttack: setPlayModeAttack,
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
