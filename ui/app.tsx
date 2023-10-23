import React, { useState } from 'react'
import { Plugin, PluginId } from './type'
import { plugins } from './plugins'
import { useSettings } from './hooks/use-storage'
import './global.css'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { Button } from './components/button'
import { Select } from './components/select'

export default function App() {
    const { settings, setSettings, loading } = useSettings()
    const [plugin, setPlugin] = useState<PluginId | undefined>(settings?.metadata?.pluginName)

    useDeepCompareEffect(() => {
        setPlugin(settings?.metadata?.pluginName)
    }, [settings])

    const Plugin = plugin ? plugins[plugin] : ((() => null) as unknown as Plugin)

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div className="flex flex-col p-4 gap-3 min-h-screen">
            <Select
                label="Preset"
                defaultValue={plugin}
                onChange={e => setPlugin(e.target.value as PluginId)}
            >
                <option value="" hidden>
                    Select one
                </option>
                {Object.keys(plugins).map(pluginName => (
                    <option key={pluginName} value={pluginName}>
                        {pluginName}
                    </option>
                ))}
            </Select>
            <Plugin
                settings={settings}
                setSettings={setSettings}
                exportButton={
                    <Button
                        expand
                        variant="primary"
                        onClick={() => {
                            parent.postMessage(
                                {
                                    pluginMessage: {
                                        type: 'export'
                                    }
                                },
                                '*'
                            )
                        }}
                    >
                        Export
                    </Button>
                }
            />
        </div>
    )
}
