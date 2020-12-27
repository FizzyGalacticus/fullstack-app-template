# <--------------STAGE--------------> qrfindr-be
FROM mhart/alpine-node:14 as qrfindr-be

RUN addgroup -g 10001 -S nonroot && adduser -u 10000 -S -G nonroot -h /home/nonroot nonroot

RUN apk add --no-cache tini bind-tools

# Create App directory
RUN mkdir -p /var/app
RUN chown -R nonroot:nonroot /var/app
WORKDIR /var/app

RUN npm i -g yarn

COPY package.json yarn.lock /var/app/

USER nonroot

# <--------------STAGE--------------> BE Deployment
FROM qrfindr-be as be-deployment

COPY app /var/app/app

RUN yarn install --production=true

ENTRYPOINT ["/sbin/tini", "--", "yarn"]

CMD ["start"]

# <--------------STAGE--------------> BE Development
FROM qrfindr-be as be-development

RUN npm i -g nodemon

COPY app /var/app/app

RUN yarn

CMD ["npm", "run", "dev"]

# <--------------STAGE--------------> DB Migrations
FROM qrfindr-be as db-migrations

COPY database /var/app/

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
