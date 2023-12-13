import { auth } from "../headers"
import { deleteRequest, getRequest, postRequest } from "../requests"
import { Comment } from "../types"

const root = '/comments'

export const createComment = async (body: Comment) => {
    return await postRequest({
        route: root,
        headers: auth,
        body
    })
}

export const getCommentById = async (id: number) => {
    return await getRequest({
        route: root+'/'+id,
        headers: auth
    })
}

export const deleteComment = async (id: number) => {
    return await deleteRequest({
        route: root+'/'+id,
        headers: auth
    })
}