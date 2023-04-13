FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application to the container's working directory
COPY . .

# Generates the Prisma Client
RUN npx prisma generate

# Expose the port that the app listens on
EXPOSE 3001

# Set environment variables for the Prisma database connection
ENV DATABASE_URL "mysql://root:test1234@172.20.0.11:3306/project?schema=public"

# RUN npx prisma migrate deploy

# Start the app
CMD ["npm", "run", "dev"]