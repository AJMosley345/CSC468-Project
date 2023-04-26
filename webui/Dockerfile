FROM node:18-alpine AS deps
# Set the working directory to /app
WORKDIR /app
# Copy package.json and package-lock.json to the container's working directory
COPY package.json yarn.lock ./
RUN yarn

FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generates the Prisma Client
RUN npx prisma generate
RUN yarn build

FROM node:18-alpine AS deploy

ENV NODE_ENV development

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
# Set environment variables for the Prisma database connection
ENV DATABASE_URL "mysql://remote:test1234@172.20.0.11:3306/project?schema=public"
