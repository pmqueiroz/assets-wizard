import React from 'react'
import { ScreenProps } from '../type'

export default function Home({ goTo }: ScreenProps) {
    return (
        <main>
            <button onClick={() => goTo('settings')}>Settings</button>
            <button
                onClick={() => {
                    parent.postMessage(
                        {
                            pluginMessage: {
                                type: 'export'
                            }
                        },
                        '*'
                    )
                }}
            >
                Export
            </button>
        </main>
    )
}
