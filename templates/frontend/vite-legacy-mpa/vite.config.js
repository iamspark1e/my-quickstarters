import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
// docs: https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
import legacy from '@vitejs/plugin-legacy'
import babel from 'vite-plugin-babel';
import autoMpaHtmlPlugin from 'vite-plugin-auto-mpa-html'
import ZipPack from 'unplugin-zip-pack/vite'

const buildVersion = Math.floor(Date.now() / 1000).toString() // example, using timestamp to keep the build version string always latest
const baseUrl = process.env.NODE_ENV === "production" ? `${buildVersion}/` : ""

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        legacy({
            targets: ["> 0.2%"],
        }),
        babel(),
        autoMpaHtmlPlugin({
            entryName: "main.js",
            configName: "config.js",
            enableDevDirectory: true,
            sharedData: {
                NODE_ENV: process.env.NODE_ENV
            },
            experimental: {
                customTemplateName: ".html"
            }
        }),
        ZipPack({
            in: './dist',
            out: './dist.zip',
            filter: (file) => !file.endsWith('.html') // example, ignore all HTML files (take care if you have HTML in public folders!).
        }),
    ],
    server: {
        host: '0.0.0.0'
    },
    root: "src",
    base: baseUrl,
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                assetFileNames: "[name]-[hash][extname]",
                entryFileNames: `[name]-[hash].js`,
                chunkFileNames: `[name]-[hash].js`,
            }
        }
    }
})
