# Deploy on OpenShift

## Front-end
Using the Dockerfile from [Building Rootless Containers in JavaScript](https://github.com/joellord/frontend-containers/blob/main/rootless.md), you can create a container to be published on OpenShift

```
cd front
curl https://raw.githubusercontent.com/joellord/frontend-containers/main/react-project/Dockerfile.rootless -o Dockerfile
curl https://raw.githubusercontent.com/joellord/frontend-containers/main/react-project/start-nginx.sh -o start-nginx.sh
curl https://raw.githubusercontent.com/joellord/frontend-containers/main/react-project/nginx.conf -o nginx.conf
echo "node_modules" > .dockerignore
docker build -t urlshortener-front . --format docker
docker push urlshortener-front <docker_user>/urlshortener-front
```

Or directly use my image

oc new-app joellord/urlshortener-front
```

## Back-end

```
oc new-app ubi8/node12~https://github.com/joellord/urlshortener.git/back
```

## Database

From the UI, deploy a Mongo DB (ephemeral) with the following configuration

## Redirector

???

## Set environment variables