FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . ./

RUN npm i -g pm2 && \
    npm ci && \
    npm run build

EXPOSE 4000
CMD [ "pm2-runtime", "pm2.config.js" ]