import { deleteRequest, getRequest, postRequest } from "../requests"
import { Review } from "../types"
import { getToken } from "src/storage/auth"

const root = '/reviews'

export const createReview = async (body: Review) => {
    const token = await getToken()
    return await postRequest({
        route: root,
        headers: { 'Authorization': `Bearer ${token}` },
        body
    })
}

export const getCommentsByReview = async (id: number) => {
    const token = await getToken()
    return await getRequest({
        route: root+'/'+id+'/comments',
        headers: { 'Authorization': `Bearer ${token}` }
    })
}   

export const getReviewById = async (id: number) => {
    const token = await getToken()
    return await getRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const deleteReview = async (id: number) => {
    const token = await getToken()
    return await deleteRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}