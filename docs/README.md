# Red-Boar-Inn API

> Projeto Server - API utilizando **NodeJs** para o jogo **Red Boar Inn**

- [Tasks](tasks.md)
- [Tests](tests.md)

>

- [Red-Boar-Inn API](#red-boar-inn-api)
  - [Estrutura](#estrutura)
  - [Modelagem](#modelagem)

## Estrutura

```sh
.
├── docs
│   ├── CLI.md
│   ├── MBD-RBI.png
│   ├── README.md
│   ├── tasks.md
│   └── tests.md
├── package.json
├── package-lock.json
├── src
│   ├── controllers
│   │   └── customer.controller.ts
│   ├── database
│   │   └── connect.ts
│   ├── index.ts
│   ├── models
│   │   ├── customer.model.ts
│   │   ├── entities
│   │   │   └── customer.ts
│   │   └── schemas
│   │       └── customer.schema.ts
│   ├── resources
│   │   ├── auth.ts
│   │   ├── customer.ts
│   │   └── server.ts
│   └── tests
│       ├── clients.ts
│       ├── conftest.ts
│       ├── connection
│       │   └── database.spec.ts
│       ├── mock
│       │   └── customers.mock.ts
│       └── resources
│           ├── auth.spec.ts
│           └── customers.spec.ts
├── tsconfig.json
└── yarn.lock

12 directories, 24 files

```

## Modelagem

![MBD](MBD-RBI.png)
