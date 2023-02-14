# Red-Boar-Inn API

> Projeto Server - API utilizando **NodeJs** para o jogo **Red Boar Inn**

- [Red-Boar-Inn API](#red-boar-inn-api)
  - [Estrutura](#estrutura)
  - [Modelagem](#modelagem)

## Estrutura

```sh
.
├── docs
│   ├── auth.png
│   ├── customers.png
│   ├── modeling.png
│   ├── README.md
│   ├── tasks.md
│   ├── tests.md
│   └── tips.md
├── package.json
├── package-lock.json
├── src
│   ├── controllers
│   │   ├── customer.controller.ts
│   │   └── handlers
│   │       └── customer.handler.ts
│   ├── index.ts
│   ├── models
│   │   ├── characters.model.ts
│   │   ├── customers.model.ts
│   │   ├── equipments.model.ts
│   │   ├── inventories.model.ts
│   │   ├── skills.model.ts
│   │   └── status.model.ts
│   ├── resources
│   │   ├── auth.ts
│   │   └── customer.ts
│   ├── schemas
│   │   └── customer.schema.ts
│   ├── server.ts
│   ├── services
│   │   └── mongodb.ts
│   └── tests
│       ├── clients.ts
│       ├── conftest.ts
│       ├── mock
│       │   └── customers.mock.ts
│       ├── resources
│       │   ├── auth.spec.ts
│       │   └── customers
│       │       ├── delete.spec.ts
│       │       ├── get.spec.ts
│       │       ├── post.spec.ts
│       │       └── update.spec.ts
│       └── services
│           └── mongo.connect.spec.ts
├── tsconfig.json
├── vitest.config.ts
└── yarn.lock

13 directories, 35 files
```

## Modelagem

![auth](auth.png)
![customers](customers.png)
![modeling](modeling.png)
