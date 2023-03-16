<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <!-- <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/other">Other</RouterLink>
      </nav>
    </header> -->

    <RouterView />
  </div>
</template>

<style lang="scss">
  @function pxToRem($value) {
    @return calc($value / 16) + rem; 
  }

  :root {
    --font: system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
    --color1: #639;

    font-family: var(--font);
    font-size: pxToRem(16);
    line-height: pxToRem(24);
    font-weight: 400;

    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

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

  .monitor {
    position: absolute;
    right: 0;
    background-color: rgba(100,100,100,.5);
  }

  button, input, select, label {
    cursor: pointer;
    margin: 2px;
  }

  input[type="text"] {
    cursor: text;
  }
</style>
