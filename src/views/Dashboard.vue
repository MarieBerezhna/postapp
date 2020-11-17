<template>
    <div class="container">
        <form class="user-box" v-if="Object.keys(user).length" :id="user.id">
            <div class="row">
                <div class="col-12 col-md-6  text-center">
                    <div @mouseover="imgHover($event)"  
                    class="img-box border border-warning rounded-circle mb-3 mx-auto position-relative">
                    <img :src="user.image? user.image : require('../assets/user.jpg')" :alt="user.name"
                        class="user-image img border border-warning rounded-circle" 
                        
                        width="250" height="250"
                        :data-value="user.image">
                    <div class="img-hover bg-dark text-light position-absolute" @mouseleave="hideImgHover($event)">
                        <!--  -->
                        
                    </div>
                    </div>

                    <div class="user-meta">
                        <textarea name="" id="" cols="5" rows="3" class="hidden w-50 mx-auto border rounded md-textarea form-control" ></textarea>
                        <p v-html="bio" @click="toggleBio()">
                        </p>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="user-meta text-left mt-md-3 text-center">
                        <div class="form-group position-relative">
                            <label for="username"></label>
                            <input type="text" id="username" class="w-75 w-md-100" @blur="disableInputAndSend($event)"
                                :placeholder="'Usename: ' + name" :value="name" disabled>
                            <font-awesome-icon :icon="['fas', 'edit']" @click="enableInput($event)"
                                class="edit-btn mt-1 mx-1 position-absolute" style="right: 0"/>
                        </div>
                        <div class="form-group position-relative">
                            <label for="email"></label>
                            <input type="text" id="email" class="w-75 w-md-100" @blur="disableInputAndSend($event)"
                                :value="user.email" :placeholder="user.email" disabled required>
                            <font-awesome-icon :icon="['fas', 'edit']" @click="enableInput($event)"
                                class="edit-btn mt-1 mx-1 position-absolute"  style="right: 0"/>
                        </div>

                        <div class="form-group p-3 position-relative">
                            <div class="social-links mx-auto text-center ">
                                <span class="link py-2 mx-2 border rounded" v-for="icon in social_icons"
                                    :key="icon.name"   
                                    :data-prefix="icon.prefix"
                                    :data-value="icon.url"
                                    :data-name="icon.name"
                                    :class="icon.url? 'border-success bg-success':'border-warning bg-warning'"
                                    @click="editSocial($event)">
                                    <font-awesome-icon :icon="['fab', icon.prefix]" class="mx-3" />
                                    <input type="text" class="d-none link-value" :value="icon.url"
                                   >
                                </span>
                                <br>
                                <input type="text" @blur="hideSocInput($event.target)" @change="updateLinkValue($event)"
                                    class="soc-edit w-75  mt-3">
                            </div>
                        </div>
                        <div class="form-group row col-md-7  mx-auto">
                            <div class="btn btn-secondary col-12 mx-auto my-1">Change password</div>
                            <div class="btn btn-danger col-12 mx-auto">Delete account</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4 pt-3">
                <div class="col-12 col-md-5 border p-2">
                    <h2 class="border-bottom text-center">Your latest comments:</h2>
                    <div class="comments p-2">
                        <p v-if="!comments">
                            You don't have any comments yet :(
                        </p>

                    </div>
                </div>
                <div class="col-12 col-md-7 border p-2">
                    <h2 class="border-bottom text-center">Your latest posts:</h2>
                    <div class="posts p-2">
                        <p v-if="!posts">
                            You don't have any posts yet :(
                        </p>
                        <div v-else>
                            <div class="row" v-for="post in posts" :key="post.id">
                                <div class="col"><a href="">{{ post.heading }}</a></div>
                                <div class="col">{{ getCatName(post.cat) }}</div>
                                <div class="col">{{ post.tags }}</div>
                                <div class="col">{{ getDateTime(post.datetime) }}</div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>

    </div>
</template>

<script>
import getCat from '../utils/getCatName';
import formatDateTime from '../utils/formatDateTime';
    import $ from 'jquery'
    export default {
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user')),
            }
        },
        computed: {
            social_icons() {
                return JSON.parse(this.user.social);
            },
            name() {
                return this.user.name ? this.user.name : 'Add username'
            },
            bio() {
                return this.user.bio ? `<p id="user-bio">${this.user.bio}</p><a class="btn bio-btn"> Edit </a>` :
                    '<p id="user-bio"></p><a class="btn bio-btn"> ... <br>Add bio </a>'
            },
            posts () {
                let posts = this.$store.state.data.posts.filter(post => post.user_id === this.user.id);
                return posts
            },
            comments () {
                // let comments = this.$store.state.data.comments.filter(comment => comment.user_id === this.user.id);
                // return comments ? comments : {}
                return this.user.comments
            }
        },
        methods: {
            enableInput(e) {
                let input = e.target.tagName === "svg" ? $(e.target).prev('input')[0] : $(e.target).parent().prev(
                    'input')[0];
                $(input).removeAttr('disabled');
            },
            toggleBio () {
                if ($('textarea:visible').length) {
                    $('textarea').slideUp();
                    $('.bio-btn').text($('textarea').val().length ? 'Edit' : 'Add bio')
                    $('#user-bio').text($('textarea').val()).slideDown();
                    
                    console.log($('#username').val());
                    // deletes username wtf?
                    this.updateUser();
                    


                } else {
                    $('#user-bio').slideUp();
                    $('textarea').text($('#user-bio').text()).slideDown();
                    $('.bio-btn').text('Save')
                }

            },
            disableInputAndSend(e) {
                $(e.target).attr('disabled', true);
                this.updateUser();
            },
            editSocial(e) {
                let span = $(e.target).closest('span')[0];
                let val = $(span).attr('data-value');
                let name = $(span).attr('data-name');
                if (!val) {
                   $('.soc-edit').attr('placeholder', name)
                } else {
                    $('.soc-edit').val(val);
                }
                $('.link').removeAttr('beingEdited')
                $(span).attr('beingEdited', true)

                $('.soc-edit').val(val).slideDown();
            },
            hideSocInput(target) {
                $(target).slideUp();
            },
            updateLinkValue(e) {
                let val = $(e.target).val();
                let span = $('.link[beingEdited]')[0];

                $(span).attr('data-value', val)
                this.updateUser();
                $(e.target).val('');
            },
            updateUser: function () {

                let social = {
                }
                $('.link').each((el) => {
                    let item = $('.link')[el];
                    let data = {
                        "name": $(item).attr('data-name'),
                        "prefix": $(item).attr('data-prefix'),
                        "url": $(item).attr('data-value')
                    }
                    social[el] = data;
                })

                const user = {
                    id: $('form').attr('id'),
                    name: $('#username').val(),
                    email: $('#email').val().trim(),
                    image: this.user.image,
                    social: JSON.stringify(social),
                    bio: $('textarea').val().trim()
                };
                console.log(user);
                
                    this.$store.dispatch('update_user', user)
                    .then(resp => {
                        console.log(resp.data.user);
                    })
                    .catch(err => console.log(err))
            },
            imgHover (e) {
                $(e.target).next('.img-hover').css({
                    bottom: 0,
                    height: '100%'
                }).html(`
                <p class="my-auto p-5">
                    upload image
                </p>
                `);
            },
            hideImgHover (e) {
                $(e.target).css({
                    bottom: '50%',
                    height: 0
                }).empty();
            },
            getDateTime (datetime) {
                return formatDateTime(datetime);
            },
            getCatName (cat_id) {
                return getCat(this.$store.state.data.cats, cat_id);
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .soc-edit, textarea {
        display: none;
    }

    .link,
    .edit-btn {
        cursor: pointer;
    }
    .img-box {
        width: 250px;
        height: 250px;
        margin-top: -20%;
        z-index: 1;
        cursor: pointer;
        img {
            z-index: -1;
        }
        .img-hover {
            z-index: 0;
            bottom: 50%;
            opacity: 0.5;
            width: 100%;
            height: 0;
            border-radius: 75%;
            transition: height 2s, bottom 2s;
        }
    }
</style>