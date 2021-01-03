<template>
  <div id="main" class="py-5 container ">
    <div class="row">
      <div class="col-12 col-md-5 order-md-1">
        <FilterBody :categories="categories"/>
      </div>
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