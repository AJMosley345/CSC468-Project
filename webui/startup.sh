#!/bin/bash
set -x
cd /app
sleep 10
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
yarn run dev