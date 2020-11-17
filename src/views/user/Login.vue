<template>
    <div class="container text-center">
        <h1>{{ heading }} </h1>
        <form action="#" method="post" @submit.prevent="loginPage ? login() : register()"
            class="col-8 col-md-4 mx-auto">
            <div class="row">
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
                    <button type="submit" class="btn w-100">{{ submitText }}</button>
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
            }
        },
        computed: {
            heading() {
                return this.loginPage ? "Account Login" : "Sign up with us ;)";
            },
            submitText () {
                 return this.loginPage ? "Log In" : "Sign Up";
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
                    .then(() => this.$router.push('/dashboard'))
                    .catch(err => console.log(err))
            },
            register: function () {
                let data = {
                    email: this.email,
                    password: this.password
                }
                if (data.password !== this.password_confirmation) {
                    console.log('wtf')
                }                
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>