<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <header>
      <!-- img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /-->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/other">Other</RouterLink>
      </nav>
    </header>

  <RouterView />
  </div>
</template>

<style scoped>

</style>
