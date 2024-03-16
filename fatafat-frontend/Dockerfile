FROM node:20-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

EXPOSE 5174

RUN npm install global

COPY . .



CMD ["sh","-c","npm run start"]