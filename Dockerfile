FROM node:10.2.1

MAINTAINER Harrison Powers, harrisonpowers@gmail.com

RUN npm i -g pm2

# Deps for certificate TODO letsencrypt
RUN apt-get update && apt-get install -qq -y curl python-pip libpython-dev libnss3-tools \
  && curl -O https://bootstrap.pypa.io/get-pip.py && python get-pip.py \
  && pip install -q awscli --upgrade

ADD . /root/

WORKDIR /root

RUN cd proxy-server && npm i

CMD bash proxy-server/sync_cert.sh \
  && pm2 start proxy-server/index.js --name proxy-server --wait-ready --no-daemon
