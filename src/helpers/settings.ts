import { Settings } from '../../shared/types'

const validateSettings = ({ eventType, repo, token }: Settings) => {
    if (!repo || !eventType || !token) throw new Error('Your need to config all the settings first')

    if (!/[\w.-]+\/[\w.-]+/.test(repo))
        throw new Error('The repo you passed does not match the pattern [username]/[repository]')
}

export const getSettings = async <V extends boolean>({ validate }: { validate?: V } = {}): Promise<V extends true
    ? Required<Settings>
    : Settings> => {
    const repo = await figma.clientStorage.getAsync('repo')
    const token = await figma.clientStorage.getAsync('token')
    const eventType = await figma.clientStorage.getAsync('eventType')
    const settings = { repo, token, eventType }

    if (validate) validateSettings(settings)

    return settings
}

export const setSettings = async (settings: Settings) => {
    for (const key in settings) {
       await figma.clientStorage.setAsync(key, settings[key as keyof Settings] as string)
    }
}
