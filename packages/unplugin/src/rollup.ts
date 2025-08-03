import { createRollupPlugin } from 'unplugin'
import { unpluginFactory } from './index'

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.ts
 * import Lingui from '@lingui/unplugin/rollup'
 *
 * export default {
 *   plugins: [Lingui()],
 * }
 * ```
 */
const rollup = createRollupPlugin(unpluginFactory)
export default rollup
export { rollup as 'module.exports' }
