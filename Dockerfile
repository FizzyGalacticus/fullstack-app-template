# <--------------STAGE--------------> qrfindr-be
FROM mhart/alpine-node:14 as qrfindr-be

# Create App directory
RUN mkdir -p /var/app
WORKDIR /var/app

RUN npm i -g yarn

COPY backend/package.json backend/yarn.lock /var/app/

# <--------------STAGE--------------> Deployment
FROM qrfindr-be as deployment

COPY backend/app /var/app/app

RUN yarn install --production=true

CMD ["yarn","start"]

# <--------------STAGE--------------> Development
FROM qrfindr-be as development

RUN npm i -g nodemon

COPY backend/app /var/app/app

RUN yarn

CMD ["nodemon", "start"]

# <--------------STAGE--------------> Development
FROM qrfindr-be as db-migrations

COPY backend/database /var/app/

RUN yarn

# <--------------STAGE--------------> Blank Postgres
FROM postgres:12-alpine as qrfindr-be-blank-db

ARG DB_USER=postgres
ARG DB_PASS=postgres
ARG DB_NAME=postgres

# Actually for pg
ENV POSTGRES_USER=${DB_USER}
ENV POSTGRES_PASSWORD=${DB_PASS}
ENV POSTGRES_DB=${DB_NAME}
