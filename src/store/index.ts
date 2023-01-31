import { createStore } from 'vuex'
import wapStore from './modules/wap.store'
// import cmpStore from './modules/cmp.store'
import userStore from './modules/user.store'

export const store = createStore({
    strict: true,
    modules: {
        wapStore,
        // cmpStore,
        userStore,
    },
})

