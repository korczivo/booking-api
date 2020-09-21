import dbQuery from '../db/dev/dbQuery';

import {
  errorMessage,
  status,
  successMessage,
} from '../helpers/status';

import { slugifyName } from '../helpers/common';

/**
 * @param {object} req
 * @param {object} res
 * @param {array} array of rooms
 * */

const getRooms = async (req, res) => {
  const getRoomsQuery = 'SELECT * FROM ROOMS';

  try {
    const { rows } = await dbQuery.query(getRoomsQuery);

    return res.status(status.success).send(rows);
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

const getRoom = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  const getRoomQuery = 'SELECT * FROM rooms WHERE id=$1';

  try {
    const { rows } = await dbQuery.query(getRoomQuery, [id]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'Room does not exist.';

      return res.status(status.notfound).send(errorMessage);
    }

    return res.status(status.success).send(dbResponse);
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} created room
 * */

const createRoom = async (req, res) => {
  const {
    name,
    type,
    price,
    size,
    capacity,
    pets,
    breakfast,
    description,
  } = req.body;

  const slug = slugifyName(name);

  const createRoomQuery = `INSERT INTO
  rooms(name, type, price, size, capacity, pets, breakfast, description, slug)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *`;

  const values = [
    name,
    type,
    price,
    size,
    capacity,
    pets,
    breakfast,
    description,
    slug,
  ];

  try {
    const { rows } = await dbQuery.query(createRoomQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;

    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Room with that name already exist.';

      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

/**
 * @param {object} req
 * @param {object} res
 * */

const deleteRoom = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  const getRoomQuery = 'SELECT * FROM rooms WHERE id=$1';
  const deleteRoomQuery = 'DELETE FROM rooms WHERE id=$1';

  try {
    const { rows } = await dbQuery.query(getRoomQuery, [id]);
    const findRoom = rows[0];

    if (!findRoom) {
      errorMessage.error = 'Room does not exist.';

      return res.status(status.notfound).send(errorMessage);
    }

    await dbQuery.query(deleteRoomQuery, [id]);

    return res.status(status.success).send(successMessage);
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

export {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
};
