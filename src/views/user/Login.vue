<template>
    <div class="container text-center">
        <h1>{{ heading }} </h1>
         <span class="text-danger"> {{ error }} </span>
        <form action="#" method="post" @submit.prevent="formSubmit()"
            class="col-12 col-md-4 mx-auto">
            <div class="row">
                <div v-if="!this.loginPage" class="col-12 form-group">
                    <label for="username"></label>
                    <input v-model="username" type="text" class="form-control" placeholder="Username" name="username" required>
                </div>
                <div class="col-12 form-group">
                    <label for="email"></label>   
                    <input v-model="email" type="text" class="form-control" placeholder="Email" name="email" required> 
                </div>
                <div class="col-12 form-group">
                    <label for="psw"></label>
                    <input v-model="password" type="password" class="form-control" placeholder="Password" name="psw" required>
                </div>
                <div v-if="!this.loginPage" class="col-12 form-group">
                    <label for="psw-cnf"></label>
                    <input v-model="password_confirmation" type="password" class="form-control" placeholder="Confirm password" name="pswcnf" required>
                </div>
                <div class="col-12 form-group">
                    <button type="submit" class="btn w-100 mb-2">{{ submitText }}</button>
                    <p>{{ this.loginPage ? "Not registered?": "Already have an account?"}}
                        <a :href="this.loginPage ? '/signup' : '/login'">Sign up.</a>
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            loginPage: Boolean
        },
        data() {
            return {
                email: "",
                password: "",
                password_confirmation: "",
                username: ""
            }
        },
        computed: {
            heading() {
                return this.loginPage ? "Account Login" : "Sign up with us ;)";
            },
            submitText () {
                 return this.loginPage ? "Log In" : "Sign Up";
            },
            error () {
                return this.$store.state.warning;
            }
        },
        methods: {
            login: function () {
                let email = this.email
                let password = this.password
                this.$store.dispatch('login', {
                        email,
                        password
                    })
                    .then(() => {
                        
                        this.$router.push('/dashboard')
                        })
                    .catch(err => console.log(err))
            },
            register: function () {
                let data = {
                    email: this.email,
                    password: this.password,
                    username: this.username
                }
                if (data.password !== this.password_confirmation) {
                    this.$store.state.warning = "Passwords don't match"
                } else {
                this.$store.dispatch('register', data)
                    .then(() => {
                          this.$router.push('/dashboard')
                        })
                    .catch(err => console.log(err))
                }              

            },
            formSubmit: function () {
                this.loginPage ? this.login() : this.register()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>