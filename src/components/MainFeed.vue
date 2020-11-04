<template>
  <div id="main">
    <div v-for='post in posts' :key='post.id'>
        <h3>{{post.heading}}</h3>  
        <p>{{post.text}}</p>
    </div>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    posts () {
      console.log(this.$store.state.posts);
      return this.$store.state.posts;
    }
  },
    mounted() {
    this.$store.dispatch("getPosts");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
