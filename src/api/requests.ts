import axios from "axios"
import { environment } from "src/environments/environment"
import { jsonHeader } from "./headers"
import { deleteParam, getParam, postParam, putParam } from "./types"

const url = environment.api

export const getRequest = async (param: getParam) => {
    try {
        const request = await axios.get(url+param.route, {
            headers: {
                ...param.headers,
                ...jsonHeader
            },
            params: param.params
        })

        return request.data
    } catch (err: any) {
        return err.response.data
    }
}

export const postRequest = async (param: postParam) => {
    try {
        const request = await axios.post(url+param.route, param.body, {
            headers: {
                ...param.headers,
                ...jsonHeader
            }
        })

        return request.data
    } catch (err: any) {
        return err.response.data
    }
}

export const putRequest = async (param: putParam) => {
    try {
        const request = await axios.put(url+param.route, param.body, {
            headers: {
                ...param.headers,
                ...jsonHeader
            }
        })

        return request.data
    } catch (err: any) {
        return err.response.data
    }
}

export const deleteRequest = async (param: deleteParam) => {
    try {
        const request = await axios.delete(url+param.route, {
            headers: {
                ...param.headers,
                ...jsonHeader
            }
        })

        return request.data
    } catch (err: any) {
        return err.response.data
    }
}