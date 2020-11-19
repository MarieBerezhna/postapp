import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

const api = require('../../api');
const apiBase = `${api.protocol}://${api.host}:${api.port}${api.baseUrl}`;

//load Vuex
Vue.use(Vuex);
//to handle state
const state = {
    authStatus: '',
    data: {},
    token: localStorage.getItem('token') || '',
    user: {}
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
    create_post({ commit }, post) {
        axios({
            url: `${apiBase}/posts`,
            data: post,
            method: 'POST'
        }).then(resp => {
            commit('new_post', resp.data);
        });
    },
    update_user({ commit }, user) {
        return new Promise((resolve, reject) => {
    
            axios({
                url: `${apiBase}/users/${user.id}`,
                data: user,
                method: 'PUT'
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
    update_avatar({ commit }, id) { 
        return new Promise((resolve, reject) => {
            const file = document.getElementById('image-input').files[0];
            const fd = new FormData();
            fd.append('0', file, file.name);
            fd.append('user_id', id);
            commit('new_avatar');

            axios.post(`${apiBase}/users/avatar/`, fd)
                
                .then(resp => {
                console.log(resp);
                resolve(resp);
            }).catch(err => {
                reject(err);
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
                    const token = resp.data.data.token;
                    const user = resp.data.data.user;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    axios.defaults.headers.common.Authorization = token;
                    commit('auth_success', token, user);
                    resolve(resp);
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

                    const token = resp.data.data.token;
                    const user = resp.data.data.user;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    axios.defaults.headers.common.Authorization = token;
                    let data = {
                        token,
                        user
                    };
                    commit('auth_success', data);
                    resolve(resp);
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
        state.user = user;
    },
    new_avatar(state, path) {
        state.user.image = path;
    },
    auth_request(state) {
        state.authStatus = 'loading';
    },
    auth_success(state, data) {
        
        state.authStatus = 'success';
        state.token = data.token;
        state.user = data.user;
    },
    auth_error(state) {
        state.authStatus = 'error';
    },
    logout(state) {
        state.authStatus = '';
        state.token = '';
        console.log('logged out');
    },
};

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});