import type { Asset, Settings } from '../../shared/types'

interface CallWebhookConfig extends Settings {
    assets: Asset[]
}

export const callWebhook = async ({ assets, data, headers, url }: CallWebhookConfig) => {
    await fetch(url, {
        method: 'POST',
        body: data.replace('%ASSETS%', JSON.stringify(assets)),
        headers
    })
}
