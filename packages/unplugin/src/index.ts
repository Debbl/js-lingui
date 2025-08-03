import path from "path"
import { getConfig } from "@lingui/conf"
import {
  createCompiledCatalog,
  getCatalogs,
  getCatalogForFile,
  getCatalogDependentFiles,
  createMissingErrorMessage,
  createCompilationErrorMessage,
} from "@lingui/cli/api"
import { UnpluginFactory } from "unplugin"

export type LinguiLoaderOptions = {
  config?: string

  /**
   * If true would fail compilation on missing translations
   **/
  failOnMissing?: boolean

  /**
   * If true would fail compilation on message compilation errors
   **/
  failOnCompileError?: boolean
}

export const unpluginFactory: UnpluginFactory<
  LinguiLoaderOptions | undefined
> = (options) => ({
  name: "unplugin-lingui",
  async load(id) {
    const resourcePath = id

    const config = getConfig({
      configPath: options.config,
      cwd: path.dirname(resourcePath),
    })

    const catalogRelativePath = path.relative(config.rootDir, resourcePath)

    const fileCatalog = getCatalogForFile(
      catalogRelativePath,
      await getCatalogs(config)
    )
    if (!fileCatalog) {
      throw new Error(
        `Requested resource ${catalogRelativePath} is not matched to any of your catalogs paths specified in "lingui.config".
Resource: ${resourcePath}
Your catalogs:
${config.catalogs.map((c) => c.path).join("\n")}
Working dir is:
${process.cwd()}
Please check that \`catalogs.path\` is filled properly.\n`
      )
    }

    const { locale, catalog } = fileCatalog
    const dependency = await getCatalogDependentFiles(catalog, locale)
    dependency.forEach((file) => this.addWatchFile(path.normalize(file)))
    const { messages, missing: missingMessages } =
      await catalog.getTranslations(locale, {
        fallbackLocales: config.fallbackLocales,
        sourceLocale: config.sourceLocale,
      })
    if (
      options.failOnMissing &&
      locale !== config.pseudoLocale &&
      missingMessages.length > 0
    ) {
      const message = createMissingErrorMessage(
        locale,
        missingMessages,
        "loader"
      )
      throw new Error(
        `${message}\nYou see this error because \`failOnMissing=true\` in Lingui Loader configuration.`
      )
    }

    // In production, we don't want untranslated strings. It's better to use message
    // keys as a last resort.
    // In development, however, we want to catch missing strings with `missing` parameter
    // of setupI18n (core) and therefore we need to get empty translations if missing.
    const strict = process.env.NODE_ENV !== "production"
    const { source: code, errors } = createCompiledCatalog(locale, messages, {
      strict,
      namespace: "es",
      pseudoLocale: config.pseudoLocale,
    })
    if (errors.length) {
      const message = createCompilationErrorMessage(locale, errors)
      if (options.failOnCompileError) {
        throw new Error(
          `${message} These errors fail build because \`failOnCompileError=true\` in Lingui Loader configuration.`
        )
      } else {
        this.warn(
          new Error(
            `${message} You can fail the build on these errors by setting \`failOnCompileError=true\` in Lingui Loader configuration.`
          )
        )
      }
    }

    return code
  },
})
