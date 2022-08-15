FROM node:16-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY . ./
RUN npm ci
RUN npm run build
EXPOSE 4000
CMD [ "node", "dist/server.js" ]