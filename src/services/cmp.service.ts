import type { Cmp } from '@/models/Cmp.model'
import { httpService } from './http.service'

export const cmpService = {
    query,
    getById,
    remove,
    save,
}

async function query() {
    return await httpService.get('cmp', query)
}

async function getById(cmpId: string) {
    return httpService.get(`cmp/${cmpId}`)
}

async function remove(cmpId: string) {
    httpService.delete(`cmp/${cmpId}`)
}

async function save(cmp: Cmp) {
    return (cmp.id) ?
        httpService.put(`cmp/${cmp.id}`, cmp) :
        httpService.post('cmp', cmp)
}