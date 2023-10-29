import { useEffect, useState } from 'react'
import { Settings } from '../../shared/types'
import { PluginProps } from '../type'

export const useGlobalSettings = () => {
    const [pluginSettings, setPluginSettings] = useState<Settings | undefined>()
    const [loadingPluginSettings, setLoadingPluginSettings] = useState<boolean>(true)
    const [loadingExport, setloadingExport] = useState<boolean>(false)

    const handleMessage = (event: MessageEvent) => {
        const msg = event.data.pluginMessage

        if (msg.type === 'set-settings') {
            if (msg.settings) {
                setPluginSettings(msg.settings)
            }

            setLoadingPluginSettings(false)
        }

        if (msg.type === 'set-export-loading') {
            setloadingExport(msg.state ?? false)
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleMessage)
        window.parent.postMessage({ pluginMessage: { type: 'fetch-settings' } }, '*')

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [])

    const handleSetSettings: PluginProps['setSettings'] = settings => {
        window.parent.postMessage({ pluginMessage: { type: 'update-settings', settings } }, '*')
        setPluginSettings(settings)
    }

    return {
        pluginSettings,
        loadingPluginSettings,
        setPluginSettings: handleSetSettings,
        loadingExport
    }
}
