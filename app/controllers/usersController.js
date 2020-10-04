import { validationResult } from 'express-validator';

import { hashPassword } from '../helpers/validation';

import { createUserServices } from '../services/userServices';

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 * */

const createUser = async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    password,
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const hashedPassword = hashPassword(password);

  const user = [
    email,
    first_name,
    last_name,
    hashedPassword,
  ];

  const {
    response,
    status,
  } = await createUserServices(user);

  return res.status(status).send(response);
};

export {
  createUser,
};
