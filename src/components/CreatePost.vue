<template>
  <div>
    <button type="button" class="trigger btn btn-primary rounded-circle" data-toggle="modal"
      data-target="#createModal">
      +
    </button>
    <!-- Modal -->
    <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createModalLabel">Create Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="" method="POST" enctype="multipart/form-data">

              <div class="form-group">
                 
                <label for="post-img" class="img-label">
                  <img :src="require('../assets/picture.png')" 
                  class="w-100" style="max-height: 430px;"
                  alt="Upload image" title="Upload image">
                   <input type="file" @change="readURL($event);" class="d-none" id="post-img" name="img" accept="image/*">
                </label>
              </div>
              <div class="form-group">
                <label for=""></label>
                <input type="text" v-model="heading" 
                style="z-index:2000"
                placeholder="Heading (optional)" class="form-control">
              </div>
              <div class="form-group">
                <label for="text"></label>
                <textarea @change="getTags($event.target.value )" placeholder="Create post..." v-model="text" class="form-control" name="text" id="text" cols="30"
                  rows="10"></textarea>
              </div>
              <div class="form-group mt-1">
                  <CatFilter :addCatOpt="true" :label="'Category'" :parentSelector="'#createModal'"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="createPost()" data-dismiss="modal">Save
              changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery';
  import CatFilter from './filters/CatFilter';
  export default {
    components: {
      CatFilter
    },
    data() {
      return {
        heading: '',
        text: '',
        image: '',
        category: '',
        origin: '',
        tags: ''
      }
    },
    computed: {
      user: function () {
        return localStorage.user ? JSON.parse(localStorage.user) : {}
      },
    },
    methods: {
      getTags(text) {
        let tags = [];
        let words = text.split(' ');
        words.forEach(word => {
          if(word.indexOf('#') === 0) {
            tags.push(word.replace('#', '')); 
          }
        });
        return tags.join(' ');
      },
      openImgInput (e) {
        $(e.target).next('input').trigger('click');
      },
      readURL(e) {
        let input = $(e.target)[0];
        
            if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(input).prev('img')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
      },
      createPost() {
      
        let post = {
          heading: this.heading,
          text: this.text,
          cat: $('#selected-cat').val(),
          tags: this.getTags(this.text),
          user_id: this.user.id,
          user_name: this.user.name,
          user_image: this.user.image
        }
        console.log(post);
        this.$store.dispatch('create_post', post)
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .trigger {
    position: fixed;
    bottom: 25px;
    right: 25px;
    font-size: 2rem;
    padding: 0 15px;
  }
  .img-label {
        height: auto;
    max-height: 400px;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 0;
  }
</style>