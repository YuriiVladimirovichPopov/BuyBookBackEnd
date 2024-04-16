FROM node:21.6.1

WORKDIR  /app

COPY package*.json ./

RUN yarn add \
    @nestjs/common@^10.0.0 \
    @nestjs/config@^3.2.2 \
    @nestjs/core@^10.0.0 \
    @nestjs/platform-express@^10.0.0 \
    @nestjs/swagger@^7.3.1 \
    @types/sequelize@^4.28.20 \
    class-transformer@^0.5.1 \
    class-validator@^0.14.1 \
    cross-env@^7.0.3 \
    pg@^8.11.5 \
    pg-hstore@^2.3.4 \
    reflect-metadata@^0.2.0 \
    rxjs@^7.8.1 \
    sequelize@^6.37.2 \
    sequelize-typescript@^2.1.6

COPY . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]