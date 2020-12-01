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
        <form action="">
            <div class="col-12 form-group">
                <label for="psw"></label>
                <input type="password" class="form-control"
                    placeholder="Password" name="psw" required>
            </div>
            <div class="col-12 form-group">
                <label for="psw-cnf"></label>
                <input type="password" class="form-control"
                    placeholder="Confirm password" name="pswcnf" required>
            </div>
            <div class="col-12 form-group">
                <button type="submit" class="btn w-100">Change password!</button>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.modal{
    z-index: 2000;
}
</style>