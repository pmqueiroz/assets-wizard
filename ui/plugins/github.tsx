import React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { PluginProps } from '../type'
import { useForm } from 'react-hook-form'
import { Settings } from '../../shared/types'
import { useSettings } from '../hooks/use-storage'
import { Input } from '../components/input'

interface GithubSettings {
    repo?: string
    token?: string
    eventType?: string
}

const parseSettings = ({ eventType, repo, token }: GithubSettings): Settings => {
    return {
        url: `https://api.github.com/repos/${repo}/dispatches`,
        data: `{"event_type":"${eventType}","client_payload":{"assets":%ASSETS%}}`,
        headers: {
            accept: 'application/vnd.github.v3+json',
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        },
        metadata: {
            pluginName: 'github',
            eventType,
            repo,
            token
        }
    }
}

export default function Github({ goTo }: PluginProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<GithubSettings>()

    const { settings, setSettings, loading } = useSettings()

    useDeepCompareEffect(() => {
        if (settings?.metadata?.pluginName === 'github') {
            const { eventType, repo, token } = settings.metadata as GithubSettings

            setValue('eventType', eventType)
            setValue('repo', repo)
            setValue('token', token)
        }
    }, [settings])

    const onSubmit = handleSubmit(values => {
        setSettings(parseSettings(values))

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
            <Input
                label="Repository"
                error={errors.repo?.message}
                required
                {...register('repo', {
                    required: 'repo is required',
                    validate: {
                        pattern: v => {
                            if (!/[\w.-]+\/[\w.-]+/.test(v || '')) {
                                return 'The repo does not match the pattern [username]/[repository]'
                            }
                        }
                    }
                })}
            />
            <Input
                label="Personal Access Token"
                error={errors.token?.message}
                required
                type="password"
                {...register('token', { required: 'token is required' })}
            />
            <Input
                label="Event Type"
                error={errors.eventType?.message}
                required
                {...register('eventType', { required: 'event type is required' })}
            />
            <button type="submit">Save</button>
        </form>
    )
}
