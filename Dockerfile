FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update

RUN apk add build-base 

RUN apk add python

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]
