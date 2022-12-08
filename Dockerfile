FROM node:16.15-alpine as base

FROM base as build
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY . ./

RUN yarn --frozen-lockfile
RUN yarn build

FROM base as production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist/src/ ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist/prisma/seed ./prisma/seed
COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile --production
RUN yarn prisma generate

EXPOSE 8080

COPY --chown=node:node . ./
USER node

CMD ["node", "index.js"]
