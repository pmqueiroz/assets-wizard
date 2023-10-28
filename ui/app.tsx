import React, { useState } from 'react'
import { Plugin, PluginId } from './type'
import { plugins } from './plugins'
import { useGlobalSettings } from './hooks/use-global-settings'
import './global.css'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { Button } from './components/button'
import { Select } from './components/select'

export default function App() {
    const { loadingExport, loadingPluginSettings, pluginSettings, setPluginSettings } =
        useGlobalSettings()
    const [plugin, setPlugin] = useState<PluginId | undefined>(pluginSettings?.metadata?.pluginName)

    useDeepCompareEffect(() => {
        setPlugin(pluginSettings?.metadata?.pluginName)
    }, [pluginSettings])

    const Plugin = plugin ? plugins[plugin] : ((() => null) as unknown as Plugin)

    if (loadingPluginSettings) {
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
                settings={pluginSettings}
                setSettings={setPluginSettings}
                toolbar={({ slot }) => {
                    return (
                        <div className="flex flex-col pt-4 mt-auto gap-2 text-xs antialiased text-slate-600 ">
                            <p>
                                This plugin only saves data locally for future use and does not
                                share or store it on external servers.
                            </p>
                            <div className="flex items-center gap-2 w-full justify-center">
                                {slot}
                                <Button
                                    expand
                                    variant="primary"
                                    loading={loadingExport}
                                    disabled={loadingExport}
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
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}
