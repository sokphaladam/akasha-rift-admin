FROM node:14.19.0

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

HEALTHCHECK CMD curl --fail http://localhost || exit 1
EXPOSE 80
CMD [ "yarn", "serve" ]
