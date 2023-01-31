// import { socketService } from '../../services/socket.service.js'
import { utilService } from '../../services/util.service.js'
import { wapService } from '../../services/wap.service.js'

import type { Cmp } from "@/models/Cmp.model"
import type { Wap } from "@/models/Wap.model"

interface State {
    waps: Wap[] | null
    currWap: Wap | null
    cmpToEdit: Cmp | null
    elToEdit: any | null
    prevActions: any[]
    nextActions: any[]
}

export default {
    state: {
        waps: null,
        currWap: null,
        cmpToEdit: null,
        elToEdit: null,
        prevActions: [],
        nextActions: [],
    },
    getters: {
        getWaps(state: State) {
            return state.waps
        },
        getCurrWap(state: State) {
            return state.currWap
        },
        cmpToEdit(state: State) {
            return state.cmpToEdit
        },
        elToEdit(state: State) {
            return state.elToEdit
        },
        prevActions(state: State) {
            return state.prevActions
        },
        nextActions(state: State) {
            return state.nextActions
        },
    },
    mutations: {
        setWaps(state: State, data: any) {
            state.waps = data.waps
        },
        setCurrWap(state: State, data: any) {
            state.currWap = data.wap
        },
        setCmpToEdit(state: State, data: any) {
            state.cmpToEdit = data.cmp
        },
        setElToEdit(state: State, data: any) {
            state.elToEdit = data.el
        },
        removeWap(state: State, data: any) {
            if (!state.waps) return
            const idx = state.waps.findIndex((wap: any) => wap._id === data.wapId)
            state.waps.splice(idx, 1)
        },
        saveWap(state: State, data: any) {
            if (!state.waps) return
            const idx = state.waps.findIndex((currWap: any) => currWap._id === data.wap._id)
            if (idx !== -1) state.waps.splice(idx, 1, data.wap)
        },
        changeWapName(state: State, data: any) {
            if (!state.currWap) return
            state.currWap.name = data.name
        },
        addCmp(state: State, data: any) {
            if (!state.currWap) return
            if (data.idx) state.currWap.cmps.splice(data.idx, 0, data.cmp)
            else state.currWap.cmps.push(data.cmp)
        },
        updateCmp(state: State, data: any) {
            if (!state.currWap) return
            const idx = state.currWap.cmps.findIndex((currCmp: any) => currCmp.id === data.cmp.id)
            state.currWap.cmps.splice(idx, 1, data.cmp)
        },
        pushAction(state: State, data: any) {
            state.prevActions.push(data.prevState)
        },
        pushNextAction(state: State, data: any) {
            state.nextActions.push(data.prevState)
        },
        updateCmps(state: State, data: any) {
            if (!state.currWap) return
            state.currWap.cmps = data.cmps
        },
        removeCmp(state: State, data: any) {
            if (!state.currWap) return
            const idx = state.currWap.cmps.findIndex((cmp: any) => cmp.id === data.cmpId)
            // console.log(state.currWap.cmps[idx])
            state.prevActions.push({
                idx,
                cmp: state.currWap.cmps[idx],
                action: 'removed',
            })
            state.currWap.cmps.splice(idx, 1)
            state.cmpToEdit = null
            state.elToEdit = null
        },
        undo(state: State) {
            if (!state.prevActions.length) return
            if (!state.currWap) return

            const { cmps } = state.currWap
            const prevAction = state.prevActions.pop()

            let idx = cmps.findIndex((cmp: any) => cmp.id === prevAction.cmp.id)

            if (idx === -1) {
                idx = prevAction.idx
                state.currWap.cmps.splice(idx, 0, prevAction.cmp)
            } else {
                state.currWap.cmps.splice(idx, 1, prevAction.cmp)
            }

            const cmp = JSON.parse(JSON.stringify(cmps[idx]))
            state.nextActions.push({ idx, cmp, action: prevAction.action })
        },
        redo(state: State) {
            if (!state.nextActions.length) return
            if (!state.currWap) return
            
            const { cmps } = state.currWap
            const prevAction = state.nextActions.pop()

            let idx = prevAction.idx
            if (prevAction.action === 'removed') {
                // idx = prevAction.idx
                state.prevActions.push({ idx, cmp: cmps[idx], action: 'removed' })
                state.currWap.cmps.splice(idx, 1)
            } else {
                // idx = cmps.findIndex(cmp => cmp.id === prevAction.cmp.id)
                state.prevActions.push({ idx, cmp: cmps[idx], action: 'updated' })
                state.currWap.cmps.splice(idx, 1, prevAction.cmp)
            }
        },
    },
    actions: {
        async loadWaps(context: any, payload: any) {
            const { commit } = context
            let { filterBy } = payload
            try {
                if (!filterBy) filterBy = {}
                const waps = await wapService.query(filterBy)
                commit({ type: 'setWaps', waps })
            } catch (err) {
                console.dir(err)
            }
        },
        async loadWap(context: any, payload: any) {
            const { commit } = context
            const { wapId } = payload
            try {
                const wap = await wapService.getById(wapId)
                commit({ type: 'setCurrWap', wap })
            }
            catch (err) {
                console.dir(err)
            }
        },
        async saveWap(context: any, payload: any) {
            const { commit, getters, dispatch } = context
            const { wap } = payload
            try {
                const savedWap = await wapService.save(wap)
                commit({ type: 'saveWap', wap: savedWap })
                commit({ type: 'setCurrWap', wap: savedWap })
                // socketService.emit('wap-updated', savedWap)
                const user = getters.getUser
                if (user) {
                    await dispatch({ type: 'loadUserWaps', userId: user._id })
                }
                return savedWap
            } catch (err) {
                console.dir(err)
            }
        },
        async changeWapName(context: any, payload: any) {
            const { commit, dispatch, getters } = context
            const { name } = payload
            try {
                const wap = JSON.parse(JSON.stringify(getters.getCurrWap))
                wap.name = name
                const savedWap = await dispatch({ type: 'saveWap', wap })
                commit({ type: 'setCurrWap', wap: savedWap })
            }
            catch (err) {
                console.dir(err)
            }
        },
        async removeWap(context: any, payload: any) {
            const { commit } = context
            const { wapId } = payload
            try {
                await wapService.remove(wapId)
                // commit(payload)
            } catch (err) {
                console.dir(err)
            }
        },
        async updateCmps(context: any, payload: any) {
            const { dispatch, getters, commit } = context
            const { cmps } = payload
            try {
                commit(payload)
                const wap = JSON.parse(JSON.stringify(getters.getCurrWap))
                wap.cmps = cmps
                const savedWap = await dispatch({ type: 'saveWap', wap })
                commit({ type: 'setCurrWap', wap: savedWap })
            } catch (err) {
                console.log(err)
                throw new Error('Coudnot add section')
            }
        },
        async updateCmp(context: any) {
            const { getters, commit } = context
            try {
                const wap = getters.getCurrWap
                const cmp = getters.cmpToEdit
                const prevState = wapService.getCurrState(cmp, wap, 'updated')
                commit({ type: 'pushAction', prevState })
                const updatedCmp = await wapService.updateCmp(wap._id, cmp)
                commit({ type: 'updateCmp', cmp: updatedCmp })
                // socketService.emit('cmp-updated', updatedCmp)
            } catch (err) {
                console.log(err)
                throw new Error('Could not update section')
            }
        },
        async removeCmp(context: any, payload: any) {
            const { getters, commit } = context
            try {
                const wapId = getters.getCurrWap._id
                const cmp = await wapService.removeCmp(wapId, payload.cmpId)
                // socketService.emit('cmp-removed', payload.cmpId)
                commit(payload)
                return cmp
            } catch (err) {
                console.log(err)
                throw new Error('could not remove section')
            }
        },
        async duplicateCmp(context: any, payload: any) {
            const { getters, commit, dispatch } = context
            const { cmpId } = payload
            try {
                const wap = JSON.parse(JSON.stringify(getters.getCurrWap))
                const idx = wap.cmps.findIndex((cmp: any) => cmp.id === cmpId)
                const duplicatedCmp = JSON.parse(JSON.stringify(wap.cmps[idx]))
                duplicatedCmp.id = utilService.makeId()
                wap.cmps.splice(idx + 1, 0, duplicatedCmp)
                commit({ type: 'addCmp', cmp: duplicatedCmp, idx: idx + 1 })
                const savedWap = await dispatch({ type: 'saveWap', wap })
                return savedWap
            } catch (err) {
                console.log(err)
                throw new Error('Could not duplicate section')
            }
        },
        async undo(context: any) {
            const { getters, dispatch, commit } = context
            try {
                if (!getters.prevActions.length) return
                const wap = JSON.parse(JSON.stringify(getters.getCurrWap))
                const { cmps } = wap
                const prevAction = getters.prevActions[getters.prevActions.length - 1]
                let idx = cmps.findIndex((cmp: any) => cmp.id === prevAction.cmp.id)

                if (idx === -1) {
                    idx = prevAction.idx
                    wap.cmps.splice(idx, 0, prevAction.cmp)
                } else {
                    wap.cmps.splice(idx, 1, prevAction.cmp)
                }
                await dispatch({ type: 'saveWap', wap })
                commit({ type: 'undo' })
            } catch (err) {
                throw new Error('Couldnt redo last action')
            }
        },
        async redo(context: any) {
            const { getters, dispatch, commit } = context
            if (!getters.nextActions.length) return

            const wap = JSON.parse(JSON.stringify(getters.getCurrWap))
            const { cmps } = wap
            const prevAction = getters.nextActions[getters.nextActions.length - 1]

            let idx
            if (prevAction.action === 'removed') {
                idx = prevAction.idx
                wap.cmps.splice(idx, 1)
            } else {
                idx = cmps.findIndex((cmp: any) => cmp.id === prevAction.cmp.id)
                wap.cmps.splice(idx, 1, prevAction.cmp)
            }

            commit({ type: 'redo' })
            await dispatch({ type: 'saveWap', wap })
        },
        async setTheme(context: any, payload: any) {
            const { commit, dispatch, getters } = context
            const { theme } = payload
            try {
                const { mainBgc, cmpBgc, color } = theme
                const wap = JSON.parse(JSON.stringify(getters.getCurrWap))

                wap.style.backgroundColor = mainBgc

                wap.cmps.forEach((cmp: any) => {
                    cmp.style.backgroundColor = cmpBgc
                    cmp.style.color = color

                    for (const key in cmp.info) {
                        if (!cmp.info[key].style) continue

                        cmp.info[key].style.color = color
                    }

                    if (cmp.type === 'wap-container') {
                        cmp.info.cmps.forEach((cmp: any) => {
                            // cmp.style.backgroundColor = cmpBgc
                            cmp.style.color = color

                            for (const key in cmp.info) {
                                if (!cmp.info[key].style) continue

                                cmp.info[key].style.color = color
                            }
                        })
                    }
                })

                commit({ type: 'setCurrWap', wap })
                await dispatch({ type: 'saveWap', wap })
            } catch (err) {
                console.log(err)
                throw new Error('could not update theme')
            }
        },
    },
}
