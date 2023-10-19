import { Settings } from '../shared/types';
import { callWebhook } from './helpers/call-webhook';
import { exportAssets } from './helpers/export-assets'
import { getSettings, setSettings } from './helpers/settings';

figma.showUI(__html__);

figma.ui.onmessage = async msg => {
    if (msg.type === 'export') {
        const { selection } = figma.currentPage
        if (selection.length <= 0) throw new Error('You might have at least one asset selected')

        const { eventType, repo, token } = getSettings({ validate: true })

        const exportedAssets = await exportAssets(selection)

        try {
            await callWebhook({ 
                assets: exportedAssets,
                repo,
                token,
                eventType
            })
        } catch (error) {
            console.error(error)
            throw new Error('Error trying to call webook')
        } finally {
            figma.closePlugin();
        }
    }

    if (msg.type === 'fetch-settings') {
        const settings = getSettings()

        figma.ui.postMessage({
            type: "set-settings",
            settings
        });
    }

    if (msg.type === 'update-settings') {
        setSettings(msg.settings as Settings)
    }
};
