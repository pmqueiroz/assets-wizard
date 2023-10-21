export type ScreenId = 'home' | 'settings'
export type Screen = (props: ScreenProps) => JSX.Element

export interface ScreenProps {
    currentScreen: ScreenId
    goTo: (screen: ScreenId) => void
}
