FROM node:13.14.0

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install -qy

COPY . .

CMD ["npm", "run", "start"]