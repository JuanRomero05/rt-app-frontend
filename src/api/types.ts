export interface httpParam {
    route: string, 
    headers?: any
}

export interface getParam extends httpParam {
    params?: any | {}
}

export interface postParam extends httpParam { 
    body: any
}

export interface putParam extends postParam {}

export interface deleteParam extends httpParam {}

export interface logInParam {
    username: string,
    password: string
}

export interface Comment {
    userId?: number, 
    reviewId?: number,
    content?: string
}

export interface User {
    username?: string,
    firstName?: string,  
    lastName?: string,
    password?: string,
    isCritic?: boolean
}

export interface Rating {
    userId?: number,
    mediaId?: number,
    score: string
}

export interface MediaParams {
    search?: string,
    order?: string,
    year?: number,
    genre?: number
}

export interface Review {
    userId?: number, 
    mediaId?: number,
    content?: string
}