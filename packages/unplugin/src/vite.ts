import { createVitePlugin } from 'unplugin'
import { unpluginFactory } from './index'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Lingui from '@lingui/unplugin/vite'
 *
 * export default defineConfig({
 *   plugins: [Lingui()],
 * })
 * ```
 */
const vite = createVitePlugin(unpluginFactory)
export default vite
export { vite as 'module.exports' }
