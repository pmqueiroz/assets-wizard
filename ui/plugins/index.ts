import { Plugin, PluginId } from '../type'
import Github from './github'
import Custom from './custom'

export const plugins: Record<PluginId, Plugin> = {
    github: Github,
    custom: Custom
}
