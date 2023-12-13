import { auth } from "../headers"
import { deleteRequest, getRequest, postRequest } from "../requests"
import { Review } from "../types"

const root = '/reviews'

export const createReview = async (body: Review) => {
    return await postRequest({
        route: root,
        headers: auth,
        body
    })
}

export const getCommentsByReview = async (id: number) => {
    return await getRequest({
        route: root+'/'+id+'/comments',
        headers: auth
    })
}   

export const getReviewById = async (id: number) => {
    return await getRequest({
        route: root+'/'+id,
        headers: auth
    })
}

export const deleteReview = async (id: number) => {
    return await deleteRequest({
        route: root+'/'+id,
        headers: auth
    })
}