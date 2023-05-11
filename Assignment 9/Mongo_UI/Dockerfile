FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN apk update && apk add curl

# Bundle app source
COPY . .

EXPOSE 8000

CMD [ "node", "Mongo_UI.js" ]