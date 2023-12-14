import { getRequest } from "../requests"
import { MediaParams } from "../types"
import { getToken } from "src/storage/auth"

const root = '/shows'

export const getAllShows = async (params: MediaParams) => {
    const token = await getToken()
    return await getRequest({
        route: root,
        headers: { 'Authorization': `Bearer ${token}` },
        params
    })
}

export const getShowById = async (id: number) => {
    const token = await getToken()
    return await getRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const getReviewsByShow = async (id: number) => {
    const token = await getToken()
    return await getRequest({
        route: root+'/'+id+'/reviews',
        headers: { 'Authorization': `Bearer ${token}` }
    })
}