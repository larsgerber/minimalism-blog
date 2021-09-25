FROM node:12

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run test

CMD ["node", "app.js"]