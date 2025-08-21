FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

# Generate Prisma client
RUN npm run db:generate

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm i --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/generated ./dist/generated

EXPOSE 3000 4000 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { \
    process.exit(res.statusCode === 200 ? 0 : 1) \
  }).on('error', () => process.exit(1))"

CMD ["npm", "start"]