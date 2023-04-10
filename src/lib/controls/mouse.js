import { scene } from '@/lib/scene'
import { modeStore } from '@/stores/mode'

const mouse = {
  x: null,
  y: null,
  buttonCode: 0,
  isDragged: false,
  dragStart: { x: 0, y: 0 },
  drag: { x: 0, y: 0 }
}

const mouseTracker = (element) => {
  const modes = modeStore()
  // Disables right click on the targeted element
  element.addEventListener('contextmenu', (e) => e.preventDefault())

  element.onmousemove = (e) => {
    const translate = {
      x: scene?.view?.translate.x || 0,
      y: scene?.view?.translate.y || 0
    }

    const { left, top } = e.target.getBoundingClientRect()

    mouse.x = e.clientX - left - translate.x
    mouse.y = e.clientY - top - translate.y

    if (mouse.buttonCode === 1) {
      mouse.isDragged = true
      mouse.drag.x = mouse.dragStart.x - mouse.x - translate.x
      mouse.drag.y = mouse.dragStart.y - mouse.y - translate.y
    }
  }

  element.onmousedown = (e) => {
    e.preventDefault()
    // The current targeted element still needs to lose focus
    document.activeElement.blur()
    mouse.buttonCode = e.which

    mouse.dragStart.x = mouse.x
    mouse.dragStart.y = mouse.y
    mouse.drag.x = 0
    mouse.drag.y = 0
  }

  document.onmouseup = () => {
    if (mouse.buttonCode === 1) {
      modes.mode.leftClickAction()
    } else if (mouse.buttonCode === 3) {
      modes.mode.rightClickAction()
    }

    mouse.isDragged = false
    mouse.buttonCode = 0
  }

  element.onmouseleave = () => {
    mouse.isDragged = false
    mouse.buttonCode = 0
  }

  return mouse
}

const resetMousePosition = () => {
  mouse.x = null
  mouse.y = null
}

export { mouseTracker, resetMousePosition }
