import { mouseTracker, resetMousePosition } from './mouse'
import { movementMarkers } from './movment-markers'
import { keyCheck, resetKeys, keyEventFunctions } from './key-check'
import { initControls } from './init-controls'
import { setPlayMode } from './modes/play'
import { setEditMode } from './modes/edit'

const setMode = {
  playMode: setPlayMode,
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
