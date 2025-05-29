import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  unocss: true,
  ignores: [
    'dist',
    'node_modules',
    'public',
    'nginx_configs',
    '*.md'
  ],
  rules: {
    // 允许单行if不换行
    'antfu/if-newline': 'off',
    'no-template-curly-in-string': 'off',
    'no-irregular-whitespace': 'off',
    'ts/prefer-literal-enum-member': 'warn',
    // 删除未尾逗号
    'style/comma-dangle': ['error', 'never'],
    'jsonc/comma-dangle': ['error', 'never'],
    // 仅单行if允许不使用大括号
    'curly': ['error', 'multi-line'],
    // 允许使用 console.warn 和 console.error，但使用 console.log 警告
    'no-console': ['warn', { allow: ['warn', 'error', 'table', 'group', 'log'] }],
    // 强制每个属性独占一行（推荐）
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4, // 单行最多1个属性
        multiline: 1 // 多行每行1个属性
      }
    ],
    // 可选：强制标签自闭合
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ]
  }
})
