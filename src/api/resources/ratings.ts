import { postRequest } from "../requests"
import { Rating } from "../types"
import { getToken } from "src/storage/auth"

const root = '/ratings'

export const rate = async (body: Rating) => {
    const token = await getToken()
    return await postRequest({
        route: root,
        headers: { 'Authorization': `Bearer ${token}` },
        body
    })
}