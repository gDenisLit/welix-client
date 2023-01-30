<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
// store.dispatch({ type: 'loadCmps' })
store.dispatch({ type: 'setLoggedinUser' })
// store.dispatch({
//     type: 'loadWaps',
//     filterBy: { isTemplate: true }
// })
</script>

<template>
    <router-view />
</template>