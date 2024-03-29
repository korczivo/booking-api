import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 * CREATE TABLE test
 (id SERIAL PRIMARY KEY,
 name VARCHAR(100) UNIQUE NOT NULL,
 phone VARCHAR(100));
 */
const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on timestamp default current_timestamp)`;

  pool.query(userCreateQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const createRoomTable = () => {
  const roomCreateQuery = `create table rooms
  (
    id serial not null constraint rooms_pk primary key,
    name        varchar(50) not null UNIQUE,
    type        varchar,
    price       integer,
    size        integer,
    capacity    integer,
    pets        boolean,
    breakfast   boolean,
    description varchar,
    slug        varchar     not null
)`;

  pool.query(roomCreateQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const createCommentTable = () => {
  const commentsCreateQuery = `create table comments
(
    id serial not null
        constraint comment_pk
            primary key,
    user_id integer
        constraint fk_user
            references users,
    room_id integer
        constraint fk_room
            references rooms,
    content    varchar(255),
    created_on timestamp default CURRENT_TIMESTAMP
);`;

  pool.query(commentsCreateQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const createReservationTable = () => {
  const commentsCreateQuery = `create table reservations
(
    id                serial not null
        constraint reservation_pk
            primary key,
    user_id           integer
        constraint fk_user
            references users,
    room_id           integer
        constraint fk_room
            references rooms,
    booking_start     date   not null,
    booking_end       date   not null,
    status            varchar,
    paid              boolean   default false,
    created_on        timestamp default CURRENT_TIMESTAMP,
    reservation_price integer
);`;

  pool.query(commentsCreateQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createRoomTable();
  createCommentTable();
  createReservationTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  console.log('drop all tables');
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');
