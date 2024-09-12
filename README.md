# NodeJS frontend for blog.larsgerber.ch

<!-- markdownlint-disable MD013 -->

Built with 🐳

## Develop

### Local

```bash
docker compose -f docker-compose.local.yaml up
```

* Open <http://localhost:8090/_/>
* Create account
* Go to <http://localhost:8090/_/#/settings/import-collections>
* Load ./pocketbase/pb_schema.json
* Merge collections
* Create new author collection item
* Create new post collection item and set active to true

```bash
npm install
npm run gulp
npm run dev
```

Open <http://localhost:8080>

### Remote

```bash
docker compose -f docker-compose.yml up
```

## Production

### App version

```bash
export CI_TAG='0.0.0'
```

### Build

```bash
docker buildx build --platform linux/amd64 -f ./Dockerfile -t docker.larsgerber.ch/blog/minimalism-frontend:$CI_TAG .
```

### Test

```bash
docker run --rm -p 8080:8080 docker.larsgerber.ch/blog/minimalism-frontend:$CI_TAG
```

### Push

```bash
docker push docker.larsgerber.ch/blog/minimalism-frontend:$CI_TAG
```

### Push new tag

```bash
git tag $CI_TAG
git push --tags
```
