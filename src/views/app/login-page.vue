<script setup lang="ts">
import { reactive } from 'vue'
import loginPageLayout from '@/layouts/login-page/login-page.layout.vue'
import appHeader from '@/components/app/app-header/app-header.vue'
import loginForm from '@/components/app/login-form/login.form.vue'

const credentials = reactive({
    fullname: '',
    username: '',
    email: '',
    password: '',
})
const handleLogin = () => {
    console.log(credentials)
}
</script>

<template>
    <login-page-layout>
        <template #header>
            <app-header />
        </template>
        <template #login-form>
            <login-form 
                :credentials="credentials" 
                @login="handleLogin" 
            />
        </template>
    </login-page-layout>
</template>