# Red Boar Inn -- Auth -- API

![Node](https://img.shields.io/badge/Node.JS-white?style=for-the-badge&logo=node.js&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=TypeScript&logoColor=black)
![Vitest](https://img.shields.io/badge/Vitest-white?style=for-the-badge&logo=Vitest&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-white?style=for-the-badge&logo=Docker&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=Mongodb&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-white?style=for-the-badge&logo=Redis&logoColor=black)
![Heroku](https://img.shields.io/badge/Heroku-white?style=for-the-badge&logo=Heroku&logoColor=black)

O projeto é uma API backend para cadastro e autenticação de usuários, utilizando NodeJS, TypeScript, Vitest, MongoDB, Redis, Docker e Heroku. É uma aplicação escalável e seguro, seguindo as melhores práticas de desenvolvimento.

> -   [Como inicializar o projeto](START.md)
> -   [Estrutura das pastas e arquivos (tree)](STRUCTURE.md)
> -   [Documentação - swagger - arquivo](../swagger.json)
> -   [Documentação - swagger - deploy](https://rbi-auth-node-api.herokuapp.com/docs/)
> -   [Scripts do projeto](../scripts/)

## Endpoints

> -   [endpoints-image](endpoints.png)

### Auth

> -   POST /token
> -   POST /refresh

### Customer

> -   GET /customers
> -   GET /customers/:id
> -   POST /customers
> -   PATCH /customers
> -   DELETE /customers

### Password

> -   POST /password
> -   PATCH /password
> -   PATCH /password/:token

## Diagrams

### Architecture

![architecture](./diagrams/architecture.png)

### UseCases

![useCases](./diagrams/usecases.png)

### Auth routes

![authRoutes](./diagrams/authRoutes.png)

### Customer routes

![customerRoutes](./diagrams/customerRoutes.png)

### Password routes

![passwordRoutes](./diagrams/passwordRoutes.png)

### Entity

![entityCustomer](./diagrams/entity.png)
