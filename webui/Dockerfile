FROM node:18-alpine AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

FROM node:18-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production
ENV NEXT_PRIVATE_STANDALONE true

RUN npx prisma generate
RUN yarn build

FROM node:18-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static