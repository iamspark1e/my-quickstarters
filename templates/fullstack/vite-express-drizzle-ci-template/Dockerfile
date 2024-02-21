# build
FROM node:lts-alpine AS builder
WORKDIR /tmp/app
COPY ./package.json .
RUN npm install --no-audit
COPY . /tmp/app
RUN npm run web:build

# node.js run
FROM node:lts-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json .
ARG NODE_ENV=production
RUN npm install --no-audit --omit=dev
COPY . .
COPY --from=builder /tmp/app/dist /opt/app/dist
EXPOSE 38081
CMD [ "npm", "start"]