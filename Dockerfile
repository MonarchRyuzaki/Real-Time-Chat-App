FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm i --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 3000 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { \
    process.exit(res.statusCode === 200 ? 0 : 1) \
  }).on('error', () => process.exit(1))"

CMD ["npm", "start"]