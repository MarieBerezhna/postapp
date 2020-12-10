<template>
<div>
    <button type="button" class="trigger btn btn-primary rounded-circle" data-toggle="modal" data-target="#exampleModal">
 +
</button>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="" method="POST"
            enctype="multipart/form-data">
          <div class="form-group">
            <label for=""></label>
            <input type="text" v-model="heading" placeholder="Heading (optional)" class="form-control">
            </div>
          <div class="form-group">
            <label for=""></label>
            <textarea placeholder="Create post..." v-model="text"
            class="form-control" name="" id="" cols="30" rows="10"></textarea>
            </div>
          <div class="form-group">
            <label for=""></label>
            <input type="file" id="post-img" name="img" accept="image/*">
          </div>
          <div class="form-group">
            <label for="categories">Category</label>

            <select name="category" id="cats" class="browser-default custom-select">
              <option value="0">Uncategorized</option>
              <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" @click="createPost()" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import $ from 'jquery';
    export default {
        data () {
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
            cats: function () {
              return this.$store.state.data.cats
            }
        },
        methods: {
          createPost () {
            let post = {
              heading: this.heading,
              text: this.text,
              cat: $('#cats').children("option:selected").val(),
              origin: this.origin,
              tags: this.tags,
              user_id: this.user.id
            }
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