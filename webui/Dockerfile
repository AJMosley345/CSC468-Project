# FROM node:18-alpine AS dependencies

# WORKDIR /app
# COPY package.json yarn.lock ./

# FROM node:18-alpine AS build

# WORKDIR /app
# COPY --from=dependencies /app/node_modules ./node_modules
# COPY . .

# RUN npx prisma generate
# RUN yarn build

# FROM node:18-alpine AS deploy

# WORKDIR /app

# ENV NODE_ENV production

# COPY --from=build /app/public ./public
# COPY --from=build /app/package.json ./package.json
# COPY --from=build /app/./next/standalone ./
# COPY --from=build /app/.next/static ./.next/static

# EXPOSE 3000
# ENV PORT 3000

# CMD ["node", "server.js"]

FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application to the container's working directory
COPY . .

# Generates the Prisma Client
RUN npx prisma generate

# Expose the port that the app listens on
EXPOSE 3000

# Set environment variables for the Prisma database connection
ENV DATABASE_URL "mysql://remote:test1234@172.20.0.11:3306/project?schema=public"

# RUN npx prisma migrate deploy
# RUN npx prisma db seed

# Start the app
CMD ["yarn", "run", "dev"]