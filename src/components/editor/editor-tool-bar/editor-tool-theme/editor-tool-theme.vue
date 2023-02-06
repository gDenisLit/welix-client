<script setup lang="ts">
import { utilService } from '@/services/util.service';
import { useStore } from 'vuex'

const store = useStore()
const themes = utilService.getThemes()

const setTheme = (theme: object) => {
    store.dispatch({ type: 'setTheme', theme })
}
const isDarkColor = (c: string) => {
    c = c.substring(1) // strip #
    const rgb = parseInt(c, 16) // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff // extract red
    const g = (rgb >> 8) & 0xff // extract green
    const b = (rgb >> 0) & 0xff // extract blue
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

    return luma < 110
} 
</script>

<template>
    <section class="tool-bar-theme">
        <div v-for="theme in themes" class="theme-preview" :style="{ backgroundColor: theme.mainBgc }"
            @click="setTheme(theme)">
            <div class="theme-preview-info">
                <p class="theme-preview-info-header"
                    :style="{ color: isDarkColor(theme.mainBgc) ? '#ffffff' : '#343a40' }">
                    {{ theme.title }}
                </p>
                <p class="theme-preview-info-desc"
                    :style="{ color: isDarkColor(theme.mainBgc) ? '#e9ecef' : '#495057' }">
                    {{ theme.desc }}
                </p>
            </div>
            <div class="theme-preview-colors">
                <div :style="{ backgroundColor: theme.color }"></div>
                <div :style="{ backgroundColor: theme.cmpBgc }"></div>
            </div>
        </div>
    </section>
</template>