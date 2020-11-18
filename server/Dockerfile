FROM node:15.2.1-alpine3.10 as build

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN apk update && apk add bash && npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]