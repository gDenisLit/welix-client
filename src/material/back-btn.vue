<script setup lang="ts">
import aTooltip from './a-tooltip.vue'
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

<style lang="scss">
@import '@/styles.scss';

.back {
    padding-right: em(22px);
    // border-right: 1px solid rgba(128, 128, 128, 0.26);
    height: 100%;
    display: flex;
    align-items: center;

    .back-link {
        color: #868e96;
        font-size: em(22px);
        cursor: pointer;

        &:hover {
            color: $dark-color;
        }
    }
}
</style>