import { Settings } from '../shared/types'
import { callWebhook } from './helpers/call-webhook'
import { exportAssets } from './helpers/export-assets'
import { getSettings, setSettings } from './helpers/settings'

figma.showUI(__html__, { height: 500, width: 450 })

figma.ui.onmessage = async msg => {
    if (msg.type === 'export') {
        const { selection } = figma.currentPage
        if (selection.length <= 0) throw new Error('You might have at least one asset selected')

        const { data, headers, url } = await getSettings()

        if (!data || !headers || !url)
            throw new Error('You need to set your settings before export')

        const exportedAssets = await exportAssets(selection)

        try {
            await callWebhook({
                assets: exportedAssets,
                data,
                headers,
                url
            })
            figma.notify('Assets uploaded ;D')
        } catch (error) {
            console.error(error)
            figma.notify('Something went wrong thryng to call the api', { error: true })
        } finally {
            figma.closePlugin()
        }
    }

    if (msg.type === 'fetch-settings') {
        const settings = await getSettings()

        figma.ui.postMessage({
            type: 'set-settings',
            settings
        })
    }

    if (msg.type === 'update-settings') {
        await setSettings(msg.settings as Settings)
    }
}
