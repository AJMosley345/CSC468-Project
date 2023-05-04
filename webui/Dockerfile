FROM node:18-alpine AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

FROM node:18-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

ENV NEXT_PRIVATE_STANDALONE true
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN yarn build

FROM node:18-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --chown=nextjs:nodejs --from=build /app/ ./

USER nextjs

EXPOSE 3000