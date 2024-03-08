FROM node:20-slim as base
ENV NODE_ENV production

# Add base files
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

ARG GIT_COMMIT=unspecified
ARG APP_VERSION

LABEL git_commit=$GIT_COMMIT

# Install all node_modules
FROM base as deps

RUN yarn install --immutable

# Install production dependencies
FROM base as production-deps
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
RUN yarn workspaces focus --production

# Build
FROM base as build
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

COPY . .
RUN yarn build

FROM base
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/db /app/db
COPY --from=build /app/package.json /app/package.json

CMD ["yarn", "start"]
