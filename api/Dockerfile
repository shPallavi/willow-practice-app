FROM node:20-alpine

WORKDIR /app

# install pnpm first
RUN npm install -g pnpm

# copy only dependency files first (IMPORTANT for caching)
COPY package.json pnpm-lock.yaml ./

# install dependencies
RUN pnpm install

# now copy rest of code
COPY . .

# build NestJS
RUN pnpm build

ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/main.js"]
