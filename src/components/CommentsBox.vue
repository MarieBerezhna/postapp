<template>
    <div>
        <div class="row mb-5 comment-box my-2" v-for="comment in comments" :key="comment.id" :data-id="comment.id">
            <img :src="comment.user_img ? comment.user_img : require('../assets/user.jpg')" :alt="comment.user_name"
                class="mx-0 d-block user-img p-0 col-2 col-md-1 rounded-circle">
            <div class="position-relative col-12  pb-3 pl-5 border radius bg-white comment">
                <h5 class="w-100 pl-5 text-bold">{{comment.user_name}}
                    <span class="text-secondary d-inline-block mr-3"
                        style="font-size: 0.9rem; float: right">{{comment.datetime}}</span> </h5>
                <div class="comment-text pb-2 pl-5">
                    {{ comment.text }}
                    <div class="position-absolute buttons w-100 ml-3" v-if="user" :data-id="comment.id">
                        <span class=" btn bg-secondary text-white border py-0 mx-1">Reply</span>
                        <span v-if="current_user.id === parseInt(comment.user_id)" @click="rmComment($event)"
                            class=" btn bg-secondary text-white border py-0 mx-1">Delete</span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import formatDateTime from '../utils/formatDateTime';
    export default {
        props: {
            user: Object,
            comments: Array
        },
        computed: {
            current_user() {
                return JSON.parse(localStorage.user);
            },
        },
        methods: {
            datetime: function (datetime) {
                return datetime ? formatDateTime(datetime) : '';
            },
            comment() {
                let comment = {
                    datetime: 'Now',
                    post_id: this.id,
                    user_id: this.user.id,
                    user_name: this.user.name,
                    user_img: this.user.image,
                    text: document.querySelector('textarea').value
                }
                if (comment.text.length) {
                    this.$store.dispatch('comment', comment).then((res) => {
                        if (res.status === 200) {

                            this.comments.push(comment);
                            document.querySelector('textarea').value = '';
                        }
                    }).catch(err => console.log(err));
                }

            },

            rmComment(e) {
                let id = e.target.parentNode.getAttribute('data-id');
                this.$store.dispatch("rm_comment", id).then(resp => {
                    if (resp.status === 200) {
                        document.querySelector(`.comment-box[data-id='${id}']`).remove();
                    }
                }).catch(err => console.log(err));
            }
        },
        mounted() {
            console.log(this.current_user.id);
            console.log(JSON.parse(localStorage.user).id);
        }
    }
</script>

<style lang="scss" scoped>
    h5>span {
        font-size: .8rem;
    }

    .user-img {
        position: absolute;
        z-index: 100;
        height: 40px !important;
        width: 40px;
        margin-top: -15px;
    }

    .buttons {
        bottom: -20px;
        left: 0;
    }

    .buttons .btn {
        width: auto;
    }
</style>