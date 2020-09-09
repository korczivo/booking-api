import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {errorMessage, status} from "../helpers/status";

import env from "../../env";

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
      email: decoded.email,
      user_id: decoded.user_id,
    }

    next();
  }
  catch (e) {
    errorMessage.error = 'Authorization failed.';
    return res.status(status.unauthorized).send(errorMessage);

  }
}

export { verifyToken }
