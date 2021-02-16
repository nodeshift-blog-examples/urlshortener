# URL Shorties
This is a demo application with multiple microservices that can be deployed on a cluster such as the [OpenShift Developer Sandbox](https://developers.redhat.com/developer-sandbox). Instructions for deployment can be found in [deploy.md](deploy.md).

## Usage
To start the development environment with hot-reloads enabled.

```
git clone https://github.com/joellord/urlshortener.git
cd urlshortener
docker-compose up
```

If using podman, you can start the services with

```
podman-compose up
```

NOTE: On the first start, this process might take a few minutes.

### Restarts
If you edit any of the `Dockerfile` or `docker-compose.yaml` files, you might need to rebuild the images.

```
podman-compose up --build --force-recreate
```

## Services
Once all the services are started, you should be able to access the UI at [http://localhost:3000](http://localhost:3000).

### Front-end
This is a react application. From the docker-compose, it runs in development mode with the hot-reload webpack server.
The front-end can be accessed at [http://localhost:3000](http://localhost:3000).

### Backend
The Node.js back-end service is built with `express-generator` and interacts with the MongoDB. There is a [health route](http://localhost:8888/health) that can be accessed to verify if the server is up and connected to the database.

### Database
This application uses a Mongo database. It uses the base image from Docker Hub. 
Also installed by compose is Mongo-Express, a UI to manage your MongoDB instance. It can be accessed [here](http://localhost:8081).

### Redirector
Once you've created some URL shorteners with the UI, you will be able to use the redirection service. At the moment, it uses PHP image with the Apache variant. You can test the server with the [/health route](http://localhost:8080/health).

### TL;DR
* UI: http://localhost:3000
* API: http://localhost:8888/health
* DB: http://localhost:8081
* Redirector: http://localhost:8080/health
