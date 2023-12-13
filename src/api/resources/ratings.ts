import { auth } from "../headers"
import { postRequest } from "../requests"
import { Rating } from "../types"

const root = '/ratings'

export const rate = async (body: Rating) => {
    return await postRequest({
        route: root,
        headers: auth,
        body
    })
}