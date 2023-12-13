import { auth } from "../headers"
import { getRequest } from "../requests"
import { MediaParams } from "../types"

const root = '/shows'

export const getAllShows = async (params: MediaParams) => {
    return await getRequest({
        route: root,
        headers: auth,
        params
    })
}

export const getShowById = async (id: number) => {
    return await getRequest({
        route: root+'/'+id,
        headers: auth
    })
}

export const getReviewsByShow = async (id: number) => {
    return await getRequest({
        route: root+'/'+id+'/reviews',
        headers: auth
    })
}