#!/bin/sh
set -x
sleep 10 
npx prisma db push 
npx prisma db seed 
yarn run dev