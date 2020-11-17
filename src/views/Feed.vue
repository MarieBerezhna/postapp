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
        <div v-for='post in posts' :key='post.id' class="border my-2 p-3 post" :data-category="post.cat"
          :data-id="post.id">
          <h3 class="p-3 mb-0 bg-warning text-bold">{{post.heading}}</h3>
          <div class="row">
            <div class="col-12 col-md-6 p-0">
              <img :src="post.image" :alt="post.tags" width="100%">
              <div class="meta">
                <span class="text-danger post-category" :data-id="post.cat">
                  <!-- {{ getCatName(post.cat) }} -->
                  {{ getCat(post.cat) }}
                </span>
                <span v-for="tag in parseTags(post.tags)" :key="tag.index" class="text-success">
                  #{{ tag }}
                </span>
                <br>
                <span> {{ datetime(post.datetime) }}</span>
                <br>
              </div>

            </div>
            <div class="col-12 col-md-6 p-3 post-text text-justify">
              {{ shortenText(post.text) }}
            </div>
          </div>
          <div class="row">
            <div class="col-12 hidden text-justify">

            </div>
          </div>
          <div class="row">
              <div @click="toggleText($event, post.id)" class="btn btn-success mx-auto my-3 col-10 col-md-4">Read more</div>
          </div>
         
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
import getCat from '../utils/getCatName';
import formatDateTime from '../utils/formatDateTime';
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
      getCat(cat) {
        return getCat(this.$store.state.data.cats, cat)
      },
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
        return formatDateTime(datetime)
      },
      shortenText: function (text) {
        let dots = '<span class="shortening-dots">...</span>';
        let index = text.indexOf('<br>');
        let visible = '<span class="shortened-text">' + text.slice(0, index) + dots + ' </span>';
        return visible;
      },
      toggleText: function (e, id) {
        let postDiv = $(e.target).parent().parent()[0];
        if ($(postDiv).find('.hidden').length) {
          let dots = $(postDiv).find('.shortening-dots');
          $(dots).remove();
          let post = this.posts.filter(post => post.id === id);
          let text = post[0].text;
          text = text.slice(text.indexOf('<br>'));
          $(postDiv).find('.hidden').removeClass('hidden').addClass('expanded').html(text);
          $(e.target).text('Hide');
        } else {
          $(postDiv).find('.expanded').removeClass('expanded').addClass('hidden').empty();
          $(e.target).text('Read more');
        }
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