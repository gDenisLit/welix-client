export const utilService = {
    saveToStorage,
    loadFromStorage,
    getRandomIntInc,
    getRandomColor,
    makeId,
    delay,
    getEditorTools
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

function getEditorTools() {
    return [
        {
            type: 'section',
            class: '{ active: state.activeTool === \'section\' && props.isToolOpen }',
            title: 'Add Section',
            icon: 'fa-light fa-circle-plus'
        },
        {
            type: 'theme',
            class: '{ active: state.activeTool === \'theme\' && props.isToolOpen }',
            title: 'Themes',
            icon: 'fa-light fa-palette'
        },
        {
            type: 'edit',
            class: '{ active: state.activeTool === \'edit\' && props.isToolOpen }',
            title: 'Edit',
            icon: 'fa-light fa-pen-to-square'
        },
    ]
}