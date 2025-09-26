FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
