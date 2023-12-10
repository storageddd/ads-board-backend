# Ads board backend
Implementation of CRUD operations on advertisements board with RESTful API design.

The service has full documentation by swagger and openapi specification.

## Installation

```bash
$ npm install
```

## Running the app
Before starting the app copy file `.env.example` to `.env`.
```bash
$ docker-compose up -d

# Preparing prisma
$ npm run prisma:generate
$ npm run prisma:migrate

# watch mode
$ npm run start:dev
```

## Usage
After starting the service open url bellow in the browser and find detailed API documentation.
```
https://localhost:3000/api/
```

Also, database available by following url and you can connect any client you like.
```
postgresql://root:root@localhost:5432/db
```
