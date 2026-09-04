# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Defaults: talk to Apiman + Keycloak on the host ports published by compose
ARG REACT_APP_API_BASE_URL=http://localhost:8080
ARG REACT_APP_AUTH_BASE_URL=http://localhost:8180
ARG REACT_APP_KEYCLOAK_REALM=danilo_eventure
ARG REACT_APP_KEYCLOAK_CLIENT_ID=eventure-app
ARG REACT_APP_APIMAN_API_KEY=dd4c8216-cfb7-4629-aad3-bb3da1a4c4ec

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL \
    REACT_APP_AUTH_BASE_URL=$REACT_APP_AUTH_BASE_URL \
    REACT_APP_KEYCLOAK_REALM=$REACT_APP_KEYCLOAK_REALM \
    REACT_APP_KEYCLOAK_CLIENT_ID=$REACT_APP_KEYCLOAK_CLIENT_ID \
    REACT_APP_APIMAN_API_KEY=$REACT_APP_APIMAN_API_KEY

RUN npm run build

# SPA + reverse proxy to Apiman / WebSocket
FROM nginx:alpine

COPY proxy_params.conf /etc/nginx/proxy_params.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
