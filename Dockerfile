# stage 1 building
FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN yarn install 
COPY . .
RUN yarn run build

# stage 2
FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npx prisma generate
RUN yarn install --production && yarn cache clean

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD ["yarn", "run", "start:prod"]
