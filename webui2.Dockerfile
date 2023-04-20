FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app
# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

FROM base as build
RUN export NODE_ENV=production
RUN npm i

COPY . .
RUN npx prisma generate
RUN npm run build