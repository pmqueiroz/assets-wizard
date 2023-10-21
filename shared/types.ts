import { PluginId } from '../ui/type'

export interface Settings {
    url: string
    data: string
    headers: Record<string, string>
    metadata?: {
        pluginName: PluginId
    } & Record<string, unknown>
}

export interface Asset {
    blobType: string
    svg: string
    name: string
}
