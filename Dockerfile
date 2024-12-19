# stage 1 building
FROM node:16-alpine AS builder
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
RUN yarn install --production

COPY .env ./
RUN npx prisma generate

# Copy built files from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port and start application
EXPOSE ${PORT}
CMD ["yarn", "run", "start:prod"]
