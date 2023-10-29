import React, { useState, ChangeEventHandler } from 'react'
import { Plugin, PluginId } from './type'
import { plugins } from './plugins'
import { useGlobalSettings } from './hooks/use-global-settings'
import './global.css'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { IoBuild, IoPushOutline, IoShareOutline } from 'react-icons/io5'

import { Button } from './components/button'
import { Select } from './components/select'
import { Popover } from './components/popover'
import { MenuItem } from './components/list-item'
import { exportJsonFile } from './helpers/export-json-file'

export default function App() {
    const [popoverShown, setPopoverShown] = useState<boolean>(false)
    const { loadingExport, loadingPluginSettings, pluginSettings, setPluginSettings } =
        useGlobalSettings()
    const [plugin, setPlugin] = useState<PluginId | undefined>(pluginSettings?.metadata?.pluginName)

    useDeepCompareEffect(() => {
        setPlugin(pluginSettings?.metadata?.pluginName)
    }, [pluginSettings])

    const handleOpenSettingsFile: ChangeEventHandler<HTMLInputElement> = e => {
        const selectedFile = e.target?.files?.[0]

        if (selectedFile) {
            const reader = new FileReader()

            reader.onload = function (event) {
                try {
                    const fileContent = String(event.target?.result)
                    setPluginSettings(JSON.parse(fileContent))
                } catch (error) {
                    window.parent.postMessage(
                        {
                            pluginMessage: {
                                type: 'notify',
                                content: 'Not a valid config file',
                                error: true
                            }
                        },
                        '*'
                    )
                } finally {
                    setPopoverShown(false)
                }
            }

            reader.readAsText(selectedFile)
        }
    }

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
                                <div className="flex items-center w-full justify-center">
                                    <Button
                                        style={{ paddingLeft: '48px' }}
                                        expand
                                        variant="primary"
                                        loading={loadingExport}
                                        disabled={loadingExport}
                                        trimmed="right"
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
                                    <Popover
                                        trigger={
                                            <Button variant="primary" trimmed="left">
                                                <IoBuild />
                                            </Button>
                                        }
                                        open={popoverShown}
                                        toggle={setPopoverShown}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <input
                                                id="file-input"
                                                className="absolute hidden"
                                                type="file"
                                                accept="application/json"
                                                onChange={handleOpenSettingsFile}
                                            ></input>
                                            <MenuItem<'label'>
                                                polymorphic="label"
                                                htmlFor="file-input"
                                                icon={<IoPushOutline size={18} />}
                                            >
                                                Import settings
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => exportJsonFile(pluginSettings || {})}
                                                icon={<IoShareOutline size={18} />}
                                            >
                                                Export settings
                                            </MenuItem>
                                        </div>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}
