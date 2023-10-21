import { useEffect, useState } from 'react'
import { Settings } from '../../shared/types'

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings | undefined>()
    const [loading, setLoading] = useState<boolean>(true)

    const handleMessage = (event: MessageEvent) => {
        const msg = event.data.pluginMessage

        if (msg.type === 'set-settings') {
            if (!msg.settings) {
                setLoading(false)
                return
            }

            setSettings(msg.settings)
            setLoading(false)
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleMessage)

        window.parent.postMessage({ pluginMessage: { type: 'fetch-settings' } }, '*')

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [])

    const handleSetSettings = (settings: Settings) => {
        window.parent.postMessage({ pluginMessage: { type: 'update-settings', settings } }, '*')
        setSettings(settings)
    }

    return {
        settings,
        loading,
        setSettings: handleSetSettings
    }
}
