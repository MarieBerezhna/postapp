<template>
    <div>
        <div class="row my-4 cats border radius py-2">
            <input v-if=" this.parentSelector === '#createModal'" id="selected-cat" type="hidden"
                :value="this.selectedCategories.length ? this.selectedCategories[0].id : 0">
            <div class="col-12 col-md-4 text-secondary ">{{ label }}</div>

            <div class="col-12 col-md-8">
                <input @keyup="filterCats($event)" @focus="filterCats($event)" type="text"
                    placeholder="Search categories" @blur="hideDropdown(parentSelector + ' .cats .dropdown-content')"
                    class="radius border w-100">
            </div>
            <div class="col-12">
                <div class="dropdown col-12 col-md-8 offset-md-4">
                    <div id="filteredCats" class="dropdown-content radius">
                        <a data-id=0
                            @click="selectCat($event)">{{ this.parentSelector === '#createModal' ? "Uncategorized" : "All" }}</a>
                        <a v-for="cat in this.filteredCategories" @click="selectCat($event)" :key="cat.id"
                            :data-id="cat.id">{{ cat.name }}</a>
                    </div>
                </div>

                <div v-if="!this.selectedCategories.length">
                    <div class="cat-selected  d-inline-block btn btn-secondary mx-1 my-2">
                        {{ this.parentSelector === '#createModal' ? "Uncategorized" : "All" }}

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
                                    <button v-if="addCatOpt" @click.prevent="showNewCatInput($event)" style="font-weight: bold;
                                    height: 37px;
                                    width: 37px;" title="Create a new category" type="button"
                        class="trigger btn btn-primary rounded-circle"> + </button>
                    <div  v-if="addCatOpt" class="row newCatInput" style="display: none">
                        <input type="text" class="col-6 radius border px-3" placeholder="Type in new category name">
                        <button @click.prevent="addCat($event)" class="col-5 offset-1 btn btn-warning">Add
                            category</button>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        props: {
            label: String,
            parentSelector: String,
            addCatOpt: Boolean
        },
        data() {
            return {
                filteredCategories: [],
                selectedCategories: []
            }
        },
        computed: {
            categories() {
                return this.$store.state.data.cats;
            }
        },
        methods: {
            hideDropdown(selector) {
                setTimeout(function () {
                    $(selector).hide();
                }, 500)

            },
            filterCats(e) {
                $(this.parentSelector + ' .cats .dropdown-content').show();
                let val = e.target.value.toLowerCase();
                if (val.length) {
                    this.filteredCategories = this.categories.filter(cat => cat.name.toLowerCase().indexOf(val) !== -1);
                }
            },
            selectCat(e) {
                let id = $(e.target).attr('data-id');
                if (id !== "0") {
                    let cat = this.categories.filter(cat => cat.id === parseInt(id))[0];
                    if (this.selectedCategories.indexOf(cat) === -1) {
                        if (this.parentSelector === '#createModal') this.selectedCategories = [];
                        this.selectedCategories.push(cat);
                    }
                } else {
                    this.selectedCategories = [];
                }
                $(this.parentSelector + ' .cats .dropdown-content').hide();
            },
            unselectCat(e) {
                let id = $(e.target).parent().attr('data-id');
                this.selectedCategories = this.selectedCategories.filter(cat => cat.id !== parseInt(id));
            },
            showNewCatInput(e) {
                console.log($(e.target).parent('#main'));
                $(e.target).animate({
                    deg: 45
                }, {
                    duration: 1200,
                    step: function (now) {
                        now = $('.newCatInput:visible').length ? -now : 0;
                        $(this).css({
                            transform: 'rotate(' + now + 'deg)'
                        });
                    }
                });
                $('.newCatInput:visible').length ? $('.newCatInput').slideUp() :  $('.newCatInput').slideDown();
            },
            async addCat(e) {
                let val = $(e.target).prev('input').val().trim();
                if (val.length) {
                    let duplicates = this.$store.state.data.cats.filter(cat => cat.name === val);
                    if (!duplicates.length) {
                        let newCat = await this.$store.dispatch('add_cat', val);
                        console.log(newCat);
                    } else {
                        // handle duplicate (autoselect)
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>