FROM node:16.19.0 AS build
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev", "--host"]
