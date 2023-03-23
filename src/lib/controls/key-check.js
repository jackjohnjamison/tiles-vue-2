let pressedKeys = {}
const keyEventFunctions = {
  keyDown: () => {}
}

document.addEventListener('keydown', (e) => {
  const { keyDown } = keyEventFunctions

  pressedKeys[e.code] = true
  keyDown(e.code, e)
})

document.addEventListener('keyup', (e) => {
  pressedKeys[e.code] = false
})

const resetKeys = () => {
  pressedKeys = {}
}

const keyCheck = function (keyCode) {
  return pressedKeys[keyCode] || false
}

export { keyCheck, resetKeys, keyEventFunctions }
