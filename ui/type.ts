import { Settings } from '../shared/types'

export type PluginId = 'github' | 'custom'

export type Plugin = (props: PluginProps) => JSX.Element

export type Toolbar = (props: { slot?: React.ReactNode }) => JSX.Element

export interface PluginProps {
    settings: Settings | undefined
    setSettings: (settings: Settings) => void
    toolbar: Toolbar
}
