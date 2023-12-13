import { Preferences } from '@capacitor/preferences'

export const getToken = async () => {
    const token = await Preferences.get({ key: 'token' })
    return token.value
}

export const getUserId = async () => {
    const id = await Preferences.get({ key: 'id' })
    return id.value
}

export const storeToken = async (token: string) => {
    await Preferences.set({ key: 'token', value: token });
}

export const storeUserId = async (id: string) => {
    await Preferences.set({ key: 'id', value: id });
}

export const clearToken = async () => {
    await Preferences.remove({ key: 'token' })
}

export const clearUserId = async () => {
    await Preferences.remove({ key: 'id' })
}