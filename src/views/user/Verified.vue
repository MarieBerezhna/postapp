<template>
    <div class="container">
        <div class="row">
            <div class="col-10 mx-auto">

                <h1>{{ message }}</h1>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ""
            }
        },
        created() {
            this.$store.dispatch('verify_email', this.$route.params.id)
            .then(() => this.message = "Cool! You're a verified postApp user now!")
            .catch(()=> this.message = "Sorry, there was an error with ypur request. Please, try again later.")
        }
    }
</script>

<style lang="scss" scoped>

</style>