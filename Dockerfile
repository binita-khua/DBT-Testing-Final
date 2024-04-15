FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install sqlite3 --save

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV development

CMD ["node", "dist/app.js"]
