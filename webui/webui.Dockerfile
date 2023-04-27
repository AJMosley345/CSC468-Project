FROM node:18-alpine AS base
WORKDIR /app

COPY package.json yarn.lock ./

FROM base as build
RUN export NODE_ENV=production
RUN yarn

COPY . .
RUN npx prisma generate
ENV NEXT_PRIVATE_STANDALONE true
RUN yarn build

FROM base as prod-build

RUN yarn install --production
COPY prisma prisma
RUN npx prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/yarn.lock .
# Set environment variables for the Prisma database connection
#ENV DATABASE_URL "mysql://remote:test1234@mysql-:3306/project?schema=public"
