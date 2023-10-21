export type ScreenId = 'home' | 'settings'

export type Screen = (props: ScreenProps) => JSX.Element

export interface ScreenProps {
    currentScreen: ScreenId
    goTo: (screen: ScreenId) => void
}

export type PluginId = 'github'

export type Plugin = (props: PluginProps) => JSX.Element

export interface PluginProps extends Pick<ScreenProps, 'goTo'> {}
