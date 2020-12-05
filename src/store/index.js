import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

const api = require('../../api');
const apiBase = `${api.protocol}://${api.host}${api.baseUrl}`;

const proceed_login = (commit, resp, resolve, reject) => {
    console.log(resp);
    if (!resp.data.error) {
        const token = resp.data.data.token;
        const user = resp.data.data.user;
        if (user.image) {
            user.image = `${apiBase}/users/avatar/${user.id}/${user.image}`;
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
        axios.get(`${apiBase}/init`)
            .then(response => {
                commit('SET_DATA', response.data.data);
            });
    },
    create_post({
        commit
    }, post) {
        axios({
            url: `${apiBase}/posts`,
            data: post,
            method: 'POST'
        }).then(resp => {
            commit('new_post', resp.data);
        });
    },
    update_user({
        commit
    }, user) {
        return new Promise((resolve, reject) => {

            axios({
                url: `${apiBase}/users/${user.id}`,
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
    update_avatar({
        commit
    }, id) {
        return new Promise((resolve, reject) => {
            const file = document.getElementById('image-input').files[0];
            const fd = new FormData();
            fd.append('0', file, file.name);
            fd.append('user_id', id);
            commit('new_avatar', file.name);

            axios.post(`${apiBase}/users/avatar/`, fd)

                .then(resp => {
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
                    // commit('update_user'. resp);
                    console.log(resp);
                })
                .catch(err => {
                    console.log(err);
                    commit('auth_error');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    reject(err);
                });
        })
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
        state.data = data;
    },
    new_post(state, data) {
        console.log(data);
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