const path = require('path')

const buildEslintCommand = (filenames) => {
  // Filter out Jest config files that require CommonJS
  const eslintFiles = filenames.filter(
    (f) => !f.includes('jest.config.js') && !f.includes('jest.setup.js')
  )
  
  if (eslintFiles.length === 0) return 'echo "No files to lint"'
  
  return `next lint --fix --file ${eslintFiles.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`
}

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.css': ['prettier --write'],
}
