<template>
    <div class="container-fluid" id="filter">
        <button @click="toggleFilters($event)"
        class="w-100 radius border py-2 d-md-none">
            <img :src="require('../../assets/filter.png')" alt="filters" width="50" height="50">
        </button>
        <div class="container d-none d-md-block">
            <div class="row my-2 sort border radius py-2">
                <div class="col-12 col-md-2 text-secondary "> Sort:</div>
                <div class="col-6 offset-1 px-0">
                    <div class="btn border px-3 btn-info" @click="sort($event, 'pop')">
                        Most Popular
                    </div>
                </div>
                <div class="col-3 px-0">
                    <div class="btn px-3 border" @click="sort($event, 'date')">
                        Latest
                    </div>
                </div>

            </div>
            <CatFilter :label="'In categories:'" :parentSelector="'#filter'" />
                <div class="row my-4 tags border radius py-2">
                <div class="col-12 col-md-4 text-secondary ">In tags:</div>

                <div class="col-12 col-md-8">
                    <input @keyup="filterTags($event)" @focus="filterTags($event)" type="text"
                        placeholder="Search tags" @blur="hideDropdown('.tags .dropdown-content')"
                        class="radius border w-100">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import CatFilter from './CatFilter';
    export default {
        components: {
            CatFilter
        },

        methods: {
            toggleFilters(e) {
                let filters = e.target.tagName === 'BUTTON' ? $(e.target).next('.container') : $(e.target).parent().next('.container');
                if ($(filters).is(':visible')) {
                    $(filters).addClass('d-none');
                } else {
                    $(filters).removeClass('d-none');
                }
            },
            sort(e, param) {
                $('.sort .btn-info').removeClass('btn-info');
                $(e.target).addClass('btn-info');
                if (param === 'date') {
                   this.$store.commit('sort_by_date');
                } else {
                    this.$store.commit('sort_by_pop');
                }
            },
        }
    }
</script>

<style lang="scss">
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f6f6f6;
        min-width: 230px;
        overflow: auto;
        border: 1px solid #ddd;
        z-index: 1;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown a:hover {
        background-color: #ddd;
    }
</style>