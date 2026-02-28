# -----------------------------
# Stage 1: Build (optional)
# -----------------------------
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# If you later use React/Vite:
# RUN npm install && npm run build


# -----------------------------
# Stage 2: Production (NGINX)
# -----------------------------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built/static files into nginx
COPY --from=builder /app /usr/share/nginx/html

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose BOTH ports
EXPOSE 80   # HTTP
EXPOSE 443  # HTTPS (NEW)

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
