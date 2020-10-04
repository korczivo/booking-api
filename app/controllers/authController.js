import { validationResult } from 'express-validator';

import { loginService } from '../services/authServices';

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} token object
 * */

const login = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    response,
    status,
  } = await loginService(email, password);

  return res.status(status).send(response);
};

export { login };
