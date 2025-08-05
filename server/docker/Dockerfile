FROM node:22

COPY .  ./app
WORKDIR /app
RUN npm install
RUN echo "SERVER_TICK_RATE=60" >> .env
RUN echo "SERVER_PORT=80" >> .env
CMD npm run server-prod