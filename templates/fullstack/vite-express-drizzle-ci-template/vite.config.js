import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const isProd = process.env.NODE_ENV;
    return {
        root: "./src",
        publicDir: "../public",
        envDir: "../",
        build: {
            outDir: '../dist',
            emptyOutDir: true
        },
        plugins: [
            react(),
            svgr(),
            legacy({
                targets: ['defaults', '>0.2%'],
            }),
        ],
        server: {
            host: '0.0.0.0',
            port: isProd ? (parseInt(env.PORT) - 1) : env.PORT,
            proxy: {
                '/api': {
                    target: "http://localhost:" + env.PORT,
                    changeOrigin: true,
                    secure: false
                }
            }
        }
    }
})
