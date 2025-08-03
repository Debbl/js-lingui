import { createEsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './index'

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import Lingui from '@lingui/unplugin/esbuild'
 * 
 * build({ plugins: [Lingui()] })
 * ```
 */
const esbuild = createEsbuildPlugin(unpluginFactory)
export default esbuild
export { esbuild as 'module.exports' }
