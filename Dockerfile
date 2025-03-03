# ##########################################
# Production Dockerfile
# ##########################################

# Stage 1: Build the Astro project
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY biome.json ./
COPY astro.config.ts ./
COPY ./src ./
COPY ./public ./
COPY ./package ./


# Install dependencies
RUN npm install -g npm@11.1.0
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Astro project
RUN npm run build

# Stage 2: Serve the static files
FROM nginx:alpine

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create necessary nginx directories and set permissions
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx

# Copy the built files from the builder stage (only the client folder)
COPY --from=builder /app/dist/client /usr/share/nginx/html

# Change ownership of the nginx html directory to the non-root user
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Ensure the files are readable by the non-root user
RUN chmod -R 755 /usr/share/nginx/html

# Switch to the non-root user
USER appuser

# Expose port 8080
EXPOSE 8080

COPY nginx.conf /etc/nginx/nginx.conf

# Start nginx with a custom PID file location
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf", "-p", "/tmp/nginx"]