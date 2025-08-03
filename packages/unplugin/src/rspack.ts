import { createRspackPlugin } from 'unplugin'
import { unpluginFactory } from './index'

/**
 * Rspack plugin
 *
 * @example
 * ```js
 * // rspack.config.js
 * import Lingui from '@lingui/unplugin/rspack'
 *
 * export default {
 *   plugins: [Lingui()],
 * }
 * ```
 */
const rspack = createRspackPlugin(unpluginFactory)
export default rspack
export { rspack as 'module.exports' }
