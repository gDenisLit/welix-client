import type { Tool } from "@/models/Tool.model"

export const utilService = {
    saveToStorage,
    loadFromStorage,
    getRandomIntInc,
    getRandomColor,
    makeId,
    delay,
    getEditorTools,
    getThemes,
}


function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}
function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function makeId(length = 5) {
    var txt = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomIntInc(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getEditorTools(state: any, props: any): Tool[] {
    return [
        {
            type: 'section',
            class: {
                active: state.activeTool === 'section' && props.isToolOpen
            },
            title: 'Add Section',
            icon: 'fa-light fa-circle-plus'
        },
        {
            type: 'theme',
            class: {
                active: state.activeTool === 'theme' && props.isToolOpen
            },
            title: 'Themes',
            icon: 'fa-light fa-palette'
        },
        {
            type: 'edit',
            class: {
                active: state.activeTool === 'edit' && props.isToolOpen
            },
            title: 'Edit',
            icon: 'fa-light fa-pen-to-square'
        },
    ]
}

function getThemes() {
    return [
        {
            title: 'Defualt',
            desc: 'Template default colors',
            mainBgc: '#ffffff',
            cmpBgc: '',
            color: '',
        },
        {
            title: 'Calming',
            desc: 'Calm & easy-going',
            mainBgc: '#827397',
            cmpBgc: '#C9BBCF',
            color: '#635666',
        },
        {
            title: 'Nostalgic',
            desc: 'Cozy & comfortable',
            mainBgc: '#F7D9D9',
            cmpBgc: '#FFEFEF',
            color: '#362706',
        },
        {
            title: 'Warm',
            desc: 'Modern & pleasant',
            mainBgc: ' rgb(198, 204, 202)',
            cmpBgc: ' rgb(248, 244, 241)',
            color: '#85603F',
        },
        {
            title: 'Vivid',
            desc: 'Bright & Expressive',
            mainBgc: '#dd857e',
            cmpBgc: '#dea4a0',
            color: '#f1d6d4',
        },
        {
            title: 'Business',
            desc: 'Nifty & sophisticated',
            mainBgc: '#0c8599',
            cmpBgc: 'rgb(255, 255, 255)',
            color: '#45504e',
        },
        {
            title: 'Retro Vibrant',
            desc: 'Hip, mod & stylish',
            mainBgc: 'rgba(11, 122, 157, 0.63)',
            cmpBgc: 'rgb(248, 244, 241)',
            color: 'rgba(235, 224, 121, 0.74)',
        },
        {
            title: 'Earthy',
            desc: 'Subtle & Natural',
            mainBgc: '#f4edd2',
            cmpBgc: '#d4b8ac',
            color: '#a27f88',
        },
    ]
}