<script setup>
  import GamePort from '@/components/GamePort.vue'
  import { color } from '@/config/colors'

  const { panelTrans } = color
</script>

<template>
  <div class="wrapper">
    <GamePort />
  </div>
</template>

<style lang="scss">
  // Global styles
  html,
  body, #app {
    height: 100%;
    margin: 0;
  }

  .wrapper {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  button, input, select, label {
    cursor: pointer;
    margin: 2px;
  }

  input[type="text"] {
    cursor: text;
  }

  .panel {
    background-color: v-bind(panelTrans);
    backdrop-filter: var(--frostedFilter);
    margin: 4px;
    border-radius: 3px;
  }

  // Do I really need these classes?
  .margin-left-auto {
    margin-left: auto;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .margin-left-10 {
    margin-left: 10px;
  }
</style>
