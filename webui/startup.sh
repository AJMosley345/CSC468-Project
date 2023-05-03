#!/bin/sh
set -x
cd /app
sleep 10
export DATABASE_URL="mysql://root:test1234@localhost:3306/project?schema=public"
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
yarn run dev