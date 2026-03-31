FROM node:20-alpine

RUN apk add --no-cache git bash

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install
RUN npm install @angular/material @angular/cdk

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]