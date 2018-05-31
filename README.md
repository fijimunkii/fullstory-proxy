# fullstory-proxy

Allows the use of fullstory when it's normally blocked

Note: needs two instances for now
`docker run -p 443:5555 -e PROXY_DOMAIN=fullstory-proxy.myapp.com -e S3_BUCKET=encrypted-please fijimunkii/fullstory-proxy:latest`
`docker run -p 443:5555 -e PROXY_DOMAIN=rs.fullstory-proxy.myapp.com -e PROXY_TARGET=rs.fullstory.com -e S3_BUCKET=encrypted-please fijimunkii/fullstory-proxy:latest`
