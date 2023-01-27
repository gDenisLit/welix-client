<template>
    <img 
        class="logo" 
        src="@/assets/img/logo.png" 
        alt="" 
        @click="$router.push('/')" 
    />
</template>

<style lang="scss">
.logo {
    text-align: left;
    width: 200px;
    cursor: pointer;
}
</style>