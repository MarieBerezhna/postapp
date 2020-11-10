<template>
  <div id="main" class="py-5 container ">
    <nav class="navbar navbar-expand-lg navbar-light position-relative w-100">
      <div class="collapse navbar-collapse position-absolute" id="navbarNav">
        <ul class="navbar-nav bg-light">
          <li class="nav-item active" @click="filterCats($event)">
            <a class="nav-link" href="#" data-category=0>All</a>
          </li>
          <li class="nav-item" v-for="cat in categories" :key="cat.id" @click="filterCats($event)">
            <a class="nav-link" :data-category="cat.id" href="#">{{ cat.name }}</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="row">
      <div class="col-12 col-md-7">
        <div v-for='post in posts' :key='post.id' class="border my-2 p-3 post" :data-category="post.cat">
          <h3 class="p-3 mb-0 bg-warning text-bold">{{post.heading}}</h3>
          <div class="row">
            <div class="col-12 col-md-6 p-0">
              <img :src="post.image" :alt="post.tags" width="100%">
              <div class="meta">
                <span class="text-danger post-category" :data-id="post.cat">
                  {{ getCatName(post.cat) }}
                </span>
                <span v-for="tag in parseTags(post.tags)" :key="tag.index" class="text-success">
                  #{{ tag }}
                </span>
                <br>
                <span> {{ datetime(post.datetime) }}</span>
                <br>
              </div>

            </div>
            <div class="col-12 col-md-6 post-text">
              {{ shortenText(post.text) }}
            </div>
          </div>
          <div @click="expandText($event)" class="btn btn-success mx-auto my-3">Read more</div>
          <!-- 
            <div v-if="post.origin" class="text-center">
                <a class=" text-warning" :href="post.origin">See original post</a> 
            </div> -->
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    name: 'HelloWorld',
    computed: {
      posts() {
        return this.$store.state.data.posts;
      },
      categories() {
        return this.$store.state.data.cats;
      }
    },
    methods: {
      filterCats(e) {
        e.preventDefault();
        let cat = $(e.target).attr('data-category');
        let posts = $('.post');

        if (cat !== "0") {

          $(posts).each((el) => {
            let post = $(posts)[el];
            let postcat = $(post).attr('data-category');
            if (postcat !== cat) {
              $(post).slideUp();
            } else {
              $(post).slideDown();
            }
          });
        } else {
          $(posts).slideDown();
        }

      },
      parseTags(tags) {
        let tagsArr = tags.split(' ');
        return tagsArr;
      },
      datetime: function (datetime) {
        let timeArr = datetime.split('T');
        let date = timeArr[0].split('-').reverse().join('/');
        let time = timeArr[1].slice(0, 5);
        return `${date} ${time}`;
      },
      shortenText: function (text) {
        let dots = '<span class="shortening-dots">...</span>';
        let visible = '<span>' + text.slice(0, 300) + dots + ' </span>';
        let hidden = '<span class="text-hidden d-none">' + text.slice(300) + ' </span>';
        return visible + hidden;
      },
      expandText: function (e) {
        let post = $(e.target).parent();
        post = post[0];
        let dots = $(post).find('.shortening-dots');
        $(dots).remove();
        // let hidden = $(post).find('.text-hidden').text();
      },
      getCatName: function (catId) {
        let cat = this.$store.state.data.cats.filter(cat => cat.id === catId);
        cat = cat[0];
        if (cat) {
          cat = JSON.parse(JSON.stringify(cat));
        }
        return cat ? cat.name : "";
      }
    },
    mounted() {
      setTimeout(function () {
        $('.post-text, text-hidden').each((el) => {
          let body = $('.post-text')[el];
          let text = $(body).text();
          $(body).html(text);
        });
      }, 500);


    }
  }
</script>
<style scoped>
</style>