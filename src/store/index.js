import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

const api = require('../../api');
let apiBase = `${api.protocol}://${api.host}${api.baseUrl}`;
//apiBase = 'http://localhost:3000/api';
const completeAvatar = (id, file) => {
    return (file && file.length)? `${apiBase}/users/avatar/${id}/${file}` : null;
};
const completePostPic = (id, file) => {
    return  (file && file.length)? `${apiBase}/postimage/${id}/${file}` : null;
};
const proceed_login = (commit, resp, resolve, reject) => {
    if (!resp.data.error) {
        const token = resp.data.data.token;
        const user = resp.data.data.user;
        if (user.image) {
            user.image = completeAvatar(user.id, user.image);
        }
        console.log(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common.Authorization = token;
        let data = {
            token,
            user
        };
        commit('auth_success', data);
        resolve(resp);
    } else {
        commit('auth_error', resp);
        reject(resp);
    }
};

//load Vuex
Vue.use(Vuex);
//to handle state
const state = {
    authStatus: '',
    data: {},
    token: localStorage.getItem('token') || '',
    user: {},
    warning: ''
};

//to handle state
const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.authStatus,
};

//to handle actions
const actions = {
    getData({
        commit
    }) {
        axios.get(
            `${apiBase}/init`
            //`http://localhost:3000/api/init`
            )
            .then(response => {

                if (response) {
                    let data = response.data.data;
                    data.comments.forEach(c => c.user_img = completeAvatar(c.user_id, c.user_img));
                    commit('SET_DATA', data);
                } else {
                    console.log('Server fault');
                }
            });
    },
    get_user({commit}, name) {
        console.log(commit, name);
        return new Promise((resolve, reject) => {
            axios.get(`${apiBase}/users/${name}`).then(resp => {
                let user = resp.data.user;
                user.image = completeAvatar(user.id, user.image);
                user.posts.forEach(post => {
                    post.user_image = user.image;
                    post.image = completePostPic(user.id, post.image);
                });
                user.comments.forEach(c => {
                    c.user_img = user.image;
                });
                console.log(user.comments);
                resolve(user);
            }).catch(err => reject(err));
        });
    },
    update_user({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiBase}/users/${user.id}`,
                //url: `http://localhost:3000/api/users/${user.id}`,
                data: user,
                method: 'PATCH'
            }).then(resp => {

                if (resp.data.user) {
                    const user = resp.data.user;
                    commit('update_user', user);
                    localStorage.setItem('user', JSON.stringify(user));
                }

                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        });
    },
    create_post({
        commit
    }, post) {

        return new Promise(() => {
            const fd = new FormData();
            const file = document.getElementById('post-img').files[0];
            if (file) fd.append('pic', file);
            fd.append('post', JSON.stringify(post));
            axios({
                //url: `http://localhost:3000/api/posts/${post.user_id}`,
                url: `${apiBase}/posts/${post.user_id}`,
                data: fd,
                method: 'POST',
            }).then(resp => {
                commit('new_post', resp.data.data);
            });
        });

    },
    add_cat: async ({ commit },cat, resolve) => {

        let result = await axios.post(`${apiBase}/categories/`, {name:cat});
        // to do : error handle
        resolve(result);
        commit('add_cat', result.data.data[0]);
        return result.data.data[0];
    },
    rm_post({
        commit
    }, id) {
        return new Promise((resolve, reject) => {
            axios({
               url: `${apiBase}/posts/${id}`,
                method: 'DELETE'
            }).then((resp) => {
                commit('rm_post', id);
                resolve(resp);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    comment({
        commit
    }, data) {
        console.log(commit, data);
        return new Promise((resolve, reject) => {
            axios({
                //url: `http://localhost:3000/api/comment`,
                url: `${apiBase}/comment`,
                data,
                method: 'POST'
            }).then(resp => {
                commit('new_comment', resp);
                resolve(resp);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    rm_comment({
        commit
    }, id) {
        console.log(commit, id);
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiBase}/comment/${id}`,
                //url: `http://localhost:3000/api/comment/${id}`,
                method: 'DELETE'
            }).then(resp => {
                resolve(resp);
            }).catch(err => reject(err));
        });
    },
    get_post({
        commit
    }, id) {
        return new Promise((resolve, reject) => {
            axios({
                url: `${apiBase}/posts/${id}`,
                method: 'GET'
            }).then(resp => {
                commit('get_post');
                resp.data.post.image = completePostPic(resp.data.post.user_id, resp.data.post.image);
                resp.data.post.user_image = completeAvatar(resp.data.post.user_id, resp.data.post.user_img);
                if (resp.data.post.comments.length) {
                    resp.data.post.comments.forEach(c => c.user_img = completeAvatar(c.user_id, c.user_img));
                }
                resolve(resp);
            }).catch(err => reject(err));
        });
    },
    update_avatar({
        commit
    }, id) {
        return new Promise((resolve, reject) => {
            const file = document.getElementById('image-input').files[0];
            const fd = new FormData();
            fd.append('avatar', file);
            axios.post(`${apiBase}/users/avatar/${id}`, fd, {
                    //axios.post(`http://localhost:3000/api/users/avatar/${id}`, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(resp => {
                    commit('new_avatar', file.name);
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                });
        });
    },
    change_pass({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            axios({
                    url: `${apiBase}/users/passchange/${data.user_id}`,
                    data: {
                        "newpassword": data.pass
                    },
                    method: 'PATCH'
                })
                .then(resp => {
                    console.log(resp);

                })
                .catch(err => {
                    commit('auth_error', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    console.log(err);
                    reject(err);
                });
            resolve();
        });
    },
    rm_user({
        commit
    }, user_id) {
        return new Promise(() => {
            axios({
                url: `${apiBase}/users/${user_id}`,
                method: 'DELETE'
            }).then(() => {
                commit('logout');
            }).catch(err => {
                console.log(err);

            });
        });
    },
    register({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios({
                    url: `${apiBase}/users`,
                    data: user,
                    method: 'POST'
                })
                .then(resp => {
                    proceed_login(commit, resp, resolve, reject);
                })
                .catch(err => {
                    commit('auth_error', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    console.log(err);
                    reject(err);
                });
        });
    },
    verify_email({
        commit
    }, user_id) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios({
                    url: `${apiBase}/verify/${user_id}`,
                    method: 'PATCH'
                })
                .then(resp => {
                    proceed_login(commit, resp, resolve, reject);
                })
                .catch(err => {
                    console.log(err);
                    commit('auth_error');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    reject(err);
                });
        });
    },
    login({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios({
                    url: `${apiBase}/login`,
                    data: user,
                    method: 'POST'
                })
                .then(resp => {

                    proceed_login(commit, resp, resolve, reject);

                })
                .catch(err => {
                    commit('auth_error');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    reject(err);
                });
        });
    },
    logout({
        commit
    }) {
        return new Promise((resolve) => {
            commit('logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common.Authorization;
            resolve();
        });
    }
};

//to handle mutations
const mutations = {
    SET_DATA(state, data) {
        for (var i = 0; i < data.posts.length; i++) {
            let post = data.posts[i];
            post.image = completePostPic(post.user_id, post.image);
            post.user_image = completeAvatar(post.user_id, post.user_image);
        }
        state.data = data;
    },
    get_post() {},
    new_post(state, post) {
        post.image = completePostPic(post.user_id,post.image);
        state.data.posts.push(post);
    },
    add_cat(state, cat) {
        state.data.cats.push(cat);
    },
    rm_post(state, id) {
        let index = state.data.posts.map((item) => item.id).indexOf(id);
        if (index > -1) {
            state.data.posts.splice(index, 1);
        }
    },
    new_comment(state, comment) {
        //add to user dashboard
        state.data.comments.push(comment);
    },
    update_user(state, user) {
       
        let localuser = user;
        let img = JSON.parse(localStorage.user).image;
        localuser.image = img;
        state.user = localuser;
    },
    new_avatar(state, path) {
        state.user.image = completeAvatar(state.user.id, path);
        localStorage.setItem('user', JSON.stringify(state.user));
    },
    auth_request(state) {
        state.authStatus = 'loading';
    },
    auth_success(state, data) {

        state.authStatus = 'success';
        state.token = data.token;
        state.user = data.user;
    },
    auth_error(state, resp) {
        console.log(resp);
        state.authStatus = 'error';
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        state.warning = resp.data.message;
    },
    logout(state) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        state.authStatus = '';
        state.token = '';
    },
};

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});