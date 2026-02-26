# Stage 1: Build (optional for future apps)
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# (Optional) If you had build tools like React/Vite
# RUN npm install && npm run build

# Stage 2: Production (NGINX)
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy only required files from builder
COPY --from=builder /app /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
