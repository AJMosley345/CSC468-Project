FROM node:18

# Creates app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY . .

RUN npm install
RUN npx prisma generate
# Run once it is production ready
# RUN npm ci --only=production
EXPOSE 3000

# Runs the server.js file
CMD [ "npm", "run", "dev" ]