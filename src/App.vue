<template>
  <div id="app" class="container-fluid">

    <TopMenu class="mb-2"/>
     <router-view class="router-view"/>
      <CreatePost v-if="allowed"/>
     <MainFooter />
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'
import MainFooter from './components/MainFooter.vue'
import CreatePost from './components/CreatePost'

export default {
  name: 'App',
  components: {
    TopMenu,
    MainFooter,
    CreatePost
  },
  computed: {
    allowed () {
      return localStorage.user ? JSON.parse(localStorage.user).verified : false
    }
  },
  mounted () {
    this.$store.dispatch("getData").catch(err => console.log(err));
  },
    created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
          reject()
        } else {
          resolve()
        }
        throw err;
      });
    });
  }
}
</script>

<style lang="scss">
$yellow: #F2BD00;
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
.router-view {
  height: auto;
  min-height: 70vh;
}
textarea {
  resize: none !important;
}
//colors:

.btn[type="submit"] {
  background-color: $yellow;
}
.post-inner > a {
    color: rgb(24, 15, 15);
    text-decoration: none;
}
.post-inner > a:hover {
    color: rgb(80, 46, 46);
    text-decoration: none;
}
</style>
