import React, { useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { PluginProps } from '../type'
import { useForm } from 'react-hook-form'
import { Settings } from '../../shared/types'
import { Input } from '../components/input'
import debounce from 'lodash.debounce'

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

export default function Github({ setSettings, settings, toolbar: Toolbar }: PluginProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<GithubSettings>()

    useDeepCompareEffect(() => {
        if (settings?.metadata?.pluginName === 'github') {
            const { eventType, repo, token } = settings.metadata as GithubSettings

            setValue('eventType', eventType)
            setValue('repo', repo)
            setValue('token', token)
        }
    }, [settings])

    const onSubmit = debounce((values: GithubSettings) => {
        setSettings(parseSettings(values))
    }, 300)

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSubmit)())

        return () => subscription.unsubscribe()
    }, [handleSubmit, watch])

    return (
        <div className="flex flex-col justify-center items-center gap-2.5 w-full grow">
            <Input
                label="Repository"
                error={errors.repo?.message}
                required
                placeholder="org/repo"
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
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                type="password"
                {...register('token', { required: 'token is required' })}
            />
            <Input
                label="Event Type"
                error={errors.eventType?.message}
                required
                {...register('eventType', { required: 'event type is required' })}
            />
            <Toolbar />
        </div>
    )
}
