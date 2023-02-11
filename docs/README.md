# Red-Boar-Inn API

> Projeto Server - API utilizando **NodeJs** para o jogo **Red Boar Inn**

- [Red-Boar-Inn API](#red-boar-inn-api)
  - [Estrutura](#estrutura)
  - [Modelagem](#modelagem)

## Estrutura

```sh
.
├── docs
│   ├── CLI.md
│   ├── Diagrama de Fluxo AccessToken.png
│   ├── Diagrama de Fluxo RefreshToken.png
│   ├── MBD-RBI.png
│   ├── README.md
│   ├── tasks.md
│   ├── tests.md
│   └── userCase.png
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
├── vitest.config.ts
└── yarn.lock

12 directories, 28 files
```

## Modelagem

<div style="display: flex; gap:10px; align-items:center">

<img width=400px src="MBD-RBI.png" />

<img width=400px src="userCase.png" />

</div>

<br>

<div style="display: flex; gap:10px; align-items:center">

<img width=400px src="Diagrama%20de%20Fluxo%20AccessToken.png" />

<img width=400px src="Diagrama%20de%20Fluxo%20RefreshToken.png" />

</div>
