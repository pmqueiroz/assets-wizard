import React, { useState } from 'react'
import { Plugin, PluginId, ScreenProps } from '../type'
import { Settings } from '../../shared/types'
import { plugins } from '../plugins'

export default function Settings({ goTo }: ScreenProps) {
    const [plugin, setPlugin] = useState<PluginId | undefined>('github')

    const Plugin = plugin ? plugins[plugin] : ((() => null) as unknown as Plugin)

    return (
        <div className="container">
            <label>
                <span>Preset</span>
                <select defaultValue={plugin} onChange={e => setPlugin(e.target.value as PluginId)}>
                    <option value="" hidden>
                        Select one
                    </option>
                    {Object.keys(plugins).map(pluginName => (
                        <option key={pluginName} value={pluginName}>
                            {pluginName}
                        </option>
                    ))}
                </select>
            </label>
            <Plugin goTo={goTo} />
        </div>
    )
}
