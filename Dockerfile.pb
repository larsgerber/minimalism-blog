FROM golang:1.23.1-alpine AS builder
WORKDIR /usr/src/app
COPY go.* .
COPY main.go .
RUN go build -o pocketbase main.go

FROM alpine:3.20.3
WORKDIR /usr/local/bin
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
COPY --from=builder /usr/src/app/pocketbase .
ENTRYPOINT ["pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"]
