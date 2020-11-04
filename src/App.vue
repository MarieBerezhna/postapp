<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <MainFeed/>
  </div>
</template>

<script>
import MainFeed from './components/MainFeed.vue'

export default {
  name: 'App',
  components: {
    MainFeed
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
