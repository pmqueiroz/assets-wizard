import {  vi,  beforeEach } from 'vitest'

let store = {}

vi.stubGlobal('figma', {
  clientStorage: {
      getAsync: vi.fn(query => Promise.resolve(store[query])),
      setAsync: vi.fn((key, value) => Promise.resolve(store[key] = value))
  }
})

vi.stubGlobal('utils', {
  __stubPluginData: (values = {}) => { 
      store = values
   },
  __clearPluginData: () => { store = {} },
  __getPluginData: () => store
})

beforeEach(() => {
    figma.clientStorage.setAsync.mockClear()
})