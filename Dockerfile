FROM node:15.5.1-alpine3.10

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

EXPOSE 8080 8080

COPY  . .

CMD ["node", "src/index.js"]