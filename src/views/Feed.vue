<template>
  <div id="main" class="py-5 container ">
    <CatFilter :categories="categories" />
    <div class="row">
      <div class="col-12 col-md-7">
        <div v-for='post in posts' :key='post.id' class="border my-4 post" :data-category="post.cat"
          :data-id="post.id">
          <SinglePost :post="post"/>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import CatFilter from '../components/CatFilter.vue';
  import SinglePost from '../components/SinglePost.vue'
  export default {
    name: 'HelloWorld',
    components: {
      CatFilter,
      SinglePost,
    },
    computed: {
      posts() {
        let posts = this.$store.state.data.posts;
        return posts ? posts.reverse() : [];
      },
      categories() {
        return this.$store.state.data.cats;
      }
    }
  }
</script>
<style scoped>

</style>