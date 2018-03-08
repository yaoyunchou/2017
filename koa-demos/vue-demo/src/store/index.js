import Vue from 'Vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        user
    }
});