# fullstory-proxy

Allows the use of fullstory when it's normally blocked

`docker run -p 443:5555 -e PROXY_DOMAIN=myapp.com -e S3_BUCKET=encrypted-please fijimunkii/fullstory-proxy:latest`
