import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  errorMessage, status,
} from '../helpers/status';
import dbQuery from '../db/dev/dbQuery';

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    errorMessage.error = 'None token provided.';

    return res.status(status.bad).send(errorMessage);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = {
      user_id: decoded.user_id,
    };

    next();
  } catch (e) {
    errorMessage.error = 'Authorization failed.';

    return res.status(status.unauthorized).send(errorMessage);
  }
};

const setUser = async (req, res, next) => {
  const { user_id } = req.user;

  const findUserQuery = 'SELECT id FROM users WHERE id=$1';

  const values = [user_id];

  if (user_id) {
    const { rows } = await dbQuery.query(findUserQuery, values);

    req.user = {
      user_id: rows[0].id,
    };
  }
  next();
};

export {
  setUser,
  verifyToken,
};
