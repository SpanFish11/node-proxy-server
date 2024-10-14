import globals from 'globals'
import pluginJs from '@eslint/js'
import standard from 'eslint-config-standard'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginImport from 'eslint-plugin-import'
import pluginSecurity from 'eslint-plugin-security'
import eslintConfigPrettier from 'eslint-config-prettier'

const config = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  pluginSecurity.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      n: pluginN,
      import: pluginImport,
      promise: pluginPromise
    },
    rules: {
      ...standard.rules
    }
  }
]

export default config
