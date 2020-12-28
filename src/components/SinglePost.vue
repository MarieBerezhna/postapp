<template>
    <div class="post">
        <a :href="`/post${post.id}`">
        <h3 class="p-3 mb-0 bg-warning text-bold">{{post.heading}}</h3>
        </a>
        <div class="row">
            <div class="col-12 col-md-6 p-0">
                <img :src="post.image" :alt="post.tags" width="100%">
                <div class="meta">
                    <span class="text-danger post-category" :data-id="post.cat">
                        {{ getCat(post.cat) }}
                    </span>
                    <span v-for="tag in parseTags(post.tags)" :key="tag.index" class="text-success">
                        #{{ tag }}
                    </span>
                    <br>
                    <span> {{ datetime(post.datetime) }}</span>
                    <br>
                </div>

            </div>
            <div v-html="post.shortened" class="col-12 col-md-6 p-3 post-text text-justify">
            </div>
        </div>
        <div class="row" v-if="post.text.length >= 300">
            <div @click="toggleText($event, post.id)" class="show btn btn-success mx-auto my-3 col-10 col-md-4">Read
                more</div>
        </div>
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
        computed: {
            posts() { return this.$store.state.data}
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
                let post = this.posts.filter(post => post.id === id)[0];
                let postDiv = $(`.post[data-id="${id}"]`).find('.post-text');
                if ($(e.target).hasClass('show')) {
                    $(postDiv).html(post.text);
                    $(e.target).removeClass('show')
                        .addClass('hide').text('Show less');

                } else {
                    $(e.target).removeClass('hide')
                        .addClass('show').text('Read more');
                    $(postDiv).html(post.shortened);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>