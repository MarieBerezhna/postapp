<template>
    <div class="container">
        <div class="post border bg-light" :data-id="post.id">
            <h3 class="p-3 mb-0 bg-warning text-bold">{{post.heading}}</h3>
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
                    <div class="row mb-5 comment-box" v-for="comment in comments" :key="comment.id" :data-id="comment.id">
                        <img :src="comment.user_img ? comment.user_img : require('../assets/user.jpg')" alt=""
                            class="mx-auto d-block user-img p-0 col-2 col-md-1 rounded-circle">
                        <div class="position-relative col-11 offset-1 pb-3 pl-5 border bg-white comment">
                            <h5 class="w-100">{{comment.user_name}} 
                                <span class="text-secondary d-inline-block mr-3" style="font-size: 0.9rem; float: right">{{comment.datetime}}</span> </h5>
                            <div class="comment-text pb-2">
                                {{ comment.text }}
                                <div class="position-absolute buttons w-100" v-if="user" :data-id="comment.id">
                                    <span class=" btn bg-secondary text-white border py-0 mx-3">Reply</span>
                                    <span @click="rmComment($event)"
                                        class=" btn bg-secondary text-white border py-0 mx-3">Delete</span>

                                </div>
                            </div>
                        </div>
                    </div>
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
    h5 > span {
        font-size: .8rem;
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
    .post > h3 {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
    }
    .buttons {
        bottom: -20px;
        left: 0;
    }

    .buttons .btn {
        width: auto;
        border-radius: 30px;
    }
</style>