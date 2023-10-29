import React, { useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { PluginProps } from '../type'
import { useForm } from 'react-hook-form'
import { Settings } from '../../shared/types'
import { Input } from '../components/input'
import { validadeDataTemplate } from '../helpers/validate-data-template'
import { Button } from '../components/button'
import { IoCloseSharp } from 'react-icons/io5'

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

export default function Custom({ setSettings, settings, toolbar: Toolbar }: PluginProps) {
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

    const onSubmit = (values: CustomSettings) => setSettings(parseSettings(values))

    const handleRemoveHeader = (index: number) => {
        setValue(
            'headers',
            headers.filter((_, i) => index !== i)
        )
    }

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSubmit)())

        return () => subscription.unsubscribe()
    }, [handleSubmit, watch])

    return (
        <div className="flex flex-col w-full h-full grow">
            <div className="flex flex-col justify-center items-center gap-3 w-full">
                <Input
                    label="Url"
                    error={errors.url?.message}
                    required
                    placeholder="https://your-webhook-url.com"
                    {...register('url', {
                        required: 'url is required'
                    })}
                />
                <Input
                    label="Data"
                    error={errors.data?.message}
                    required
                    placeholder='{ "some": "json" }'
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
                        <div className="flex gap-2 w-full items-end">
                            <Input label="Header Name" {...register(`headers.${index}.0`)} />
                            <Input label="Value" {...register(`headers.${index}.1`)} />
                            <Button
                                variant="neutral"
                                type="button"
                                onClick={() => handleRemoveHeader(index)}
                                disabled={index === 0 && headers.length === 1}
                            >
                                <IoCloseSharp />
                            </Button>
                        </div>
                    )
                })}
            </div>
            <Toolbar
                slot={
                    <Button
                        expand
                        variant="neutral"
                        type="button"
                        onClick={() => setValue(`headers.${headers.length + 1}`, ['', ''])}
                    >
                        Add Header
                    </Button>
                }
            />
        </div>
    )
}
