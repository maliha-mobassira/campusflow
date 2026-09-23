# Stage 1: Build Vite React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all dependencies required for the build
RUN npm install

# Copy application source
COPY . .

# Build production bundle into /app/dist
RUN npm run build

# Stage 2: Serve production build using lightweight Nginx
FROM nginx:alpine

# Copy built production assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with /api proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Production frontend listens on port 80 inside container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
