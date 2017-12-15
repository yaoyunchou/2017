FROM node:latest
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN  npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install && mv node_modules ../

COPY . .
RUN cnpm install -g babel babel-cli && npm run build
EXPOSE 8090
CMD npm start