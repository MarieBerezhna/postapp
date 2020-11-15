<template>
    <div class="container">
        <form class="user-box" v-if="Object.keys(user).length" :id="user.id">
            <div class="row">
                <div class="col-12 col-md-6  text-center">
                    <img :src="user.image? user.image : require('../assets/user.jpg')" :alt="user.name"
                        class="img border border-warning rounded-circle mb-3" width="250" height="250"
                        style="margin-top: -20%">
                    <div class="user-meta">
                        <p v-html="bio" @click="editUser()">
                        </p>
                        <p>Joined: {{ joined }}</p>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="user-meta text-left mt-md-3">
                        <div class="form-group position-relative">
                            <label for="username"></label>
                            <input type="text" id="username" class="w-100" @blur="disableAndSendInput($event)"
                            :value="'   Usename: ' + name" disabled>
                            <font-awesome-icon :icon="['fas', 'edit']" @click="enableInput($event)"
                            class="edit-btn mt-1 mx-1 position-absolute" />
                        </div>
                        <div class="form-group position-relative">
                            <label for="email"></label>
                            <input type="text" id="email" class="w-100" @blur="disableAndSendInput($event)"
                            :value="user.email" disabled>
                            <font-awesome-icon :icon="['fas', 'edit']" @click="enableInput($event)"
                            class="edit-btn mt-1 mx-1 position-absolute" />
                        </div>
                        
                        <div class="form-group w-100 pt-3">
                            <div class="social-links w-50 mx-auto">
                                <span class="link py-2 mx-2 border rounded" v-for="icon in social_icons" 
                                :key="icon.name" :class="icon.url? 'border-success bg-success':'border-warning bg-warning'"
                                @click="editSocial($event)">
                                     <font-awesome-icon :icon="['fab', icon.name]" class="mx-3" />
                                     <input type="text" class="d-none link-value" :value="icon.name + ':' + icon.url">
                                </span>
                                <input type="text" @blur="hideSocInput($event.target)" @change="updateLinkValue($event)" class="soc-edit mx-auto w-100 mt-3">
                            </div>
                        </div>
                        <div class="form-group row col-7  mx-auto">
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
                        <p v-if="!user.comments">
                            You don't have any comments yet :(
                        </p>
                    </div>
                </div>
                <div class="col-12 col-md-7 border p-2">
                    <h2 class="border-bottom text-center">Your latest posts:</h2>
                    <div class="posts p-2">
                        <p v-if="!user.posts">
                            You don't have any posts yet :(
                        </p>

                    </div>
                </div>

            </div>
        </form>

    </div>
</template>

<script>
import $ from 'jquery'
    export default {
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user')),
                social_icons: [{
                        name: 'facebook-f',
                        url: ''
                    },
                    {
                        name: 'linkedin-in',
                        url: ''
                    },
                    {
                        name: 'instagram',
                        url: ''
                    },
                    {
                        name: 'github',
                        url: ''
                    }
                ]
            }
        },
        computed: {
            joined() {
                return this.user.joined.slice(0, 10).split('-').reverse().join('/')
            },
            name() {
                return this.user.name ? this.user.name : 'Not provided'
            },
            bio() {
                return this.user.bio.length ? this.user.bio : '<a class="btn"> ... <br>Add bio </a>'
            }
        },
        methods: {
            editUser() {
                console.log('here');
            },
            enableInput(e) {
                let input = e.target.tagName === "svg" ? $(e.target).prev('input')[0] : $(e.target).parent().prev('input')[0];
                console.log(e.target, input, e.target.tagName);
                $(input).removeAttr('disabled');
            },
            disableAndSendInput(e) {
                console.log('here')
                $(e.target).attr('disabled', true)
            },
            setSocialLinks () {
                const social = this.user.social ? this.user.social.split(' ') : [];
                if (!social.lengt) return
                for (var i = 0; i < social.length; i++) {
                    let item = social[i].split(':');
                    let socObj = {
                        name: item[0],
                        url: item[1]
                    }

                    for (var s = 0; s < this.social_icons.length; s++) {
                    let icon = this.social_icons[s];
                    if (icon.name === socObj.name) {
                        icon.url = socObj.url
                    }
                }
                }
            }, 
            editSocial (e) {
                let span = $(e.target).closest('span')[0];
                let val = $(span).find('input').val();
                $('.link').removeAttr('beingEdited') 
                $(span).attr('beingEdited', true)
                $('.soc-edit')
                .attr('current-edit', val)
                .attr('placeholder', val.slice(0, val.indexOf('-')) + ' link')
                .slideDown()
                console.log(val)
            },
            hideSocInput (target) {
                $(target).slideUp();
            },
            updateLinkValue(e) {
                let val = $(e.target).val();
                let span = $('.link[beingEdited]')[0];
                let input = $(span).find('input');
                let initVal = $(input).val().slice(0, $(input).val().indexOf(':') + 1);
                $(e.target).closest('.link-value').val(initVal + val);
                console.log(initVal + val)
            },
            updateOnServer () {
                const user = {
                    name: '',
                    email: '',
                    password: '',
                    image: '',
                    social: '',
                    bio: '',
                    posts: '',
                    comments: ''
                };
                console.log(user);
            }
        },
        mounted() {
            this.setSocialLinks();
        }
    }
</script>

<style lang="scss" scoped>
.soc-edit {
    display: none;
}
.link,
.edit-btn {
    cursor: pointer;
}
</style>