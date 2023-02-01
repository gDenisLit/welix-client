<script setup lang="ts">
const props = defineProps({
    to: String,
    content: String
})
</script>

<template>
    <div class="back">
        <a-tooltip placement="bottom" :content="content">
            <template #payload>
                <router-link class="back-link" :to="to || '/'">
                    <font-awesome-icon icon="fa-light fa-arrow-left" />
                </router-link>
            </template>
        </a-tooltip>
    </div>
</template>