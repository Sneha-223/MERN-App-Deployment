FROM node:13.14.0

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install -qyg nodemon@2.0.7
RUN npm install -qy

COPY . .

CMD ["npm", "run", "dev"]