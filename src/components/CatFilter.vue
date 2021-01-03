<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light position-relative w-100">

            <button class="navbar-toggler col" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse position-absolute" id="navbarNav">
                
                <ul class="navbar-nav bg-light">
                    <li class="nav-item active" @click="filterCats($event)">
                        <a class="nav-link" href="#" data-category=0>All</a>
                    </li>
                    <li class="nav-item" v-for="cat in categories" :key="cat.id" @click="filterCats($event)">
                        <a class="nav-link" :data-category="cat.id" href="#">{{ cat.name }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        props: {
            categories: Array,
        },
        methods: {
            filterCats(e) {
                e.preventDefault();
                let cat = $(e.target).attr('data-category');
                let posts = $('.post');

                if (cat !== "0") {

                    $(posts).each((el) => {
                        let post = $(posts)[el];
                        let postcat = $(post).attr('data-category');
                        if (postcat !== cat) {
                            $(post).slideUp();
                        } else {
                            $(post).slideDown();
                        }
                    });
                } else {
                    $(posts).slideDown();
                }

            },
        }
    }
</script>

<style lang="scss" scoped>

</style>