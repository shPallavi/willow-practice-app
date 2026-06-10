FROM node:20-alpine

WORKDIR /app

# install pnpm first
RUN npm install -g pnpm

# copy only dependency files first (IMPORTANT for caching)
COPY package.json pnpm-lock.yaml ./

# install dependencies
RUN pnpm install --frozen-lockfile

# copy Prisma schema
COPY prisma ./prisma

# generate Prisma client
RUN npx prisma generate

# now copy rest of code
COPY . .

# build NestJS
RUN pnpm build

ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/main.js"]