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

# Set environment variables for the Prisma database connection
ENV DATABASE_URL "mysql://remote:test1234@db-service:3306/project?schema=public"
