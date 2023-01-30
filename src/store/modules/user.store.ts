import type { User } from '@/models/User.model.js'
import { userService } from '../../services/user.service.js'
// import { wapService } from '../../services/wap.service.js'

interface State {
    user: User | null
}

export default {
    state: {
        user: null,
        // userWaps: null,
    },
    getters: {
        getUser(state: State) {
            return state.user
        },
        // userWaps({ userWaps }) {
        //     return userWaps
        // },
    },
    mutations: {
        setUser(state: State, data: any) {
            const { user } = data
            state.user = user
        },
        logout(state: State) {
            state.user = null
        },
        // saveWapToUser(state, { wap }) {
        //     const idx = state.user.waps.findIndex(currWap => currWap._id === wap._id)
        //     if (idx !== -1) state.user.waps.splice(idx, 1, wap)
        //     else state.user.waps.push(wap)
        //     console.log(state.user)
        //     userService.saveLocalUser(state.user)
        // },
        // setUserWaps(state, { waps }) {
        //     state.userWaps = waps
        // },
    },
    actions: {
        async login(context: any, data: any) {
            const { commit } = context
            const { credentials } = data
            try {
                const user = await userService.login(credentials)
                commit({ type: 'setUser', user })
                window.location.assign('/')
                return user
            } catch (err) {
                console.log('something went wrong')
            }
        },
        async logout(context: any) {
            const { commit } = context
            try {
                await userService.logout()
                commit({ type: 'logout' })
            } catch (err) {
                throw err
            }
        },
        async signup(context: any, data: any) {
            const { commit, dispatch } = context
            const { credentials } = data

            try {
                const user = await userService.signup(credentials)
                await dispatch({ type: 'login', user })
                commit({ type: 'setUser', user })
            } catch (err) {
                throw err
            }
        },
        async setLoggedinUser(context: any) {
            const { commit } = context
            const user = userService.getLoggedinUser()
            if (!user) return
            commit({ type: 'setUser', user })
        }
    },
    // async loadUserWaps({ commit }, { userId }) {
    //     try {
    //         const waps = await wapService.query({ userId })
    //         console.log(waps)
    //         commit({ type: 'setUserWaps', waps })
    //     } catch (err) {
    //         console.log(err)
    //         throw new Error('Could not get waps')
    //     }
    // },

}
