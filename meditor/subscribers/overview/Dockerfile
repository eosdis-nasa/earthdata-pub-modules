# Build the base image.
ARG REGISTRY
FROM ${REGISTRY}node:16.11.1 AS build
WORKDIR /tmp
COPY package*.json ./
RUN npm ci --only-production
COPY . .
RUN npm run build

# Build the production image.
FROM ${REGISTRY}node:16.11.1
# https://github.com/Yelp/dumb-init
RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_amd64.deb
RUN dpkg -i dumb-init_*.deb
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /tmp/package.json ./
COPY --chown=node:node --from=build /tmp/node_modules ./node_modules
COPY --chown=node:node --from=build /tmp/dist ./
EXPOSE 8080
CMD ["dumb-init", "npm", "run", "start:ci"]
