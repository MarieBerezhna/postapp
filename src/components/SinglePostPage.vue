<template>
    <div class="container">
        <div class="post border bg-light" :data-id="post.id">
            <h3 class="p-3 my-0 bg-warning text-bold post-heading">{{post.heading}}
                <img v-if="this.user !== null && parseInt(post.user_id) === this.user.id" class="rm-post"
                    @click="rmPost($event)" :src="require('../assets/cancel.png')" alt="delete" title="delete">
            </h3>

            <div class="row">
                <div class="col-12  p-3">
                    <a href="">
                        <img v-if="post.image" :src="post.image" :alt="post.tags" width="100%" class="rounded">
                    </a>

                    <div class="meta px-3 border-bottom row">
                        <a :href="'/user/' + post.user_name" class="col-4">
                            <img  class="user-img rounded-circle"
                                :src="post.user_image" :alt="'author: ' + post.user_name">
                            <span 
                                class="col-4 offset-5 text-dark">{{post.user_name}}</span>
                        </a>
                        <span class="text-danger post-category" :data-id="post.cat">
                            {{ post.cat }}
                        </span>

                        <span class="col-3"> {{ datetime(post.datetime) }}</span>
                        <div class="col-12">
                            <span v-for="tag in parseTags(post.tags)" :key="tag.index" class="text-success">
                                #{{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
                <div v-html="post.text" class="col-12  p-3 post-text text-justify">
                </div>
            </div>
            <span class="pl-3">{{ post.views ? post.views + 1 : 0 }} views</span>
            <div class="row comments p-3 border-top">

                <div class="col-12">
                    <CommentsBox :comments="comments" :user="user" />
                </div>
                <div v-if="user && user.verified" class="col-12 comment-form">
                    <form action="">
                        <div class="row position-relative my-1">
                            <img :src="user.image" alt="" class="d-block user-img p-0 col-2 col-md-1 rounded-circle">
                            <textarea placeholder="Have some thoughts about it? Share with us!" name="" id=""
                                class="col-8 offset-1 pl-4 col-md-11 border"></textarea>
                        </div>
                        <button class="btn" type="submit" @click.prevent="comment()">Comment</button>
                    </form>
                </div>
                <div v-else-if="user">
                    Please, verify your e-mail in order to comment.
                </div>
                <div v-else>
                    In order to comment, please, <a href="/login">log in</a>.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentsBox from './CommentsBox';
    import formatDateTime from '../utils/formatDateTime';
    export default {
        data() {
            return {
                id: this.$route.params.id,
                user: JSON.parse(localStorage.getItem('user')),
                post: {},
                comments: []
            }
        },
        components: {
            CommentsBox,
        },
        methods: {
            parseTags(tags) {
                return tags ? tags.split(' ') : [];
            },
            datetime: function (datetime) {
                return datetime ? formatDateTime(datetime) : '';
            },
            rmPost(e) {
                let post_id = e.target.parentNode.parentNode.getAttribute('data-id')
                this.$store.dispatch('rm_post', post_id);
                location = '/';
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
                let id = e.target.parentNode.getAttribute('data-id')
                console.log(id)
                this.$store.dispatch("rm_comment", id).then(resp => {
                    if (resp.status === 200) {
                        document.querySelector(`.comment-box[data-id='${id}']`).remove();
                    }
                }).catch(err => console.log(err));
            }
        },
        async mounted() {
            await this.$store.dispatch("get_post", this.id).then(resp => {
                this.post = resp.data.post;
                this.comments = resp.data.post.comments;
            }).catch(err => console.log(err));
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin-top: -50px;
    }

    .comment-form .btn {
        display: block;
        width: 250px;
        float: right;
    }

    .user-img {
        position: absolute;
        z-index: 100;
        height: 50px;
        width: 50px;
    }

    .post,
    .comment,
    textarea,
    .comment-form .btn {
        border-radius: 30px;
    }

    .rm-post {
        float: right;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
</style>