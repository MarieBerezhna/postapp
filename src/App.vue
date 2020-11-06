<template>
  <div id="app" class="container-fluid">

    <TopMenu class="mb-2"/>
    
     <router-view class="router-view"/>
     <MainFooter />
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'
import MainFooter from './components/MainFooter.vue'

export default {
  name: 'App',
  components: {
    TopMenu,
    MainFooter
  },
  mounted () {
    this.$store.dispatch("getData");
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
h3 {
  margin: 40px 0 0;
}
ul {
 list-style: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.router-view {
  height: auto;
  min-height: 100vh;
} 
</style>
