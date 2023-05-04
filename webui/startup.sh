#!/bin/sh
set -x
cd /app
sleep 10
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
yarn build
yarn run dev