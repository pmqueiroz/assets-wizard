import React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { PluginProps } from '../type'
import { useForm } from 'react-hook-form'
import { Settings } from '../../shared/types'
import { Input } from '../components/input'
import { validadeDataTemplate } from '../helpers/validate-data-template'

interface CustomSettings {
    url: string
    data: string
    headers: [string, string][]
}

const parseSettings = ({ data, headers, url }: CustomSettings): Settings => {
    const cleanHeaders = headers.filter(([key]) => key)

    return {
        url,
        data,
        headers: Object.fromEntries(cleanHeaders),
        metadata: {
            pluginName: 'custom',
            url,
            data,
            headers
        }
    }
}

export default function Custom({ goTo, setSettings, settings }: PluginProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm<CustomSettings>({
        defaultValues: {
            headers: [['content-type', 'application/json']]
        }
    })
    const headers = watch('headers')

    useDeepCompareEffect(() => {
        if (settings?.metadata?.pluginName === 'custom') {
            const { data, headers, url } = settings.metadata as unknown as CustomSettings

            setValue('data', data)
            setValue('headers', headers)
            setValue('url', url)
        }
    }, [settings])

    const onSubmit = handleSubmit(values => {
        setSettings(parseSettings(values))

        goTo('home')
    })

    const handleRemoveHeader = (index: number) => {
        setValue(
            'headers',
            headers.filter((_, i) => index === i)
        )
    }

    return (
        <form className="modal" onSubmit={onSubmit}>
            <Input
                label="Url"
                error={errors.url?.message}
                required
                {...register('url', {
                    required: 'url is required'
                })}
            />
            <Input
                label="Data"
                error={errors.data?.message}
                required
                {...register('data', {
                    required: 'data is required',
                    validate: {
                        isValidJson: value => {
                            const isValidJson = validadeDataTemplate(value)

                            if (!isValidJson) return 'Data should be a valid JSON string'
                        }
                    }
                })}
            />
            {headers.map((_, index) => {
                return (
                    <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'end' }}>
                        <Input label="Header Name" {...register(`headers.${index}.0`)} />
                        <Input label="Value" {...register(`headers.${index}.1`)} />
                        <button
                            className="small"
                            type="button"
                            onClick={() => handleRemoveHeader(index)}
                            disabled={index === 0 && headers.length === 1}
                        >
                            X
                        </button>
                    </div>
                )
            })}
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    width: '100%',
                    justifyContent: 'center'
                }}
            >
                <button
                    type="button"
                    onClick={() => setValue(`headers.${headers.length + 1}`, ['', ''])}
                >
                    Add Header
                </button>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}
