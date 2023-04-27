#!/bin/sh
set -x
cd /app
sleep 10
npx prisma generate
npx prisma migrate dev
npx prisma db seed 
yarn run dev