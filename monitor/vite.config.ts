import { resolve } from "node:path";
import { createLogger, defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";

const logger = createLogger();
const originalError = logger.error.bind(logger);
logger.error = (msg, options) => {
    if (msg.includes("AbortError") || msg.includes("ECONNRESET")) return;
    originalError(msg, options);
};

const API_PORT = 4171;

export default defineConfig({
    customLogger: logger,
    plugins: [
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
    ],
    define: {
        __API_BASE__: JSON.stringify(`http://localhost:${API_PORT}`),
    },
    resolve: {
        alias: {
            "@core": resolve(__dirname, "../src"),
        },
    },
    optimizeDeps: {
        include: ["@base-ui/react/navigation-menu", "@base-ui/react/combobox", "culori"],
    },
    server: {
        port: 4170,
        strictPort: true,
        proxy: {
            "/api": `http://localhost:${API_PORT}`,
        },
    },
});
