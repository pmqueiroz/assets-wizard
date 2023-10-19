import type { Asset, Settings } from '../../shared/types'

interface CallWebhookConfig extends Settings {
    assets: Asset[]
}

export const callWebhook = async ({ assets, repo, token, eventType }: CallWebhookConfig) => {
    await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
        method: 'POST',
        body: JSON.stringify({
            event_type: eventType,
            client_payload: {
                assets
            }
        }),
        headers: {
            accept: 'application/vnd.github.v3+json',
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
}
