import { cmpService } from '@/services/cmp.service'
import type { Cmp } from '@/models/Cmp.model.js'

interface State {
    cmps: Cmp[]
    filterBy: string
}

export default {
    state: {
        cmps: [],
        filterBy: 'wap-header',
    },
    getters: {
        getCmps(state: State) {
            const { cmps, filterBy } = state
            if (!filterBy) return cmps
            if (!cmps) return []
            const filteredCmps = cmps.filter(cmp => cmp.type === filterBy)
            return filteredCmps
        },
    },
    mutations: {
        setCmps(state: State, data: any) {
            const { cmps } = data
            state.cmps = cmps
        },
        setFilterBy(state: State, data: any) {
            const { filterBy } = data
            state.filterBy = filterBy
        },
    },
    actions: {
        async loadCmps(context: any) {
            const { commit } = context
            try {
                const cmps = await cmpService.query()
                commit({ type: 'setCmps', cmps })
            } catch (err) {
                console.log(err)
            }
        },
        setFilterBy(context: any, payload: any) {
            const { commit } = context
            const { filterBy } = payload
            commit({ type: 'setFilterBy', filterBy })
        }
    },
}
