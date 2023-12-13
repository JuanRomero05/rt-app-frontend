import { auth } from "../headers"
import { deleteRequest, getRequest, putRequest } from "../requests"
import { User } from "../types"

const root = '/users'

export const getAuthUser = async () => {
    return await getRequest({
        route: root+'/me',
        headers: auth
    })
}

export const getUserById = async (id: number) => {
    return await getRequest({
        route: root+'/'+id,
        headers: auth
    })
}

export const updateUser = async (id: number, param: User) => {
    return await putRequest({
        route: root+'/'+id,
        headers: auth,
        body: param
    })
}

export const deleteUser = async (id: number) => {
    return await deleteRequest({
        route: root+'/'+id,
        headers: auth
    })
}