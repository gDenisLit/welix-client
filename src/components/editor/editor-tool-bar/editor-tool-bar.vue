<script setup lang="ts">
import type { User } from '@/models/User.model'
import type { Wap } from '@/models/Wap.model'
import { store } from '@/store'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import editorToolBarNav from './editor-tool-bar-nav/editor-tool-bar-nav.vue'
import elEditor from './el-editor/el-editor.vue'

const router = useRouter()
const emit = defineEmits([
    'wapSaved'
])

const state = reactive({
    items: null,
    isOpen: false,
    tool: '',
    visible: false,
    visibleName: false,
    siteName: ''
})

const currUser = computed(() => {
    return store.getters.getUser
})
const currWap = computed(() => {
    return store.getters.getCurrWap
})
const title = computed(() => {
    switch (state.tool) {
        case 'section':
            return 'Add Section'
        case 'edit':
            return 'Edit'
        case 'theme':
            return 'Pick a theme'
    }
})

const showModal = () => {
    state.visible = true
}
const addWapCmp = (cmpId: string) => {
    console.log('cmpId', cmpId)
}
const openTool = (type: string) => {
    if (state.tool === type && state.isOpen) {
        state.isOpen = false
        return
    }
    if (state.isOpen && state.tool !== type) {
        state.tool = type
        state.isOpen = true
        return
    }
    state.isOpen = !state.isOpen
    state.tool = type
}
const openElEdit = () => {
    state.tool = 'edit'
    state.isOpen = true
}
const saveWap = async () => {
    if (!currUser.value) {
        state.visible = true
        return
    }

    if (!currWap.value) {
        state.visibleName = true
        return
    }

    emit('wapSaved')
    // eventBus.emit('wapSaved')
    const wapToSave = JSON.parse(JSON.stringify(currWap.value))
    wapToSave.createdBy = {
        _id: currUser.value._id,
        fullname: currUser.value.fullname,
    }
    wapToSave.isSaved = true
    wapToSave.leads = []

    await store.dispatch({
        type: 'saveWap',
        wap: wapToSave,
    })

    // notification['success']({
    //     message: `Site saved successfully`,
    // })
    let routeData = router.resolve({
        name: 'wap-details',
        params: { wapId: currWap.value._id },
    })
    window.open(routeData.href, '_blank')
    router.push('/dashboard')
}
const changeWapName = async () => {
    try {
        const name = state.siteName
        await store.dispatch({ type: 'changeWapName', name })
        saveWap()
    } catch (err) {
        console.log(err)
        // TODO: msg to user
    }
}
const login = async (credentials: User) => {
    try {
        credentials = JSON.parse(JSON.stringify(credentials))
        const user = await store.dispatch({ type: 'login', credentials })

        if (user) {
            saveWap()
            // notification['success']({
            //     message: `Welcome ${user.fullname}`,
            // })
        }
    } catch (err) {
        console.log(err)
        // notification['error']({
        //     message: `Wrong credentials`,
        // })
    }
}
const signup = async (credentials: User) => {
    try {
        const user = await store.dispatch({ type: 'signup', credentials })

        if (user) {
            saveWap()
            // notification['success']({
            //     message: `Welcome ${user.fullname}`,
            // })
        }
    } catch (err) {
        console.log(err)
        // notification['error']({
        //     message: `Cannot signup`,
        // })
    }
}
const publishWap = () => {
    // if(!this.user) signup / login form
    // if(!this.wap.name) to user user to enter a name then return
    store.dispatch({ type: 'saveWap', isPublished: true })
}
const undo = async () => {
    try {
        await store.dispatch({ type: 'undo' })
    } catch (err) {
        console.log(err)
        // notification['Somthing went wrong...']
    }
}
const redo = async () => {
    try {
        store.dispatch({ type: 'redo' })
    } catch (err) {
        console.log(err)
        // notification['Somthing went wrong...']
    }
}
const isEditorOpen = computed(() => {
    return {
        'open-section': state.isOpen && state.tool === 'section',
        'open-edit':
            (state.isOpen && state.tool === 'edit') ||
            (state.isOpen && state.tool === 'theme'),
    }
})
</script>

<template>
    <div class="tool-bar flex">
        <editor-tool-bar-nav @saved="saveWap" @setTool="openTool" :isToolOpen="state.isOpen" />

        <section class="tool-bar-actions" :class="isEditorOpen">
            <div class="tool-bar-actions__header flex justify-between">
                <h2>{{ title }}</h2>

                <p class="close" @click="state.isOpen = false">
                    <font-awesome-icon icon="fa-light fa-xmark-large" />
                </p>
            </div>
            <el-editor v-if="state.tool === 'edit'" />
            <!-- <editor-tool-sections v-if="state.tool === 'section'" :cmps="currWap.cmps" /> -->
            <!-- <editor-tool-theme v-if="state.tool === 'theme'" /> -->
        </section>
    </div>
    <!-- <div>
        <a-modal wrapClassName="login-form" v-model:visible="visible" :style="{ maxWidth: '370px' }">
            <login @login="login" @signup="signup" />
            <template #footer></template>
        </a-modal>

        <a-modal wrapClassName="choose-site-name" v-model:visible="visibleName" :style="{ maxWidth: '520px' }">
            <form class="choose-name flex flex-column" @submit.prevent="changeWapName">
                <label for="">You're almost done!</label>
                <input v-model="siteName" type="text" placeholder="Choose site name" />
                <button>Publish</button>
            </form>
            <template #footer :style="{ display: 'none', borderTop: 'none' }"></template>
        </a-modal>
    </div> -->
</template>