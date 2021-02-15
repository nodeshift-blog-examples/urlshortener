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

** Note, you might need to add a secret:
```
oc create secret docker-registry docker --docker-server=docker.io --docker-username=joellord --docker-password=<password> --docker-email=joelphy@gmail.com
oc secrets link default docker --for=pull
oc new-app joellord/urlshortener-front --source-secret=docker
```

Then expose the app
```
oc expose svc/urlshortener-front --port=8080
```

## Back-end

```
oc new-app quay.io/centos7/nodejs-12-centos7~https://github.com/joellord/urlshortener.git --context-dir=back
oc set env deployment/urlshortener PORT=8080
oc expose svc/urlshortener
```

## Database

From the UI, deploy a Mongo DB (ephemeral) with the following configuration


Configure all the services:

```
oc set env deployment/urlshortener PORT=8080
oc set env deployment/urlshortener MONGO_USER=root
oc set env deployment/urlshortener MONGO_PASSWORD=shorties
oc set env deployment/urlshortener MONGO_SERVER=mongo
oc set env deployment/urlshortener MONGO_VERSION=3.6

➜ oc set env deployment/urlshortener-front BASE_URL=http://$(oc get route urlshortener | awk 'NR>1 {print $2}')
oc set env deployment/urlshortener-front REDIRECTOR_URL=http://localhost:8888


```

## Redirector

???

## Set environment variables