FROM node:10.2.1

MAINTAINER Harrison Powers, harrisonpowers@gmail.com

RUN npm i -g pm2

RUN echo "deb http://ftp.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/backports.list \
 && apt-get update \
 && apt-get install -y certbot -t jessie-backports

ADD . /root/

WORKDIR /root

RUN npm i

CMD bash certbot.sh \
  && pm2 start index.js --name fullstory-proxy --wait-ready --no-daemon
