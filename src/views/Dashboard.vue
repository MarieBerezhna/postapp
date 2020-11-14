<template>
    <div class="container">
        <div class="user-box" v-if="Object.keys(user).length">
        <div class="row">
            <div class="col-12 col-md-6">
                <img :src="user.image? user.image : require('../assets/user.png')" :alt="user.name">
                <p>{{ user.bio }}</p>
                <p>{{ user.social }}</p>
                <p>{{ joined }}</p>
            </div>
            <div class="col-12 col-md-6">
                Email :{{user.email}}
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6"></div>
            <div class="col-12 col-md-6"></div>
        </div>
        {{user}}
        </div>
        <div v-else class="no-user">
            Please login
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: this.$store.state.user
            }
        },
        computed: {
            joined () {
                let data = this.user.joined
                data = data.slice(0, 10).split('-').reverse().join('/')
                return data
            }
        },
        mounted () {
        }
    }
</script>

<style lang="scss" scoped>

</style>