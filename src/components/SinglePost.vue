<template>
    <div class="post-inner bg-light radius pb-3">
        <a :href="`/post${post.id}`">
            <h3 class="p-3  my-0 bg-warning text-bold post-heading text-center">{{post.heading}}</h3>
        </a>
            <div class="row">
                <div class="col-12 p-0">
                     <a :href="`/post${post.id}`">
                    <img v-if="post.image" :src="post.image" :alt="post.tags" width="100%" class="rounded">
                    </a>
                    <div class="meta px-3 border-bottom row">
                        <a :href="'/user/' + post.user_name" class="col-4">
                        <img v-if="location.href.indexOf('dashboard') === -1" 
                        class="user-img rounded-circle"
                            :src="post.user_image" :alt="'author: ' + post.user_name">
                        <span v-if="location.href.indexOf('dashboard') === -1" 
                        class="col-4 offset-5 text-dark">{{post.user_name}}</span>
                        </a>
                        <span class="col-4 text-danger post-category" :data-id="post.cat">
                            {{ getCat(post.cat) }}
                        </span>
                        <span class="col-4"> {{ datetime(post.datetime) }}</span>
                        <div class="col-12 pt-3">
                            <span v-for="tag in parseTags(post.tags)" :key="tag.index" class="text-success">
                                #{{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
                <div v-html="post.text" class="col-12 p-3 post-text text-justify">
                </div>
            </div>
        <span class="pl-3">{{ post.views ? post.views : 0 }} views</span>
    </div>

</template>

<script>
    import formatDateTime from '../utils/formatDateTime';
    import getCat from '../utils/getCatName';
    export default {
        props: {
            post: Object
        },
        data() {
            return {
                location: location
            }
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user-img {
        left: 0;
        margin-top: -15px
    }
</style>