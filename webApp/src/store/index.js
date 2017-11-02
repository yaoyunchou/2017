
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getter'
import mutations from './mutations'

import car from './modules/car.js'

//引入modules


Vue.use(Vuex);



const state = {
    timeCont:0,
    user:null
};

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules:{
        car
    },
    strict: debug
})
