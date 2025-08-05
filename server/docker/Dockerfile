FROM node:22

COPY .  ./app
WORKDIR /app
RUN npm install
RUN cp .env.example .env
RUN npm run server-prod