<template>
    <div class="post-inner bg-light radius">
        <a :href="`/post${post.id}`">
            <h3 class="p-3 mb-0 bg-warning text-bold post-heading">{{post.heading}}</h3>
        </a>
        <div class="row">
            <div class="col-12 p-0">
                <a href="">
<img v-if="post.image" :src="post.image" :alt="post.tags" width="100%" class="rounded">
                </a>
                
                <div class="meta px-3 border-bottom row">
                    <img class="user-img rounded-circle" :src="post.user_image" :alt="'author: ' + post.user_name">
                    <span class="col-4 offset-2">{{post.user_name}}</span>
                    <span class="col-3 text-danger post-category" :data-id="post.cat">
                        {{ getCat(post.cat) }}
                    </span>
                    <span class="col-3"> {{ datetime(post.datetime) }}</span>
                    <div class="col-12">
                        <span v-for="tag in parseTags(post.tags)" :key="tag.index" class="text-success">
                            #{{ tag }}
                        </span>
                    </div>
                </div>

            </div>
            <div v-html="post.shortened" class="col-12 p-3 post-text text-justify">
            </div>
        </div>
        <div class="row" v-if="post.text.length >= 300">
            <div @click="toggleText($event, post.id)" class="show btn btn-success mx-auto my-3 col-10 col-md-4">Read
                more</div>
        </div>
        <span class="pl-3">{{ post.views ? post.views : 0 }} views</span>
    </div>

</template>

<script>
    import formatDateTime from '../utils/formatDateTime';
    import $ from 'jquery';
    import getCat from '../utils/getCatName';
    export default {
        props: {
            post: Object
        },
        methods: {
            getCat(cat) {
                return this.$store.state.data.cats ? getCat(this.$store.state.data.cats, cat) : cat;
            },
            parseTags(tags) {
                return tags ? tags.split(' ') : [];
            },
            datetime: function (datetime) {
                return formatDateTime(datetime)
            },
            toggleText: function (e, id) {
                let postDiv = $(`.post[data-id="${id}"]`).find('.post-text');
                if ($(e.target).hasClass('show')) {
                    $(postDiv).html(this.post.text);
                    $(e.target).removeClass('show')
                        .addClass('hide').text('Show less');

                } else {
                    $(e.target).removeClass('hide')
                        .addClass('show').text('Read more');
                    $(postDiv).html(this.post.shortened);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user-img {
        margin-top: -25px
    }
</style>