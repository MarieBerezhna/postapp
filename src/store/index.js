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
        // axios.get('http://localhost:3000/api/init')
        axios.get(`${apiBase}/init`)
            .then(response => {
                commit('SET_DATA', response.data.data);
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
                    axios.defaults.headers.common.Authorization = token;
                    commit('auth_success', token, user);
                    resolve(resp);
                })
                .catch(err => {
                    commit('auth_error', err);
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
                    const token = resp.data.data.token;
                    const user = resp.data.data.user;
                    localStorage.setItem('token', token);
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
    },
};

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});