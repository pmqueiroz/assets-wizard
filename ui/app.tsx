import React, { useState } from 'react'
import './global.css'
import { SettingsForm } from './components/settings'
import { Export } from './components/export'

export default function App() {
    const [showSettings, setShowSettings] = useState(false)

    return (
        <main>
            {showSettings && <SettingsForm toggle={setShowSettings} />}
            <button
                onClick={() => {
                    setShowSettings(true)
                }}
            >
                Configurar
            </button>
            <Export />
        </main>
    )
}
