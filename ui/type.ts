import { Settings } from '../shared/types'

export type ScreenId = 'home' | 'settings'

export type Screen = (props: ScreenProps) => JSX.Element

export interface ScreenProps {
    currentScreen: ScreenId
    goTo: (screen: ScreenId) => void
}

export type PluginId = 'github' | 'custom'

export type Plugin = (props: PluginProps) => JSX.Element

export interface PluginProps extends Pick<ScreenProps, 'goTo'> {
    settings: Settings | undefined
    setSettings: (settings: Settings) => void
}
