import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import env from "../../env";

/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  }
  return true;
};
/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  }
  return true;
};

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

/**
 * Generate token
 * @param {string} id
 * @param {string} email
 * @returns {string} token
 **/

const generateToken = (email, id) => {
  const token = jwt.sign({
      email,
      user_id: id,
    },
    env.secret, { expiresIn: '3d' });
  return token;
};

/**
 * Hash password method
 * @param {string} password
 * @returns {string} return hashed password
**/
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
 * Compare password method
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {string} return boolean
 **/

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export {
  comparePassword,
  generateToken,
  isEmpty,
  isValidEmail,
  empty,
  hashPassword,
  validatePassword,
};
