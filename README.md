# Frontend and backend for my blog

<!-- markdownlint-disable MD013 -->

## Run locally

This will run both a Node dev server with hot reload and a PocketBase instance with authentication and API ready to go.

### Frontend

Install dependencies

```bash
npm install
```

Start gulp

```bash
npm run gulp
```

Start dev server

```bash
npm run dev
```

| URL                 | Function                       |
| ------------------- | ------------------------------ |
| localhost:8090/\_/  | PocketBase Admin UI            |
| localhost:8090/api/ | PocketBase REST API            |
| localhost:8080/     | Nodemon server with            |

### Backend

```bash
docker compose -f docker-compose.pb.yaml up
```

Import schema and create data

* Open <http://localhost:8090/_/>
* Create account
* Go to <http://localhost:8090/_/#/settings/import-collections>
* Load [./pb_schema/schema.json](./pb_schema/schema.json)
* Merge collections
* Create new author collection item
* Create new post collection item and set active to true
* Open the frontend <http://localhost:8080>

## Docker

### Build

Frontend

`docker buildx build --platform linux/amd64 -f ./Dockerfile.app . -t minimalism-app:0.0.1`

Backend

`docker buildx build --platform linux/amd64 -f ./Dockerfile.pb . -t minimalism-pb:0.0.1`

### Run

Frontend

`docker run --rm -p 8080:8080 minimalism-app:0.0.1`

Backend

`docker run --rm -p 8090:8090 minimalism-pb:0.0.1`

### Compose

Frontend

`docker compose -f docker-compose.app.yaml up`

Backend

`docker compose -f docker-compose.pb.yaml up`

## Acknowledgements

* [PocketBase](https://github.com/pocketbase/pocketbase)
* [PocketBase Docker](https://github.com/muchobien/pocketbase-docker)
* [Tellbow Schwingen](https://github.com/tellbow/schwingen)

Built with 🐳 and ❤️
