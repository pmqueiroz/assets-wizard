import { Plugin, PluginId } from '../type'
import Github from './github'

export const plugins: Record<PluginId, Plugin> = {
    github: Github
}
