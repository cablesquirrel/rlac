# RealLifeAsCode.com

Personal website/blog for Eric Hansen

## Building the final image

```shell
docker build -t cablesquirrel/rlac:latest --progress=plain .
docker login docker.io
docker push cablesquirrel/rlac:latest
```
