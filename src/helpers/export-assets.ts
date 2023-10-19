import type { Asset } from '../../shared/types'

export const formatToBlobType = (format: ExportSettings['format']) => {
    switch(format) {
        case 'PDF': return 'application/pdf'
        case 'SVG': return 'image/svg+xml'
        case 'PNG': return 'image/png'
        case 'JPG': return 'image/jpeg'
        default: return 'image/png'
    }
}

const defaultExportSettings: ExportSettings = { 
    format: "SVG",
    suffix: '',
    contentsOnly: true
}

export const exportAssets = async (assets: readonly SceneNode[]): Promise<Asset[]> => {
    const exports = assets.flatMap(assetNode => {
        const { exportSettings, name } = assetNode

        const exports = exportSettings.length ? exportSettings : [defaultExportSettings]

        return exports.map(async config => {
            return {
                blobType: formatToBlobType(config.format),
                content: await assetNode.exportAsync(config),
                name
            }
        })
    })

    return await Promise.all(exports)
}