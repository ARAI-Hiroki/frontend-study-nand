// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.js アプリへのパスを指定
  dir: './',
})

// Jest に渡すカスタム設定
const customJestConfig = {
  // 各テストの前に実行するセットアップファイルを指定
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // 'jsdom' をテスト環境として指定
  testEnvironment: 'jest-environment-jsdom',
  // TypeScript のパスエイリアス (@/features/* など) を解決
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// createJestConfig をエクスポートすることで、next/jest が .next/ ディレクトリ内の
// Next.js 設定に基づいて非同期的に Jest の設定を作成できるようになります
module.exports = createJestConfig(customJestConfig)