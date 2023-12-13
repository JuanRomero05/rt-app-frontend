import { auth } from "../headers"
import { getRequest } from "../requests"
import { MediaParams } from "../types"

const root = '/movies'

export const getAllMovies = async (params: MediaParams) => {
    return await getRequest({
        route: root,
        headers: auth,
        params
    })
}

export const getMovieById = async (id: number) => {
    return await getRequest({
        route: root+'/'+id,
        headers: auth
    })
}

export const getReviewsByMovie = async (id: number) => {
    return await getRequest({
        route: root+'/'+id+'/reviews',
        headers: auth
    })
}