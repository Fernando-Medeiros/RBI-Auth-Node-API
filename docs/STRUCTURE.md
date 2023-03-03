# Structure

```sh
.
├── docs
│   ├── diagrams
│   │   ├── architecture.png
│   │   ├── auth_routes.png
│   │   ├── customer_routes.png
│   │   ├── modeling.png
│   │   ├── request_response.png
│   │   └── usecase.png
│   ├── endpoints.png
│   ├── README.md
│   ├── STRUCTURE.md
│   └── tips.md
├── src
│   ├── app
│   │   ├── interfaces
│   │   │   ├── repositories
│   │   │   │   ├── auth.repository.interface.ts
│   │   │   │   ├── customer.repository.interface.ts
│   │   │   │   └── password.repository.interface.ts
│   │   │   └── security
│   │   │       ├── crypt.interface.ts
│   │   │       ├── email.interface.ts
│   │   │       └── token.interface.ts
│   │   ├── useCases
│   │   │   ├── authCase
│   │   │   │   ├── requests
│   │   │   │   │   ├── auth.requests.ts
│   │   │   │   │   └── requests.interface.ts
│   │   │   │   ├── accessCase.ts
│   │   │   │   └── refreshCase.ts
│   │   │   ├── customerCase
│   │   │   │   ├── requests
│   │   │   │   │   ├── customer.requests.ts
│   │   │   │   │   └── requests.interface.ts
│   │   │   │   ├── createCase.ts
│   │   │   │   ├── deleteCase.ts
│   │   │   │   ├── getAllCase.ts
│   │   │   │   ├── getByIdCase.ts
│   │   │   │   └── updateCase.ts
│   │   │   └── passwordCase
│   │   │       ├── requests
│   │   │       │   ├── password.requests.ts
│   │   │       │   └── requests.interface.ts
│   │   │       ├── recoverCase.ts
│   │   │       ├── resetCase.ts
│   │   │       └── updateCase.ts
│   │   └── validators
│   │       ├── auth.validators.ts
│   │       ├── customer.validators.ts
│   │       └── validators.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── customer.ts
│   │   └── interfaces
│   │       └── customer.interface.ts
│   ├── helpers
│   │   ├── http.exceptions.ts
│   │   └── http.protocols.ts
│   ├── infra
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── customer.controller.ts
│   │   │   └── password.controller.ts
│   │   ├── docs
│   │   │   ├── auth
│   │   │   │   ├── paths.json
│   │   │   │   ├── requests.json
│   │   │   │   └── responses.json
│   │   │   ├── build
│   │   │   │   ├── interface.ts
│   │   │   │   └── script.ts
│   │   │   ├── config
│   │   │   │   ├── authentication.json
│   │   │   │   ├── exceptions.json
│   │   │   │   └── info.json
│   │   │   ├── customer
│   │   │   │   ├── paths.json
│   │   │   │   ├── requests.json
│   │   │   │   └── responses.json
│   │   │   └── swagger.json
│   │   ├── handlers
│   │   │   ├── auth.handler.ts
│   │   │   ├── customer.handler.ts
│   │   │   └── password.handler.ts
│   │   ├── middlewares
│   │   │   ├── exceptions.ts
│   │   │   └── session.ts
│   │   ├── models
│   │   │   ├── characters.model.ts
│   │   │   ├── customers.model.ts
│   │   │   ├── equipments.model.ts
│   │   │   ├── inventories.model.ts
│   │   │   ├── skills.model.ts
│   │   │   └── status.model.ts
│   │   ├── repositories
│   │   │   ├── authRepo
│   │   │   │   └── auth.repository.impl.ts
│   │   │   ├── customerRepo
│   │   │   │   └── customer.repository.impl.ts
│   │   │   └── passwordRepo
│   │   │       └── password.repository.impl.ts
│   │   ├── resources
│   │   │   ├── auth.routes.ts
│   │   │   ├── customer.routes.ts
│   │   │   └── password.routes.ts
│   │   ├── security
│   │   │   ├── crypt
│   │   │   │   └── crypt.impl.ts
│   │   │   ├── email
│   │   │   │   └── email.impl.ts
│   │   │   └── token
│   │   │       └── token.impl.ts
│   │   ├── services
│   │   │   ├── email.ts
│   │   │   └── mongodb.ts
│   │   └── server.ts
│   └── main.ts
├── tests
│   ├── app
│   │   ├── authCases
│   │   ├── customerCases
│   │   └── passwordCases
│   ├── config
│   │   ├── clients.ts
│   │   └── conftest.ts
│   ├── infra
│   │   ├── resources
│   │   │   ├── auth
│   │   │   │   ├── access.spec.ts
│   │   │   │   └── refresh.spec.ts
│   │   │   ├── customers
│   │   │   │   ├── delete.spec.ts
│   │   │   │   ├── get.spec.ts
│   │   │   │   ├── post.spec.ts
│   │   │   │   └── update.spec.ts
│   │   │   └── password
│   │   │       ├── recover.spec.ts
│   │   │       ├── reset.spec.ts
│   │   │       └── update.spec.ts
│   │   ├── security
│   │   │   ├── email.spec.ts
│   │   │   ├── hash.spec.ts
│   │   │   └── token.spec.ts
│   │   └── services
│   │       ├── database
│   │       │   └── mongo.connect.spec.ts
│   │       └── mail
│   │           └── mail.connect.spec.ts
│   └── mock
│       └── customers.mock.ts
├── env.example
├── package.json
├── package-lock.json
├── tsconfig.json
├── vitest.config.ts
└── yarn.lock

55 directories, 101 files
```
