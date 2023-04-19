# STRUCTURE

```console

.
├── docs
│   ├── diagrams
│   │   ├── architecture.png
│   │   ├── authRoutes.png
│   │   ├── customerRoutes.png
│   │   ├── entity.png
│   │   ├── passwordRoutes.png
│   │   └── usecases.png
│   ├── swagger
│   │   ├── auth
│   │   │   ├── paths.json
│   │   │   ├── requests.json
│   │   │   └── responses.json
│   │   ├── build
│   │   │   ├── build.impl.ts
│   │   │   └── interface.ts
│   │   ├── config
│   │   │   ├── authentication.json
│   │   │   ├── exceptions.json
│   │   │   └── info.json
│   │   ├── customer
│   │   │   ├── paths.json
│   │   │   ├── requests.json
│   │   │   └── responses.json
│   │   └── password
│   │       ├── paths.json
│   │       └── requests.json
│   ├── endpoints.png
│   ├── README.md
│   ├── START.md
│   └── STRUCTURE.md
├── scripts
│   ├── build.swagger.ts
│   └── build.tree.ts
├── src
│   ├── application
│   │   ├── interfaces
│   │   │   ├── repositories
│   │   │   │   ├── auth.repository.interface.ts
│   │   │   │   ├── customer.repository.interface.ts
│   │   │   │   └── password.repository.interface.ts
│   │   │   └── security
│   │   │       ├── crypt.interface.ts
│   │   │       ├── email.interface.ts
│   │   │       └── token.interface.ts
│   │   ├── useCases
│   │   │   ├── authCase
│   │   │   │   ├── requests
│   │   │   │   │   ├── auth.requests.ts
│   │   │   │   │   └── requests.interface.ts
│   │   │   │   ├── accessCase.ts
│   │   │   │   └── refreshCase.ts
│   │   │   ├── customerCase
│   │   │   │   ├── requests
│   │   │   │   │   ├── customer.requests.ts
│   │   │   │   │   └── requests.interface.ts
│   │   │   │   ├── createCase.ts
│   │   │   │   ├── deleteCase.ts
│   │   │   │   ├── getAllCase.ts
│   │   │   │   ├── getByIdCase.ts
│   │   │   │   └── updateCase.ts
│   │   │   └── passwordCase
│   │   │       ├── requests
│   │   │       │   ├── password.requests.ts
│   │   │       │   └── requests.interface.ts
│   │   │       ├── recoverCase.ts
│   │   │       ├── resetCase.ts
│   │   │       └── updateCase.ts
│   │   └── validators
│   │       ├── auth.validators.ts
│   │       ├── customer.validators.ts
│   │       └── validators.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── customer.ts
│   │   └── interfaces
│   │       └── customer.interface.ts
│   ├── infrastructure
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── customer.controller.ts
│   │   │   └── password.controller.ts
│   │   ├── handlers
│   │   │   ├── auth.handler.ts
│   │   │   ├── customer.handler.ts
│   │   │   └── password.handler.ts
│   │   ├── middlewares
│   │   │   ├── api-secret.ts
│   │   │   ├── exceptions.ts
│   │   │   ├── request-rate-limit.ts
│   │   │   └── session.ts
│   │   ├── models
│   │   │   └── customers.model.ts
│   │   ├── repositories
│   │   │   ├── authRepo
│   │   │   │   └── auth.repository.impl.ts
│   │   │   ├── customerRepo
│   │   │   │   └── customer.repository.impl.ts
│   │   │   ├── passwordRepo
│   │   │   │   └── password.repository.impl.ts
│   │   │   └── sessionRepo
│   │   │       └── session.repository.impl.ts
│   │   ├── resources
│   │   │   ├── auth.routes.ts
│   │   │   ├── customer.routes.ts
│   │   │   └── password.routes.ts
│   │   ├── security
│   │   │   ├── crypt
│   │   │   │   └── crypt.impl.ts
│   │   │   ├── email
│   │   │   │   └── email.impl.ts
│   │   │   └── token
│   │   │       ├── decode.impl.ts
│   │   │       ├── encode.impl.ts
│   │   │       └── token.impl.ts
│   │   ├── services
│   │   │   ├── cache
│   │   │   │   ├── cache.connect.ts
│   │   │   │   └── cache.handler.ts
│   │   │   ├── database
│   │   │   │   └── database.connect.ts
│   │   │   └── email
│   │   │       └── email.ts
│   │   └── server.ts
│   ├── utils
│   │   ├── http.exceptions.ts
│   │   └── http.protocols.ts
│   └── main.ts
├── tests
│   ├── config
│   │   ├── headers
│   │   │   ├── api-secret.header.ts
│   │   │   └── authorization.header.ts
│   │   ├── helpers
│   │   │   ├── get-one-customer.ts
│   │   │   ├── get-token-by-scope.ts
│   │   │   └── insert-customer.ts
│   │   ├── config.ts
│   │   └── customer.ts
│   ├── infra
│   │   ├── security
│   │   │   ├── email.spec.ts
│   │   │   ├── hash.spec.ts
│   │   │   └── token.spec.ts
│   │   └── services
│   │       └── mail
│   │           └── mail.connect.spec.ts
│   ├── integration
│   │   ├── auth
│   │   │   ├── access
│   │   │   │   ├── exceptions.spec.ts
│   │   │   │   └── success.spec.ts
│   │   │   └── refresh
│   │   │       ├── exceptions.spec.ts
│   │   │       └── success.spec.ts
│   │   ├── customers
│   │   │   ├── delete
│   │   │   │   ├── exceptions.spec.ts
│   │   │   │   └── success.spec.ts
│   │   │   ├── get
│   │   │   │   ├── exceptions.spec.ts
│   │   │   │   └── success.spec.ts
│   │   │   ├── patch
│   │   │   │   ├── exceptions.spec.ts
│   │   │   │   └── success.spec.ts
│   │   │   └── post
│   │   │       ├── exceptions.spec.ts
│   │   │       └── success.spec.ts
│   │   └── password
│   │       ├── recover
│   │       │   ├── exceptions.spec.ts
│   │       │   └── success.spec.ts
│   │       ├── reset
│   │       │   ├── exceptions.spec.ts
│   │       │   └── success.spec.ts
│   │       └── update
│   │           ├── exceptions.spec.ts
│   │           └── success.spec.ts
│   └── mock
│       └── customers.mock.ts
├── docker-compose.yml
├── Dockerfile
├── env.example
├── package.json
├── swagger.json
├── tsconfig.json
├── vitest.config.ts
└── yarn.lock

67 directories, 121 files

```
