<template>
    <div class="container">
        <div class="row">
            <div class="col-10 mx-auto">

<h1>Welcome to postApp!</h1>
<p>
    We've sent an e-mail to {{ email }}, just so we no it's really you and nothing nasty is going on. 
</p>
<p>Please, verify your account when you have a minute. For now you're logged in with somewhat limited options.

</p>
<p>
    Have fun!
</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                email: ''
            }
        },
        mounted () {
            this.email = JSON.parse(localStorage.user).email
        }
    }
</script>

<style lang="scss" scoped>

</style>