<template>
    <div class="modal fade " id="changePassModal" tabindex="-1" role="dialog" 
    aria-labelledby="changePassModalLabel" aria-hidden="true">
            
              <div class="modal-dialog bg-light" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                   <span class="text-danger"> {{ error }} </span>
        <form action="" @submit.prevent="changePass()">
            <div class="col-12 form-group">
                <label for="psw"></label>
                <input type="password" class="form-control" v-model="password"
                    placeholder="Enter new password" name="psw" required>
            </div>
            <div class="col-12 form-group">
                <label for="psw-cnf"></label>
                <input type="password" class="form-control" v-model="password_confirmation"
                    placeholder="Confirm new password" name="pswcnf" required>
            </div>
            <div class="col-12 form-group">
                <button type="submit"
                class="btn w-100">Change password!</button>
            </div>
            <div class="modal-footer">
                <span class="text-secondary" style="font-size: 0.9rem">
                Proceed with caution: <br>you won't be able to login with the old password afterwards.
                </span>
            </div>
        </form>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import $ from 'jquery';
    export default {
        data() {
            return {
                password: "",
                password_confirmation: "",
                error: ""
            }
        },
        methods: {
            modalWait () {
                $('.modal-body').css({opacity : 0.5})
            },
            changePass: function () {
                
                if (this.password !== this.password_confirmation) {
                    this.error = "Passwords don't match. Try again";
                // } else if (this.password.length < 5){
                //     this.error = "Password is too short. Must be at least 6 symbols";
                } else {
                    $('.modal-body').css({opacity : 0.5})
                    let pass = this.password;
                    let user_id = JSON.parse(localStorage.user).id;
                    this.$store.dispatch('change_pass', {
                        pass, user_id
                        }).then(() => {

                            $('.modal-body').css({opacity : 1}).text("Success!")

                        })
                    .catch(err => console.log(err))
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.modal{
    z-index: 2000;
}
</style>