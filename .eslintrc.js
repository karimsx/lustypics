const blitzEslint = require("@blitzjs/next/eslint")

module.exports = {
  ...blitzEslint,
  rules: {
    ...blitzEslint.rules,
    "@typescript-eslint/no-require-imports": "warn",
  },
}
