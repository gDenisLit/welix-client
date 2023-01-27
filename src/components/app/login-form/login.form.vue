<script setup lang="ts">
import { computed, ref } from 'vue'
import arrowSvg from '@/material/arrow-svg.vue'

const isLogin = ref(true)
const props = defineProps({
    credentials: Object,
})
const type = computed(() => {
    return isLogin.value ? 'Login' : 'Signup'
})
const toggleType = () => {
    isLogin.value = !isLogin.value
}
const loginType = computed(() => {
    return isLogin.value ?
        'Don\'t have an account?' :
        'Already have an account?'
})
</script>

<template>
    <form @submit.prevent="$emit('login')" class="login__form" v-if="credentials">
        <h2>{{ type }}</h2>
        <input 
            v-model="credentials.fullname" 
            placeholder="Fullname" 
            v-if="!isLogin" autofocus 
        />
        <input 
            v-model="credentials.username" 
            placeholder="Username" 
            autofocus 
        />
        <input 
            v-model="credentials.email" 
            type="email" 
            placeholder="Email" 
            v-if="!isLogin" 
        />
        <input 
            v-model="credentials.password" 
            type="password" 
            placeholder="Password" 
            show-password 
        />
        <button class="login__btn">
            {{ type }}
            <arrow-svg />
        </button>
        <p @click="toggleType">{{ loginType }}</p>
    </form>
</template>