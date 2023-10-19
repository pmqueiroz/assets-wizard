import { describe, it, expect, beforeAll } from 'vitest'
import { getSettings, setSettings } from './settings'

describe('getSettings', () => {
    it('should be a function', () => {
        expect(getSettings).toBeInstanceOf(Function)
    })

    describe('all values setted with wrong repo pattern', () => {
        beforeAll(() => {
            utils.__stubPluginData({
                repo: 'worng-pattern-name',
                token: 'some token',
                eventType: 'event'
            })
        })

        it('should get all the settings data and return in a object', async () => {
            const settings = await getSettings()

            expect(settings).toStrictEqual(
                expect.objectContaining({
                    repo: 'worng-pattern-name',
                    token: 'some token',
                    eventType: 'event'
                })
            )
        })

        it('should validate if passed valid config as true', async () => {
            try {
                await getSettings({ validate: true })
            } catch (error) {
                expect(error.message).toBe(
                    'The repo you passed does not match the pattern [username]/[repository]'
                )
            }
        })
    })

    describe('all values setted correctly', () => {
        beforeAll(() => {
            utils.__stubPluginData({
                repo: 'right/pattern',
                token: 'some token',
                eventType: 'event'
            })
        })

        it('should get all the settings data and return in a object', async () => {
            const settings = await getSettings()

            expect(settings).toStrictEqual(
                expect.objectContaining({
                    repo: 'right/pattern',
                    token: 'some token',
                    eventType: 'event'
                })
            )
        })

        it('should validate if passed valid config as true', () => {
            expect(() => getSettings({ validate: true }).then()).not.toThrowError()
        })
    })

    describe('no values setted', () => {
        beforeAll(() => {
            utils.__clearPluginData({})
        })

        it('should get all the settings data and return in a object', async () => {
            const settings = await getSettings()

            expect(settings).toStrictEqual({
                repo: undefined,
                token: undefined,
                eventType: undefined
            })
        })

        it('should validate if passed valid config as true', async () => {
            try {
                await getSettings({ validate: true })
            } catch (error) {
                expect(error.message).toBe(
                    'Your need to config all the settings first'
                )
            }
        })
    })
})

describe('setSettings', () => {
    it('should be a function', () => {
        expect(setSettings).toBeInstanceOf(Function)
    })

    it('should cann setPluginData method', async () => {
        await setSettings({ repo: 'omg' })

        expect(figma.clientStorage.setAsync).toHaveBeenCalledWith('repo', 'omg')
    })
})
