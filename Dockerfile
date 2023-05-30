ARG NODE_VERSION=16
ARG SERVER_PORT=3001

FROM node:${NODE_VERSION}-buster as base

WORKDIR /app

FROM base as builder

COPY package.json yarn.lock
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap
RUN yarn build

FROM node:$NODE_VERSION-buster-slim as production

RUN apt-get update && apt-get install -y curl
CMD /bin/bash

WORKDIR /app

COPY --from=builder /app/packages/client/dist /app/packages/client/dist
COPY --from=builder /app/packages/client/dist-ssr /app/packages/client/dist-ssr
COPY --from=builder /app/packages/server/dist /app/packages/server/dist

COPY --from=builder /app/packages/server/package.json /app/packages/server/package.json
COPY --from=builder /app/packages/client/package.json /app/packages/client/package.json

COPY --from=builder /app/package.json /app/package.json

RUN yarn install --production=true

EXPOSE ${SERVER_PORT}
CMD [ "node", "/app/packages/server/dist/index.js" ]