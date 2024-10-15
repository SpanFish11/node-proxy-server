import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import nodePlugin from 'eslint-plugin-n';
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginSecurity from 'eslint-plugin-security';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  nodePlugin.configs['flat/recommended-script'],
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  pluginSecurity.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'n/no-unpublished-import': 'off',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'n/no-missing-import': 'off'
    }
  }
];
