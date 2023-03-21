FROM node:18

# Creates app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install
# Run once it is production ready
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port 8080
EXPOSE 8080

# Runs the server.js file
CMD [ "node", "server.js" ]