<template>
  <div id="main" class="py-5 container ">
    <div class="row">
      <div class="col-12 col-md-5 order-md-1">
        <FilterBody/>
      </div>
      <div class="col-12 col-md-7">
        <div v-for='post in posts' :key='post.id' class="border radius-top my-4 post" :data-category="post.cat"
          :data-id="post.id">
          <SinglePost class="single-post" :post="post"/>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import SinglePost from '../components/SinglePost.vue';
  import FilterBody from '../components/filters/FilterBody.vue';
  export default {
    name: 'HelloWorld',
    components: {
      SinglePost,
      FilterBody
    },
    computed: {
      posts() {
        let posts = this.$store.state.data.posts;
        posts = posts ? posts.sort((a, b) => a.datetime - b.datetime).reverse() : [];
         return posts;
      },

    },
  }
</script>
<style scoped>

</style>