module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
    ],
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    },
    "ignorePatterns": [
        "node_modules/",
        "lib/",
        ".eslintrc.js",
    ]
}
