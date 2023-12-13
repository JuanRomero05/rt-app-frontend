import { auth } from "../headers"
import { getRequest } from "../requests"

const root = '/genres'

export const getAllGenres = async () => {
    return await getRequest({
        route: root,
        headers: auth
    })
}

export const getGenreById = async (id: number) => {
    return await getRequest({
        route: root+'/'+id,
        headers: auth
    })
}