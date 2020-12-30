<template>
    <div class="container">
        <div class="post border bg-light" :data-id="post.id">
            <h3 class="p-3 my-0 bg-warning text-bold post-heading">{{post.heading}}</h3>
            <div class="row">
                <div class="col-12 col-md-6 p-3">
                    <img :src="post.image" :alt="post.tags" width="100%">
                    <div class="meta">
                        <span class="text-danger post-category" :data-id="post.cat">
                            {{ post.cat }}
                        </span>
                        <span v-for="tag in parseTags(post.tags)" :key="tag.index" class="text-success">
                            #{{ tag }}
                        </span>
                        <br>
                        <span> {{ datetime(post.datetime) }}</span>
                        <br>
                    </div>
                </div>
                <div v-html="post.text" class="col-12 col-md-6 p-3 post-text text-justify">
                </div>
            </div>
            <div class="row comments p-3 border-top">

                <div class="col-12">
                    <CommentsBox :comments="comments" :user="user"/>
                </div>
                <div class="col-12 comment-form">
                    <form action="">
                        <div class="row position-relative my-1">
                            <img :src="user.image" alt=""
                                class="mx-auto d-block user-img p-0 col-2 col-md-1 rounded-circle">

                            <textarea placeholder="Have some thoughts about it? Share with us!" name="" id=""
                                class="col-8 offset-1 pl-4 col-md-11 border"></textarea>
                        </div>

                        <button class="btn" type="submit" @click.prevent="comment()">Comment</button>
                    </form>
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
                console.log(this.comments);
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


</style>