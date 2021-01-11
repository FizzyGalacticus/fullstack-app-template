# <--------------STAGE--------------> template-fe
FROM mhart/alpine-node:14 as template-fe

RUN addgroup -g 10001 -S nonroot && adduser -u 10000 -S -G nonroot -h /home/nonroot nonroot

RUN apk add --no-cache tini bind-tools

# Create App directory
RUN mkdir -p /var/app
RUN chown -R nonroot:nonroot /var/app
WORKDIR /var/app

RUN npm i -g yarn

COPY package.json yarn.lock /var/app/

USER nonroot

# <--------------STAGE--------------> FE Development
FROM template-fe as fe-development

RUN yarn

ENTRYPOINT ["/sbin/tini", "--", "yarn"]

CMD ["dev"]
