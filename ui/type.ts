import { ComponentProps, ElementType } from 'react'
import { Settings } from '../shared/types'

export type PluginId = 'github' | 'custom'

export type Plugin = (props: PluginProps) => JSX.Element

export type Toolbar = (props: { slot?: React.ReactNode }) => JSX.Element

export interface PluginProps {
    settings: Settings | undefined
    setSettings: (settings: Settings) => void
    toolbar: Toolbar
}

export type PolymorphicProps<P extends object, E extends ElementType = ElementType> = P & {
    polymorphic?: E
} & Omit<ComponentProps<E>, 'as'>
