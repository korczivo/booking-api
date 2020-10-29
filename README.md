# Booking API

Booking API using Node, Express, and Postgres. What features API provide? 
* CRUD for room object
* comments for rooms with management by owner
* custom user authentication
* room reservation with specific period 
* payment process with Stripe

## Requirements

* Node 10
* Postgres 12.4

## Installation

First of all, you have to install each of the required packages.

```bash
yarn install
```

## How to run

Run migrations for setup database.

```node
yarn start create-dev-tables
```

Run server

```node
yarn start
```

## How to test

For test API you can use [Postman](https://www.postman.com/), just download collection from link bellow then import.
* [JSON collection](./docs/collection.json)

## Database schema
![Database schema](./img/db.png)

## License
[MIT](https://choosealicense.com/licenses/mit/)
