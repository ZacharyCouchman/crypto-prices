FROM node:lts-alpine AS production

# Create app directory, this is in our image/container
WORKDIR /zach/src/app

# Copy package.json and package-lock.json files before installing deps
COPY package*.json ./
COPY tsconfig*.json ./

# install dependencies from npm
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
ENV NODE_ENV production

CMD ["npm", "run", "start:prod"]