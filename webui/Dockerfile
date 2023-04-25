FROM --platform=linux/amd64 node:18-alpine as builder
# Set the working directory to /app
WORKDIR /app
# Copy package.json and package-lock.json to the container's working directory
COPY package.json yarn.lock ./
# Install app dependencies
RUN yarn install --frozen-lockfile
# Copy the rest of the application to the container's working directory
COPY . .
# Generates the Prisma Client
RUN npx prisma generate
RUN yarn build

FROM --platform=linux/amd64 node:18-alpine as runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/next.config.cjs .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/ ./.next

# Set environment variables for the Prisma database connection
ENV DATABASE_URL "mysql://remote:test1234@172.20.0.11:3306/project?schema=public"
