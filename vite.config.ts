import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import * as path from "node:path"

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            "$i18n": path.resolve(__dirname, "./src/i18n")
        }
    }
})
