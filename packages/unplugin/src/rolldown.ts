import { createRolldownPlugin } from 'unplugin'
import { unpluginFactory } from './index'

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import Lingui from '@lingui/unplugin/rolldown'
 *
 * export default {
 *   plugins: [Lingui()],
 * }
 * ```
 */
const rolldown = createRolldownPlugin(unpluginFactory)
export default rolldown
export { rolldown as 'module.exports' }
