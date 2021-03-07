module.exports = {
  extends: [
    'plugin:vue/vue3-recommended', 
    '@vue/typescript'],
  rules: {
    semi: [2, 'never'],
    "indent": ["error", 2],
    eqeqeq: ['error', 'always'],
    "no-mixed-spaces-and-tabs": ["error"],
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off'
  },
}
