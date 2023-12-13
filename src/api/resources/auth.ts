import { postRequest } from "../requests"
import { logInParam, User } from "../types"

const root = '/auth'

export const signUp = async (body: User) => {
    return await postRequest({
        route: root+'/signup',
        body
    })
}

export const logIn = async (body: logInParam) => {
    return await postRequest({
        route: root+'/login',
        body
    })
}