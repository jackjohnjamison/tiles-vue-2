import { defineStore } from 'pinia'
import { editMode } from "@/lib/game/controls/modes/edit";
import { playMode } from "@/lib/game/controls/modes/play";

const modes = {
  editMode,
  playMode,
};

export const modeStore = defineStore('mode', {
  state: () => {
    return { mode: undefined }
  },

  actions: {
    set(mode) {
      modes[this.mode]?.unset();
      this.mode = mode
      modes[mode].set();
    }
  }
})