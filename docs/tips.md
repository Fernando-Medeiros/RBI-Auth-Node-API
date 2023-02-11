# Para não ter dor de cabeça no proximo projeto \_|\_O_o

## Node

```sh
# cria o package*
npm init y
```

```json
{
  "main": "index.js",
  "scripts": {
    "build": "tsc --project tsconfig.json",
    "start:dev": "nodemon --watch 'src/' --exec 'ts-node-esm src/index.ts' -e ts",
    "start": "node build/index.js",
    "test": "vitest"
  },
  "type": "commonjs"
}
```

## TsConfig

```sh
# configuração do tsconfig
npm install -g typescript

npm install typescript -D

tsc --init

tsc -v
```

```json
{
    "outDir": "build",
    "rootDir": "src",
    "module": "commonjs",
    "moduleResolution": "node"
},
{

  "ts-node": {
    "esm": true // «———— enabling ESM for ts-node
  },
  "include": ["/**/*.ts", "src/index.ts", "vitest.config.ts"],
  "exclude": ["node_modules", "./src/tests"],
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@tsconfig/node-lts-strictest-esm/tsconfig.json"
}
```

## Yarn

```sh
# no root para gerar yarn.lock
yarn
```

## Eslint

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```
