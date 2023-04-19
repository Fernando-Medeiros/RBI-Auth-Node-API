# Start

## Install dependencies

```sh
# 1
yarn install

# 2
docker compose up --build
```

## Tests

### To run the scope tests [domain - application]

```sh
# use-cases
yarn test src/app

# entities
yarn test src/dom

# entities and use-cases
yarn test src/
```

### To run the scope tests integration -> integration -> [mongo - redis]

```sh
# 1
docker compose up -d

# 2
docker exec -it rbi-auth /bin/bash

# 3
yarn test integration/
```

## Docker - Tips

### D-Containers

```sh
# List containers
docker container ls

# Running containers
docker container stats

# Stop containers
docker container stop <nameContainer>
```

### D-Images

```sh
# List images
docker images

# Remove image(s)
docker image rm <imageID>
```
