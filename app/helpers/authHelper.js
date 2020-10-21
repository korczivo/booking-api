import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import env from '../../env';

/**
 * Generate token
 * @param {string} id
 * @returns {string} token
 * */

const generateToken = id => {
  const token = jwt.sign({
    user_id: id,
  },
  env.bcrypt_secret, { expiresIn: '3d' });

  return token;
};

/**
 * Hash password method
 * @param {string} password
 * @returns {string} return hashed password
* */
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
 * Compare password method
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {string} return boolean
 * */

const comparePassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword);

export {
  comparePassword,
  generateToken,
  hashPassword,
};
