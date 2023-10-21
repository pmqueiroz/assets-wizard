import { Screen, ScreenId } from '../type'
import Home from './home'
import Settings from './settings'

export const screens: Record<ScreenId, Screen> = {
    home: Home,
    settings: Settings
}
