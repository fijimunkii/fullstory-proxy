FROM node:10.2.1

MAINTAINER Harrison Powers, harrisonpowers@gmail.com

RUN npm i -g pm2

RUN echo "deb http://ftp.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/backports.list \
 && apt-get update \
 && apt-get install -y certbot -t jessie-backports

ADD . /root/

WORKDIR /root

RUN cd proxy-server && npm i

CMD bash proxy-server/sync_cert.sh \
  && pm2 start proxy-server/index.js --name proxy-server --wait-ready --no-daemon
