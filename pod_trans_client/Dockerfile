FROM node

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 5050

CMD ["npm", "start"] 