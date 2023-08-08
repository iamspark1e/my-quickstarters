import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
// docs: https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
import legacy from '@vitejs/plugin-legacy'
import babel from 'vite-plugin-babel';
import autoMpaHtmlPlugin from 'vite-plugin-auto-mpa-html'
import Compression from "unplugin-compression/vite";

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
            enableDevDirectory: true,
            sharedData: {
                NODE_ENV: process.env.NODE_ENV
            },
            experimental: {
                customTemplateName: ".html"
            }
        }),
        Compression({
            adapter: "zip",
            source: "dist",
            outDir: "./",
            formatter: "{{name}}.{{ext}}",
            compressingOptions: {
                ignoreBase: true,
            }
        }),

    ],
    server: {
        host: '0.0.0.0'
    },
    root: "src",
    base: "",
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
