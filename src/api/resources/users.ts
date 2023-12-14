import { deleteRequest, getRequest, putRequest } from "../requests"
import { User } from "../types"
import { getToken } from "src/storage/auth"

const root = '/users'

export const getAuthUser = async () => {
    const token = await getToken()
    return await getRequest({
        route: root+'/me',
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const getUserById = async (id: number) => {
    const token = await getToken()
    return await getRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const updateUser = async (id: number, param: User) => {
    const token = await getToken()
    return await putRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` },
        body: param
    })
}

export const deleteUser = async (id: number) => {
    const token = await getToken()
    return await deleteRequest({
        route: root+'/'+id,
        headers: { 'Authorization': `Bearer ${token}` }
    })
}