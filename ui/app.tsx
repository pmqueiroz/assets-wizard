import React, { useState } from 'react'
import './global.css'
import { screens } from './screens'
import { ScreenId } from './type'

export default function App() {
    const [currentScreen, setScreen] = useState<ScreenId>('home')

    const Screen = screens[currentScreen]

    return (
        <main>
            <Screen currentScreen={currentScreen} goTo={setScreen} />
        </main>
    )
}
