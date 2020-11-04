<template>
  <div id="app" class="container-fluid">

    <TopMenu/>
    
     <router-view class="col-12 col-md-9 mx-auto"/>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'

export default {
  name: 'App',
  components: {
    TopMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
.container-fluid {
      padding: 0 !important;
}
.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
ul {
  list-style: none;
}
</style>
