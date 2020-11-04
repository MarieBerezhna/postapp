import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

//load Vuex
Vue.use(Vuex);
//to handle state
const state = {
    posts: []
};

//to handle state
const getters = {};

//to handle actions
const actions = {
    getPosts({ commit }) {
        axios.get('http://localhost:3000/api/posts')
        .then(response => {
        commit('SET_POSTS', response.data.data);
        });
    }
};

//to handle mutations
const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts;
    }
};

//export store module
export default new Vuex.Store({
state,
getters,
actions,
mutations
});