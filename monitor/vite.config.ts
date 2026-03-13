import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@core": resolve(__dirname, "../src"),
        },
    },
    server: {
        port: 4170,
        strictPort: true,
        proxy: {
            "/api": "http://localhost:4171",
        },
    },
});
