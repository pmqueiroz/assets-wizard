import React from 'react'

export const Export = () => {
    return (
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
    )
}
