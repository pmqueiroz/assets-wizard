import { Settings } from '../../shared/types'

export const getSettings = async (): Promise<Settings> => {
    return await figma.clientStorage.getAsync('settings')
}

export const setSettings = async (settings: Settings) => {
    await figma.clientStorage.setAsync('settings', settings)
}
