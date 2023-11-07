ARG REGISTRY
FROM ${REGISTRY}node:16.11.1

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . ./

CMD ["npm", "start"]

EXPOSE 8080
