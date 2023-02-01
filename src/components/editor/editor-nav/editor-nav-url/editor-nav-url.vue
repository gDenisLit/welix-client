<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { debounce } from 'lodash'

const store = useStore()
const wapName = computed(() => {
    return store.getters.getCurrWapName
})

const changeWapName = async (ev: any) => {
    const { innerHTML: name } = ev.target
    store.dispatch({ type: 'changeWapName', name })
}
const _debounce = debounce(changeWapName, 400)

</script>

<template>
    <div class="editor-nav-url flex flex-column justify-center">
        <div>
            <font-awesome-icon icon="fa-light fa-lock" class="icon" />
            <span class="http">https://</span><span><span class="heroku-url">welix.herokuapp.com/</span>
                <span class="my-site" contenteditable="true" @input="_debounce($event)">
                    {{ wapName }}
                </span></span>
            <span class="choose-domain">← Choose domain</span>
        </div>
    </div>
</template>