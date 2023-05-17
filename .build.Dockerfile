# stage 1 building
FROM node:16-alpine as builder
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install 

COPY . .

RUN yarn run build

EXPOSE ${PORT}

CMD ["yarn", "run", "start:prod"]
