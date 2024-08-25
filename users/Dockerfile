FROM node:lts

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest
RUN npm install -g typescript
RUN pnpm install
RUN tsc

EXPOSE 8001

CMD [ "pnpm", "start" ]
