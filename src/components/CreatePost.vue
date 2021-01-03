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
                <label for=""></label>
                <input type="text" v-model="heading" placeholder="Heading (optional)" class="form-control">
              </div>
              <div class="form-group">
                <label for=""></label>
                <textarea placeholder="Create post..." v-model="text" class="form-control" name="" id="" cols="30"
                  rows="10"></textarea>
              </div>
              <div class="form-group">
                <label for=""></label>
                <input type="file" id="post-img" name="img" accept="image/*">
              </div>
              <div class="form-group">
                  <CatFilter :label="'Category'" :parentSelector="'#createModal'"/>
                  Didn't find the right category?
                  <div class="row">
                  <input type="text" class="col-6 radius border px-3" placeholder="Type in new category name">
                  <button @click.prevent="addCat($event)"
                  class="col-5 offset-1 btn btn-warning">Add category</button>
                  </div>
                  
                 
                <label for="tags"></label>
                <textarea name="tags" id="tags" class="w-100 rounded my-2" placeholder="Add tags separated by spaces. 
You ca also use #tags inside a post text.">

            </textarea>
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
      openCatInput () {

      },
      async addCat(e) {
        let val = $(e.target).prev('input').val();
        if (val.length) {
          let duplicates = this.$store.state.data.cats.filter(cat => cat.name === val);
          if (!duplicates.length) {
            let newCat = await this.$store.dispatch('add_cat', val);
            console.log(newCat);
          } else {
            // handle duplicate (autoselect)
          }
        }
      },
      createPost() {
        let post = {
          heading: this.heading,
          text: this.text,
          cat: $('#selected-cat').val(),
          tags: $('#tags').val().split(' '),
          user_id: this.user.id,
          user_name: this.user.name,
          user_image: this.user.image
        }
        console.log(post);
        let words = post.text.split(' ');
        let tags = words.filter(word => word.indexOf('#') === 0);
        tags = words.forEach((word) => word = word.replace('#', ''));
        post.tags.concat(tags);
        post.tags = post.tags.join(' ');

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
</style>