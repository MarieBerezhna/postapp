<template>
    <div class="container">
        <div class="post">
        <h3 class="p-3 mb-0 bg-warning text-bold">{{post.heading}}</h3>
            <div class="row">
                <div class="col-12 col-md-6 p-0">
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
        </div>
    </div>
</template>

<script>
    import formatDateTime from '../utils/formatDateTime';
    export default {
        data() {
            return {
                id: this.$route.params.id,
                post: {}
            }
        },
        methods: {
            parseTags(tags) {
                return tags ? tags.split(' ') : [];
            },
            datetime: function (datetime) {
                return datetime ? formatDateTime(datetime) : '';
            },
            getPost: async function () {

            }
        },
        async mounted() {
            await this.$store.dispatch("get_post", this.id).then(resp => {
                this.post = resp.data.post;
            }).catch(err => console.log(err));
        }
    }
</script>

<style lang="scss" scoped>

</style>