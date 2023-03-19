<script setup>
  import GamePort from '@/components/GamePort.vue'
</script>

<template>
  <div class="wrapper">
    <GamePort />
  </div>
</template>

<style lang="scss">
  @import "@/mixins/px-to-rem.scss";

  :root {
    --font: system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
    --font-size: pxToRem(16);
    --font-weight: 400;

    --font-color-light: #e3e3e3;
    --color-accent: #639;
    --color-dark: #242424;

    --frostedFilter: grayscale(0.5) blur(1px);

    font-family: var(--font);
    font-weight: var(--font-weight);
    font-size: var(--font-size);
    color: var(--font-color-light);

    background-color: var(--color-dark);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

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

  .margin-left-auto {
    margin-left: auto;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .margin-left-10 {
    margin-left: 10px;
  }

  // Move me
  .monitor {
    position: absolute;
    right: 0;
    background-color: rgba(100,100,100,.5);
  }
</style>
