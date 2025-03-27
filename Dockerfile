FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production image
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Add non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
