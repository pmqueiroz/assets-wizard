import {  vi,  beforeEach } from 'vitest'

let store = {}

vi.stubGlobal('figma', {
  currentPage: {
      getPluginData: query => store[query],
      setPluginData: vi.fn((key, value) =>  store[key] = value)
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
    figma.currentPage.setPluginData.mockClear()
})