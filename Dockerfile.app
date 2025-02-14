FROM node:23.7.0-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:23.7.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
COPY --from=builder /usr/src/app/dist/ dist/
CMD ["node", "app.js"]
