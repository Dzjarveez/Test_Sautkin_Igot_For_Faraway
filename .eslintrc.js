const path = require('path');

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "react-app",
    "airbnb-typescript",
  ],
  rules: {
    "object-curly-newline": 0,
    "import/prefer-default-export": 0,
    "max-len": 0,
    "react/require-default-props": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "no-mixed-operators": 0,
    "operator-linebreak": 0,
    "react/react-in-jsx-scope": 0,
    "no-plusplus": 0,
    "import/no-extraneous-dependencies": 0,
    "jsx-a11y/no-autofocus": 0,
    "react/jsx-props-no-spreading": 0,
    "no-continue": 0,
    "react/jsx-no-bind": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-param-reassign": 0,
    "testing-library/no-unnecessary-act": 0,
    "jsx-a11y/anchor-is-valid": 0,
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, 'src')]],
        extensions: ['.ts', '.js', '.jsx', '.json', '.tsx'],
      },
    },
  },
};
