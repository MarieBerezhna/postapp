<template>
  <div id="main" class="py-5 container ">
    <div class="row">
      <div class="col-12 col-md-7">
        <div v-for='post in posts' :key='post.id' class="border my-2 p-3">
          <h3 class="p-3 mb-0 bg-warning text-bold">{{post.heading}}</h3>
          <div class="row">
            <div class="col-12 col-md-6 p-0">
              <img :src="post.image" :alt="post.tags" width="100%">
              <div class="meta">
                  <span class="text-danger">{{ post.cat }}</span>
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
   <div class="btn btn-success mx-auto my-3">Read more</div>
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
      }
    },
    methods: {
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
        return text.slice(0, 300) + '...';
      }
    },
    mounted() {


      setTimeout(function () {
        $('.post-text').each((el) => {
          let body = $('.post-text')[el];
          let text = $(body).text();
          $(body).html(text);
        });
      }, 500);

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>