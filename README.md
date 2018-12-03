Proxy server for fullstory!

Note: domain must be routed for letsencrypt
TODO: check first

```
sudo service docker start 2>/dev/null
sudo service docker restart
docker stop $(docker ps -a -q) 2>/dev/null
docker rm -f $(docker ps -a -q) 2>/dev/null
docker images -q | xargs docker rmi 2>/dev/null
docker run -d \
  -p 80:80 \
  -p 443:443 \
  -e PORT=443 \
  -e EMAIL=fijimunkii@gmail.com \
  -e DOMAIN=fs.myapp.com \
  --name fullstory-proxy \
  fijimunkii/fullstory-proxy:latest
```
