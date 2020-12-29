import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

const api = require('../../api');
const apiBase = `${api.protocol}://${api.host}${api.baseUrl}`;

const proceed_login = (commit, resp, resolve, reject) => {
    if (!resp.data.error) {
        const token = resp.data.data.token;
        const user = resp.data.data.user;
        console.log(user.social);
        if (user.image) {
            user.image = `${apiBase}/users/avatar/${user.id}/${user.image}`;
        }
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
        axios.get(`${apiBase}/init`)
            .then(response => {
                
                if (response) {
                    commit('SET_DATA', response.data.data);
                } else {
                    console.log('Server fault');
                }
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
                const user = resp.data.user;
                commit('update_user', user);
                localStorage.setItem('user', JSON.stringify(user));
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
            if (file) fd.append('0', file, file.name);
            console.log(file);
            fd.append('data', JSON.stringify(post));
            axios({
                url: `http://localhost:3000/api/posts`,
                // url: `${apiBase}/posts`,
                data: fd,
                method: 'POST'
            }).then(resp => {
                console.log(resp.data.data);
                commit('new_post', resp.data.data);
            });
        });

    },
    comment({commit}, data) {
        console.log(commit, data);
        return new Promise((resolve, reject)=> {
        axios({
            url: `http://localhost:3000/api/comment`,
            // url: `${apiBase}/posts`,
            data,
            method: 'POST'
        }).then(resp => {
            console.log(resp);
            commit('new_comment', resp);
            resolve(resp);
        }).catch((err) => {
            reject(err);
        });
    });
    },
    get_post({ commit }, id) {
        console.log(commit);
        return new Promise((resolve, reject)=> {
            axios({
                url: `${apiBase}/posts/${id}`,
                //url: `http://localhost:3000/api/posts/${id}`,
                method: 'GET'
            }).then(resp => {

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
                    console.log(resp);
                    commit('new_avatar', file.name);
                    resolve(resp);
                }).catch(err => {
                    console.log(err);
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
        let shortenText = function (value) {
            let dots = value.length < 300 ? '' : '...';
            let index = 300;
            let visible = value.slice(0, index) +  dots;
            return visible;
    };
        for (var i = 0; i < data.posts.length; i++) {
            data.posts[i].shortened = shortenText(data.posts[i].text);
        }
        state.data = data;
    },
    new_post(state, post) { 
        state.data.posts.push(post);
    },
    new_comment(state, comment) {
        //add to user dashboard
        console.log(state, comment);
    },
    update_user(state, user) {
        let localuser = user;
        let img = JSON.parse(localStorage.user).image;
        localuser.image = img;
        state.user = localuser;
    },
    new_avatar(state, path) {
        let user = JSON.parse(localStorage.user);
        state.user.image = user.image = `${apiBase}/users/avatar/${user.id}/${path}`;
        localStorage.user = JSON.stringify(user);
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