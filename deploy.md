# Deploy on OpenShift

## Front-end
Using the Dockerfile from [Building Rootless Containers in JavaScript](https://github.com/nodeshift-blog-examples/frontend-containers/blob/main/rootless.md), you can create a container to be published on OpenShift

```
cd front
curl https://raw.githubusercontent.com/nodeshift-blog-examples/frontend-containers/main/react-project/Dockerfile.rootless -o Dockerfile
curl https://raw.githubusercontent.com/nodeshift-blog-examples/frontend-containers/main/react-project/start-nginx.sh -o start-nginx.sh
curl https://raw.githubusercontent.com/nodeshift-blog-examples/frontend-containers/main/react-project/nginx.conf -o nginx.conf
echo "node_modules" > .dockerignore
docker build -t urlshortener-front . --format docker
docker push nodeshift/urlshortener-front
```

Or directly use my image

oc new-app nodeshift/urlshortener-front
```

** Note, you might need to add a secret:
```
oc create secret docker-registry docker --docker-server=docker.io --docker-username=nodeshift --docker-password=<password> --docker-email=joelphy@gmail.com
oc secrets link default docker --for=pull
oc new-app nodeshift/urlshortener-front --source-secret=docker
```

Then expose the app
```
oc expose svc/urlshortener-front --port=8080
```

## Back-end

```
oc new-app registry.access.redhat.com/ubi8/nodejs-14~https://github.com/nodeshift-blog-examples/urlshortener --context-dir=back
oc expose svc/urlshortener
```

## Database

From the UI, deploy a Mongo DB (ephemeral) with the following configuration

Database Service Name: mongo
MongoDB Connection Username: shorties
MongoDB Connection Password: shorties
MongoDB Database Name: shorties
MongoDB Database Name: urls
MongoDB Admin Password: shorties
Version: 3.6

Configure all the services:

```
oc set env deployment/urlshortener PORT=8080 MONGO_USER=shorties MONGO_PASSWORD=shorties MONBGO_SERVER=mongo MONGO_VERSION=3.6

oc set env deployment/urlshortener-front BASE_URL=http://$(oc get route urlshortener | awk 'NR>1 {print $2}')
```

## Redirector

Create a new application from Container Image in topology

Change the port on the Route

Set environment variables
```
oc set env deployment/urlshortener-redirector MONGO_USER=shorties MONGO_PASSWORD=shorties MONGO_SERVER=mongo MONGO_VERSION=3.6
```

## Add new env var to front

```
oc set env deployment/urlshortener-front REDIRECTOR_URL=http://$(oc get route urlshortener-redirector | awk 'NR>1 {print $2}')
```
