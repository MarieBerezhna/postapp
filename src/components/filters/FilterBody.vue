<template>
    <div class="container-fluid">
        <button @click="toggleFilters($event)"
        class="w-100 radius border py-2 d-md-none">
            <img :src="require('../../assets/filter.png')" alt="filters" width="50" height="50">
        </button>
        <div class="container d-none d-md-block">
            <div class="row my-2 sort border radius py-2">
                <div class="col-12 col-md-2 text-secondary "> Sort:</div>
                <div class="col-6 offset-1 px-0">
                    <div class="btn border px-3 btn-info" @click="sort($event)">
                        Most Popular
                    </div>
                </div>
                <div class="col-3 px-0">
                    <div class="btn px-3 border" @click="sort($event)">
                        Latest
                    </div>
                </div>

            </div>
            <div class="row my-4 cats border radius py-2">
                <div class="col-12 col-md-4 text-secondary ">In categories:</div>

                <div class="col-12 col-md-8">
                    <input @keyup="filterCats($event)" @focus="filterCats($event)" type="text"
                        placeholder="Search categories" @blur="hideDropdown('.cats .dropdown-content')"
                        class="radius border w-100">
                </div>
                <div class="col-12">
                    <div class="dropdown col-12 col-md-8 offset-md-4">
                        <div id="filteredCats" class="dropdown-content radius">
                            <a data-id=0 @click="selectCat($event)">All</a>
                            <a v-for="cat in this.filteredCategories" @click="selectCat($event)" :key="cat.id"
                                :data-id="cat.id">{{ cat.name }}</a>
                        </div>
                    </div>

                    <div v-if="!this.selectedCategories.length">
                        <div class="cat-selected  d-inline-block btn btn-secondary mx-1 my-2">
                            All
                        </div>
                    </div>
                    <div v-else class="selectedCats">
                        <div v-for="cat in this.selectedCategories" :key="cat.id" :data-id="cat.id"
                            class="cat-selected d-inline-block btn btn-secondary mx-1 pr-0 my-2">
                            {{cat.name}}
                            <span @click="unselectCat($event)"
                                class="border border-secondary text-bold text-secondary bg-light radius py-1 px-2 ml-2">x</span>
                        </div>
                    </div>

                </div>
            </div>
                <div class="row my-4 tags border radius py-2">
                <div class="col-12 col-md-4 text-secondary ">In tags:</div>

                <div class="col-12 col-md-8">
                    <input @keyup="filterTags($event)" @focus="filterTags($event)" type="text"
                        placeholder="Search tags" @blur="hideDropdown('.tags .dropdown-content')"
                        class="radius border w-100">
                </div>
                <div class="col-12">
                    <div class="dropdown col-12 col-md-8 offset-md-4">
                        <div id="filteredCats" class="dropdown-content radius">
                            <a data-id=0 @click="selectCat($event)">All</a>
                            <a v-for="cat in this.filteredCategories" @click="selectCat($event)" :key="cat.id"
                                :data-id="cat.id">{{ cat.name }}</a>
                        </div>
                    </div>

                    <div v-if="!this.selectedCategories.length">
                        <div class="cat-selected  d-inline-block btn btn-secondary mx-1 my-2">
                            All
                        </div>
                    </div>
                    <div v-else class="selectedCats">
                        <div v-for="cat in this.selectedCategories" :key="cat.id" :data-id="cat.id"
                            class="cat-selected d-inline-block btn btn-secondary mx-1 pr-0 my-2">
                            {{cat.name}}
                            <span @click="unselectCat($event)"
                                class="border border-secondary text-bold text-secondary bg-light radius py-1 px-2 ml-2">x</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    export default {
        props: {
            categories: Array,
        },
        data() {
            return {
                filteredCategories: [],
                selectedCategories: []
            }
        },
        methods: {
            toggleFilters(e) {
                let filters = e.target.tagName === 'BUTTON' ? $(e.target).next('.container') : $(e.target).parent().next('.container');
                console.log(e.target.tagName );
                console.log(filters);
                if ($(filters).is(':visible')) {
                    console.log('visible')
                    $(filters).addClass('d-none');
                } else {
                    console.log('hidden')
                    $(filters).removeClass('d-none');
                }
            },
            hideDropdown(selector) {
                setTimeout(function () {
                    console.log(selector)
                    $(selector).hide();
                }, 500)

            },
            sort(e) {
                $('.sort .btn-info').removeClass('btn-info');
                $(e.target).addClass('btn-info');
            },
            filterCats(e) {
                $('.cats .dropdown-content').show();
                let val = e.target.value.toLowerCase();
                if (val.length) {
                    this.filteredCategories = this.categories.filter(cat => cat.name.toLowerCase().indexOf(val) !== -1);
                }
            },
            selectCat(e) {
                let id = $(e.target).attr('data-id');
                if (id !== "0") {
                    let cat = this.categories.filter(cat => cat.id === id)[0];
                    if (this.selectedCategories.indexOf(cat) === -1) {
                        this.selectedCategories.push(cat);
                    }

                } else {
                    this.selectedCategories = [];
                }
                $('.cats .dropdown-content').hide();
            },
            unselectCat(e) {
                let id = $(e.target).parent().attr('data-id');
                this.selectedCategories = this.selectedCategories.filter(cat => cat.id !== id);
            }
        }
    }
</script>

<style lang="scss" scoped>
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