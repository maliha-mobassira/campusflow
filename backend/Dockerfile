# Use official Node.js LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install native dependencies required for sqlite3 compilation if needed
RUN apk add --no-cache python3 make g++

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy backend source code
COPY . .

# Expose backend REST API port
EXPOSE 5000

# Start Express server using the existing npm script
CMD ["npm", "start"]
