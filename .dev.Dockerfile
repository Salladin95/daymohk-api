# stage 1 building
FROM node:16-alpine as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install 
COPY . .

RUN npx prisma generate

EXPOSE ${PORT}

CMD ["yarn", "run", "start:dev"]
