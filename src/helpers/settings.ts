import { Settings } from '../../shared/types'

const validateSettings = ({ eventType, repo, token }: Settings) => {
    if (!repo || !eventType || !token) throw new Error('Your need to config all the settings first')

    if (!/[\w.-]+\/[\w.-]+/.test(repo))
        throw new Error('The repo you passed does not match the pattern [username]/[repository]')
}

export const getSettings = <V extends boolean>({ validate }: { validate?: V } = {}): V extends true
    ? Required<Settings>
    : Settings => {
    const repo = figma.currentPage.getPluginData('repo')
    const token = figma.currentPage.getPluginData('token')
    const eventType = figma.currentPage.getPluginData('eventType')
    const settings = { repo, token, eventType }

    if (validate) validateSettings(settings)

    return settings
}

export const setSettings = (settings: Settings) => {
    for (const key in settings) {
        figma.currentPage.setPluginData(key, settings[key as keyof Settings] as string)
    }
}
