# Red-Boar-Inn API

> Projeto Server - API utilizando **NodeJs** para o jogo **Red Boar Inn**

- [Red-Boar-Inn API](#red-boar-inn-api)
  - [Estrutura](#estrutura)
  - [Modelagem](#modelagem)

## Estrutura

```sh
.
├── docs
│   ├── auth.png
│   ├── customers.png
│   ├── modeling.png
│   ├── README.md
│   ├── tasks.md
│   ├── tests.md
│   └── tips.md
├── src
│   ├── controllers
│   │   ├── handlers
│   │   │   ├── auth.handler.ts
│   │   │   └── customer.handler.ts
│   │   ├── auth.controller.ts
│   │   └── customer.controller.ts
│   ├── entities
│   │   └── customer.ts
│   ├── models
│   │   ├── characters.model.ts
│   │   ├── customers.model.ts
│   │   ├── equipments.model.ts
│   │   ├── inventories.model.ts
│   │   ├── skills.model.ts
│   │   └── status.model.ts
│   ├── resources
│   │   ├── auth.ts
│   │   └── customer.ts
│   ├── security
│   │   └── token.ts
│   ├── services
│   │   └── mongodb.ts
│   ├── tests
│   │   ├── mock
│   │   │   └── customers.mock.ts
│   │   ├── resources
│   │   │   ├── auth
│   │   │   │   ├── access.spec.ts
│   │   │   │   └── refresh.spec.ts
│   │   │   └── customers
│   │   │       ├── delete.spec.ts
│   │   │       ├── get.spec.ts
│   │   │       ├── post.spec.ts
│   │   │       ├── unit.spec.ts
│   │   │       └── update.spec.ts
│   │   ├── security
│   │   │   └── token.spec.ts
│   │   ├── services
│   │   │   └── mongo.connect.spec.ts
│   │   ├── clients.ts
│   │   └── conftest.ts
│   ├── index.ts
│   └── server.ts
├── env.example
├── package.json
├── package-lock.json
├── tsconfig.json
├── vitest.config.ts
└── yarn.lock

16 directories, 42 files
```

## Modelagem

![auth](auth.png)
![customers](customers.png)
![modeling](modeling.png)
