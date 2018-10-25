FROM node:latest

MAINTAINER Enaho Murphy <<enahomurphy@gmail.com>>

COPY . /var/www
ADD . /var/www

WORKDIR /var/www

CMD ["npm", "install"]

CMD ["npm", "start"]

EXPOSE 8080
