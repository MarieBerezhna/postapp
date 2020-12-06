<template>
    <div class="modal fade" id="deleteAccountModal" tabindex="-1" role="dialog" 
    aria-labelledby="changePassModalLabel" aria-hidden="true">
            
    <div class="modal-dialog bg-light" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Account termination</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h3>
            Dear {{ user.name ? user.name : 'postApp buddy' }}!
        </h3>
        <p>

        If you decide to procceed with the account termination, all of your data is going to be erased.
        </p>
        <p>
            That includes posts and comments written by you, post and profile pictures you've uploaded and any personal information you added to your profile.
        </p>
        <p>
             We're sorry to see you go. Please, let us know if you think we could do better. Have a nice life :)
        </p>
      </div>
      <div class="modal-footer">
          <div class="btn btn-danger" data-dismiss="modal"
          @click="rm_user()">
              Terminate my account
          </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
//import $ from 'jquery';
    export default {
        data() {
            return {
                message: ""
            }
        },
        computed: {
            user () {
                return JSON.parse(localStorage.user)
            }
        },
        methods: {
            rm_user() {
                this.$store.dispatch('rm_user', this.user.id)
                this.$router.push('/login')
            },
        }
    }
</script>

<style lang="scss" scoped>
.modal{
    z-index: 2000;
}
</style>