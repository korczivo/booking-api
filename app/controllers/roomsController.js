import dbQuery from '../db/dev/dbQuery';

import {
  errorMessage,
  status, successMessage,
} from '../helpers/status';

import { slugifyName } from '../helpers/common';

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

export {
  createRoom,
};
