#!/bin/sh
set -c 
sleep 10 
npx prisma db push 
npx prisma db seed 
yarn run dev