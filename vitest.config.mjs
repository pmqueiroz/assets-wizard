import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./test.config.ts'],
        coverage: {
            100: true,
            provider: 'v8',
            include: '{src,ui}/**/*.t{s,sx}',
            exclude: ['**/*.{types,spec,test}.t{s,sx}']
        }
    }
})