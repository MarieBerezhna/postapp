import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

//load Vuex
Vue.use(Vuex);
//to handle state
const state = {
    data: {},
    user: null
};

//to handle state
const getters = {};

//to handle actions
const actions = {
    getData({ commit }) {
        axios.get('http://localhost:3000/api/init')
            .then(response => {
        commit('SET_DATA', response.data.data);
        });
    }
};

//to handle mutations
const mutations = {
    SET_DATA(state, data) {
        state.data = data;
    }
};

//export store module
export default new Vuex.Store({
state,
getters,
actions,
mutations
});