
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getter'
import mutations from './mutations'

//引入modules



Vue.use(Vuex);



const state = {
    timeCont:0,
    user:null
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules:{

    }
})