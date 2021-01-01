<template>
    <div class="container">
        <div class="user-box" :id="this.user.id">
            <input @change="avatarUpload($event)" type="file" id="image-input" name="avatar"
                accept="image/png, image/jpeg">
            <div class="row">

                <div class="col-12 col-md-6  text-center">
                    <div @mouseover="imgHover($event)" @mouseleave="hideImgHover($event)"
                        class="img-box border border-warning rounded-circle mb-3 mx-auto position-relative">

                        <img :src="this.user.image? this.user.image : require('../assets/user.jpg')"
                            :alt="this.user.name" class="user-image img border border-warning rounded-circle"
                            width="250" height="250" :data-value="this.user.image">
                        <div v-if="dashboard" class="img-hover bg-dark text-light position-absolute"
                            @click="uploadOpen()" @mouseleave="hideImgHover($event)">
                            <div class="upload" v-if="this.user.image">
                                {{ this.user.image.name }}
                            </div>
                        </div>
                    </div>
                    <div class="user-meta position-relative w-75 mx-auto">
                        <textarea name="" cols="5" rows="3"
                            class="hidden w-75 mx-auto border rounded md-textarea form-control"></textarea>
                        <span id="user-bio" class="w-75 mx-auto">
                            {{ this.user.bio ? this.user.bio : ' ... ' }}
                        </span>

                        <font-awesome-icon v-if="dashboard" :icon="['fas', 'check']" @click="toggleBio($event)"
                            class="position-absolute save-btn mt-1 mx-1" style="right:0;display:none" />
                        <font-awesome-icon v-if="dashboard" :icon="['fas', 'edit']" @click="toggleBio($event)"
                            class="position-absolute  edit-btn mt-1 mx-1" style="right:0;" />
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div v-if="this.user && !this.user.verified && dashboard"
                        class="not-verified font-weight-light text-muted">
                        Hey there! Your account is pending verification... <br>
                        If you didn't get a link via e-mail, please check the spam folder or<br>
                        <a class="link">request verification again</a>
                    </div>
                    <div class="user-meta text-left mt-md-3 text-center">
                        <div class="form-group position-relative">
                            <label for="username"></label>
                            <input type="text" id="username" class="w-75 w-md-100" :value="this.user.name" disabled>

                            <font-awesome-icon v-if="dashboard" :icon="['fas', 'check']"
                                @click="disableInputAndSend($event)" class="save-btn mt-1 mx-1 position-absolute"
                                style="right: 0; display: none" />
                            <font-awesome-icon v-if="dashboard" :icon="['fas', 'edit']" @click="enableInput($event)"
                                class="edit-btn mt-1 mx-1 position-absolute" style="right: 0" />
                            <span class="bio-btn-text"></span>
                        </div>
                        <div class="form-group position-relative">
                            <label for="email"></label>
                            <input type="text" id="email" class="w-75 w-md-100" :value="user.email"
                                :placeholder="user.email" disabled required>
                            <font-awesome-icon v-if="dashboard" :icon="['fas', 'check']"
                                @click="disableInputAndSend($event)" class="save-btn mt-1 mx-1 position-absolute"
                                style="right: 0; display: none" />
                            <font-awesome-icon v-if="dashboard" :icon="['fas', 'edit']" @click="enableInput($event)"
                                class="edit-btn mt-1 mx-1 position-absolute" style="right: 0" />
                        </div>

                        <div class="form-group p-3 position-relative">
                            <div class="social-links mx-auto text-center ">
                                <a class="link py-2 mx-2 border rounded text-dark" 
                                v-for="icon in social_icons"
                                    :key="icon.name" :data-prefix="icon.prefix" :data-value="icon.url"
                                    :href="icon.url" target="_blank"
                                    :data-name="icon.name" :class="icon.url? 'bg-success':'bg-warning'"
                                    @click="dashboard ? openSocialEdit($event) : null">
                                    <font-awesome-icon :icon="['fab', icon.prefix]" class="mx-3" />

                                    <input v-if="dashboard" type="text" class="d-none link-value" :value="icon.url">
                                </a>
                                <br>
                                <div v-if="dashboard" class="soc-edit mt-3">
                                    <input type="text" @blur="hideSocInput()" class="soc-edit w-75 ">
                                    <font-awesome-icon :icon="['fas', 'check']" @click="updateLinkValue($event)"
                                        class="save-btn mt-1 mx-1 position-absolute" style="right: 0;" title="Save" />
                                </div>
                            </div>
                        </div>
                        <div v-if="dashboard" class="form-group row col-md-7  mx-auto">
                            <div class="btn btn-secondary col-12 mx-auto my-1" data-toggle="modal"
                                data-target="#changePassModal">Change password</div>
                            <div class="btn btn-danger col-12 mx-auto" data-toggle="modal"
                                data-target="#deleteAccountModal">Delete account</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4 pt-3">
                <div class="col-12 col-md-7 p-2">
                    <h2 class="border-bottom text-center">{{ dashboard ? 'Your': this.user.name + "'s" }} latest posts:
                    </h2>
                    <div class="posts p-2">
                        <p v-if="!posts">
                            {{ dashboard ? 'You don\'t': this.user.name + "doesn't"}} have any posts yet :(
                        </p>
                        <div v-else>
                            <div class="row my-2" v-for="post in posts" :key="post.id">
                                <SinglePost class="w-100" :post="post" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-5 p-2">
                    <h2 class="border-bottom text-center">{{ dashboard ? 'Your': this.user.name + "'s" }} latest
                        comments:</h2>
                    <div class="comments p-2">
                        <p v-if="!comments.length">
                            {{ dashboard ? 'You don\'t': this.user.name + " doesn't"}} have any comments yet :(
                        </p>
                        <div v-else>
                            <CommentsBox :comments="comments" :user="user" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <change-pass />
        <delete-account />
    </div>
</template>
<script>
    import SinglePost from '../components/SinglePost.vue';
    import CommentsBox from '../components/CommentsBox';
    import getCat from '../utils/getCatName';
    import formatDateTime from '../utils/formatDateTime';
    import $ from 'jquery'
    import changePass from '../components/user/changePass.vue';
    import deleteAccount from '../components/user/DeleteAccount.vue';
    export default {
        components: {
            changePass,
            deleteAccount,
            SinglePost,
            CommentsBox,
        },
        data() {
            return {
                user: this.dashboard ? JSON.parse(localStorage.getItem('user')) : {},
                authorname: this.$route.params.name,
            }
        },
        props: {
            dashboard: Boolean,

        },
        computed: {
            social_icons() {
               
                return this.user.social ? JSON.parse(this.user.social)[0] : []
            },
            posts() {
                let posts = this.$store.state.data.posts;
                return posts ? posts.filter(post => post.user_id === this.user.id).slice(0, 6).reverse() : [];
            },
            comments() {
                let comments = this.$store.state.data.comments;
                return comments ? comments.filter(row => row.user_id === this.user.id).slice(0, 6).reverse() : [];
            }
        },
        methods: {
            getUser() {
                this.$store.dispatch('get_user', this.$route.params.name).then(user => {
                    this.user = user;
                    console.log(JSON.parse(this.user.social)[0])
                }).catch(err => console.log(err));
            },
            uploadOpen() {
                $('#image-input').click();
            },
            avatarUpload() {
                this.$store.dispatch('update_avatar', this.user.id).then(() => {
                        $('.user-image').attr('src', JSON.parse(localStorage.user).image);
                    })
                    .catch(err => console.log(err))
            },
            toggleBio(e) {
                let icon = e.target.tagName === "svg" ? e.target : $(e.target).parent();
                if ($('textarea:visible').length) {
                    $(icon).fadeOut();
                    $(icon).parent().find('.edit-btn').fadeIn();
                    $('textarea').slideUp();
                    $('#user-bio').text($('textarea').val()).slideDown();
                    this.updateUser();
                } else {
                    $(icon).fadeOut();
                    $(icon).parent().find('.save-btn').fadeIn();
                    $('#user-bio').slideUp();
                    $('textarea').text($('#user-bio').text()).slideDown();
                }
            },
            enableInput(e) {
                let icon = e.target.tagName === "svg" ? e.target : $(e.target).parent();
                $(icon).parent().find('.save-btn').fadeIn();
                $(icon).fadeOut();
                $(icon).parent().find('input').removeAttr('disabled');
            },
            disableInputAndSend(e) {
                let icon = e.target.tagName === "svg" ? e.target : $(e.target).parent();
                $(icon).fadeOut();
                $(icon).parent().find('.edit-btn').fadeIn();
                $(icon).parent().find('input').attr('disabled', true);
                this.updateUser();
            },
            openSocialEdit(e) {
                if (this.dashboard) e.preventDefault();
                let span = $(e.target).closest('.link')[0];
                let val = $(span).attr('data-value');
                console.log(val)
                let name = $(span).attr('data-name');
                $('.soc-edit').find('input').val('');
                // if assigned show the link, if not set placeholder:
                if (!val) {
                    $('.soc-edit').find('input').attr('placeholder', name)
                } else {
                    $('.soc-edit').find('input').val(val);
                }

                $('.link').removeAttr('beingEdited')
                $(span).attr('beingEdited', true)

                if (!$('.soc-edit:visible').length) {
                    $('.soc-edit').slideDown();
                }
            },
            hideSocInput() {
                $('.soc-edit').slideUp();
            },
            updateLinkValue(e) {
                let input = e.target.tagName == 'path' ?
                    $(e.target).parent().parent().find('input') :
                    $(e.target).parent().find('input');
  console.log(e.target, input);
                let val = $(input).val();
                console.log(val)
                let span = $('.link[beingEdited]')[0];
              
                $(span).attr('data-value', val ? val : '')
                    .removeClass(val ? 'bg-warning' : 'bg-success')
                    .addClass(val ? 'bg-success' : 'bg-warning');

               
                this.updateUser();
                this.hideSocInput();
                 $(input).val('');
            },
            updateUser: function () {
                if (this.dashboard) {
                let social = {"0":[]};
                $('.link').each((el) => {
                    let item = $('.link')[el];
                    let data = {
                        "name": $(item).attr('data-name'),
                        "prefix": $(item).attr('data-prefix'),
                        "url": $(item).attr('data-value')
                    }
                    social[0][el] = data;
                    console.log(data);
                })
                const user = {
                    id: this.user.id,
                    name: $('#username').val().trim(),
                    oldEmail: this.user.email,
                    email: $('#email').val().trim(),
                    social: JSON.stringify(social),
                    bio: $('#user-bio').text().trim()
                };
                this.$store.dispatch('update_user', user)
                    .catch(err => console.log(err))
                }

            },
            imgHover(e) {
                $(e.target).next('.img-hover').css({
                    bottom: 0,
                    height: '100%'
                }).html(`
                <p class="my-auto p-5">
                    upload image
                </p>
                `);
            },
            hideImgHover(e) {
                const hover = $(e.target).hasClass('img-hover') ? e.target : $(e.target).find('.img-hover')[0]
                $(hover).css({
                    bottom: '50%',
                    height: 0
                }).empty();
            },
            getDateTime(datetime) {
                return formatDateTime(datetime);
            },
            getCatName(cat_id) {
                return getCat(this.$store.state.data.cats, cat_id);
            }
        },
        mounted() {
            if (!this.dashboard) {
                this.getUser();
            }
            if ($('#adminNav:visible').length) {
                $('.admin')[0].click();
            }

        }
    }
</script>

<style lang="scss" scoped>
    .soc-edit,
    textarea {
        display: none;
    }

    .link,
    .edit-btn,
    .save-btn {
        cursor: pointer;
    }

    #image-input {
        opacity: 0;
        height: 0;
    }

    .img-box {
        width: 250px;
        height: 250px;
        margin-top: -20%;
        background-color: #fff;
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