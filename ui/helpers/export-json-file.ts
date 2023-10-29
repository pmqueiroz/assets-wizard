export const exportJsonFile = (json: object) => {
    const content = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
    const blobUrl = URL.createObjectURL(content)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = 'asset-wizard-config.json'
    link.setAttribute('download', 'asset-wizard-config.json')
    link.click()
    URL.revokeObjectURL(blobUrl)
    link.remove()
}
