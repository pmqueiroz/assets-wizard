import React, { useEffect, useState } from 'react'
import { ScreenProps } from '../type'
import { useForm } from 'react-hook-form'
import { Settings } from '../../shared/types'

export default function Settings({ goTo }: ScreenProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const { register, handleSubmit, setValue } = useForm<Settings>()

    useEffect(() => {
        window.onmessage = (event: MessageEvent) => {
            const msg = event.data.pluginMessage

            if (msg.type === 'set-settings') {
                if (!msg.settings) {
                    return
                }
                for (const key in msg.settings as Settings) {
                    setValue(key as keyof Settings, msg.settings[key])
                }
                setLoading(false)
            }
        }

        window.parent.postMessage({ pluginMessage: { type: 'fetch-settings' } }, '*')
    }, [])

    const onSubmit = handleSubmit(values => {
        window.parent.postMessage(
            { pluginMessage: { type: 'update-settings', settings: values } },
            '*'
        )

        goTo('home')
    })

    if (loading) {
        return (
            <form className="modal" onSubmit={onSubmit}>
                loading...
            </form>
        )
    }

    return (
        <form className="modal" onSubmit={onSubmit}>
            <label>
                <span>Repository</span>
                <input {...register('repo', { required: 'repo is required' })}></input>
            </label>
            <label>
                <span>Personal Access Token</span>
                <input
                    type="password"
                    {...register('token', { required: 'token is required' })}
                ></input>
            </label>
            <label>
                <span>Event Type</span>
                <input {...register('eventType', { required: 'event type is required' })}></input>
            </label>
            <button type="submit">Save</button>
        </form>
    )
}
