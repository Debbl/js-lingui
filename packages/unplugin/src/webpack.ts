import { createWebpackPlugin } from 'unplugin'
import { unpluginFactory } from './index'

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import Lingui from '@lingui/unplugin/webpack'
 *
 * export default {
 *   plugins: [Lingui()],
 * }
 * ```
 */
const webpack = createWebpackPlugin(unpluginFactory)
export default webpack
export { webpack as 'module.exports' }
