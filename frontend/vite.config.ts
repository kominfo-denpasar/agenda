import {defineConfig} from "vite";
import {lingui} from "@lingui/vite-plugin";
import react from "@vitejs/plugin-react";
import {copy} from "vite-plugin-copy";

export default defineConfig({
    optimizeDeps: {
        include: ["react-router"]
    },
    server: {
        hmr: {
            port: 24678,
            protocol: "wss",
	    host: 'event.denpasarkota.go.id',
	    clientPort: 24678,
	    client: {
	        host: 'event.denpasarkota.go.id'
 	    }
        },
	host: true,
	port: 5679,
	allowedHosts: [
      	    'localhost',
      	    '127.0.0.1',
            'event.kreatifitas.site',
            'event.denpasarkota.go.id'
        ],
    },
    plugins: [
        react({
            babel: {
                plugins: ["macros"],
            },
        }),
        lingui(),
        copy({
            targets: [{src: "src/embed/widget.js", dest: "public"}],
            hook: "writeBundle",
        }),
    ],
    define: {
        "process.env": process.env,
    },
    ssr: {
        noExternal: ["react-helmet-async"],
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            }
        }
    }
});
