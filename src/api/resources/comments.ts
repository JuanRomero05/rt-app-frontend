import { getToken } from "src/storage/auth"
import { deleteRequest, getRequest, postRequest } from "../requests"
import { Comment } from "../types"

const root = '/comments'

export const createComment = async (body: Comment) => {
    const token = await getToken()
    return await postRequest({
        route: root,
        headers: { 'Authorization': `Bearer ${token}` },
        body
    })
}

export const getCommentById = async (id: number) => {
    const token = await getToken()
    return await getRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const deleteComment = async (id: number) => {
    const token = await getToken()
    return await deleteRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}