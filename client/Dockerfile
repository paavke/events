# Dockerfile for Frontend

# Build stage
FROM node:16 as build

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the app
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy the built files to Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
