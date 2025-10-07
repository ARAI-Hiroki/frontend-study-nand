// @ts-check

import js from '@eslint/js'
import eslintPluginNext from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

import tsEslint from 'typescript-eslint'

export default [
  // Base configuration
  { files: ['*.js', '*.jsx', '*.ts', '*.tsx'] },
  {
    ignores: [
      '**/build/',
      '**/bin/',
      '**/dist/',
      '**/obj/',
      '**/out/',
      '**/.next/',
      '**/node_modules/',
      '**/storybook-static/',
      'next-env.d.ts'
    ]
  },

  // TypeScript configuration
  {
    name: 'eslint/recommended',
    rules: js.configs.recommended.rules
  },
  ...tsEslint.configs.recommended,

  // React configuration
  {
    name: 'react/jsx-runtime',
    plugins: {
      react: eslintPluginReact
    },
    rules: eslintPluginReact.configs['jsx-runtime'].rules,
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    name: 'react-hooks/recommended',
    plugins: {
      'react-hooks': eslintPluginReactHooks
    },
    // @TODO プロパティ 'configs' は型 'typeof import("/Users/hiroki/devprj/frontend-study-nand/node_modules/eslint-plugin-react-hooks/index")' に存在しません。ts(2339)
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules
    }
  },

  // Next.js configuration
  {
    name: 'next/core-web-vitals',
    plugins: {
      '@next/next': eslintPluginNext
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules
    }
  },

  // Tailwind CSS
  // {
  //   name: 'tailwindcss/rules',
  //   plugins: {
  //     tailwindcss: eslintPluginTailwindcss,
  //   },
  //   rules: {
  //     'tailwindcss/classnames-order': 'warn',
  //     'tailwindcss/no-custom-classname': 'off',
  //   },
  // },

  // Prettier compatibility
  {
    name: 'prettier/config',
    ...eslintConfigPrettier
  },

  // Project config files
  {
    files: ['postcss.config.js', 'next.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        module: 'writable',
        require: 'readonly'
      }
    }
  },
  {
    files: ['tailwind.config.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  },

  // Project custom rules
  {
    name: 'project-custom',
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
]
