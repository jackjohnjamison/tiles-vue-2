import { scene } from "../scene";
// import { resetUI } from "../../jsx/ui";
import { pauseStore } from '@/stores/pause'
import { keyCheck, resetKeys, keyEventFunctions } from "./key-check";
import { editMode } from "./modes/edit";
import { playMode } from "./modes/play";

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    scene.canvasRoot.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

keyEventFunctions.keyDown = (keyCode) => {
  const pause = pauseStore()

  switch (keyCode) {
    case "Space":
      pause.toggle();
      break;

    case "Enter":
      if (keyCheck("ControlLeft")) {
        toggleFullScreen();
      }
      break;

    default:
      return;
  }
};

document.addEventListener("visibilitychange", () => {
  const { pause } = pauseStore()

  if (document.visibilityState === "hidden") {
    pause();
    document.body.classList.add("paused");
  } else if (document.visibilityState === "visible") {
    // Prevents bug where keys are stuck down after tabbing away.
    resetKeys();
  }
});

const modes = {
  editMode,
  playMode,
};

const setMode = (mode) => {
  modes[scene.mode].unset();
  scene.mode = mode;
  // resetUI();
  modes[mode].set();
};

export { setMode };
