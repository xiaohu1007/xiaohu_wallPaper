import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
	plugins: [
		uni(),
		AutoImport({
			imports: [
				'vue',
				'uni-app'
			]
		})
	],
	server: {
		host: 'localhost',
		port: 8080,
		proxy: {
			"/h5api": {
				target: "https://tea.qingnian8.com/api/bizhi",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/h5api/, "")
			}
		}
	}
})