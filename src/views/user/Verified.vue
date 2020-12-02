<template>
    <div class="container">
        <div class="row">
            <div class="col-10 mx-auto">

                <h1>Cool! You're a verified postApp user now!</h1>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.$route.params);
        }
    }
</script>

<style lang="scss" scoped>

</style>