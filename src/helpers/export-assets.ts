import type { Asset } from '../../shared/types'

export const exportAssets = async (assets: readonly SceneNode[]): Promise<Asset[]> => {
    const exports = assets.map(async assetNode => {
        return {
            blobType: 'image/svg+xml',
            svg: await assetNode.exportAsync({ format: 'SVG_STRING' }),
            name: assetNode.name
        }
    })

    return await Promise.all(exports)
}