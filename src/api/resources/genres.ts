import { getRequest } from "../requests"
import { getToken } from "src/storage/auth"

const root = '/genres'

export const getAllGenres = async () => {
    const token = await getToken()
    return await getRequest({
        route: root,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const getGenreById = async (id: number) => {
    const token = await getToken()
    return await getRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}