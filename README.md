# NodeJS frontend for blog.larsgerber.ch

Built with 🐳

## Develop

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
