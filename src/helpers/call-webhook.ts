import type { Asset, Settings } from '../../shared/types'

interface CallWebhookConfig extends Settings {
    assets: Asset[]
}

export const callWebhook = async ({ assets, data, headers, url }: CallWebhookConfig) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data.replace('%ASSETS%', JSON.stringify(assets)),
        headers
    })

    if (!response.ok) {
        throw new Error(`Request failed with the status ${response.status}`)
    }
}
