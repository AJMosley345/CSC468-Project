FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package.json yarn.lock ./

# Copy the rest of the application to the container's working directory
COPY . .

EXPOSE 3000