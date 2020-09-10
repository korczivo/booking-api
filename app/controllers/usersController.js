import dbQuery from "../db/dev/dbQuery";

import {
  hashPassword,
  isEmpty,
  isValidEmail,
  validatePassword,
} from "../helpers/validation";

import {
  errorMessage,
  status,
} from "../helpers/status";

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
    password
  } = req.body;

  if (isEmpty(email) || isEmpty(first_name), isEmpty(last_name) || isEmpty(password)) {
    errorMessage.error = 'Please enter required fields.';
    return res.status(status.bad).send(errorMessage);
  }

  if(!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid email.';
    return res.status(status.bad).send(errorMessage);
  }

  if(!validatePassword(password)){
    errorMessage.error = 'Password must be more than 5 chars.';
    return res.status(status.bad).send(errorMessage);
  }

  const hashedPassword = hashPassword(password);

  const createUserQuery = `INSERT INTO
      users(email, first_name, last_name, password)
      VALUES($1, $2, $3, $4)
      returning *`;

  const values = [
    email,
    first_name,
    last_name,
    hashedPassword,
  ];

  try {
    await dbQuery.query(createUserQuery, values);
    return res.status(status.created).send('User created');
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'User with that email already exist.';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful.';
    return res.status(status.error).send(errorMessage);
  }
};

export {
  createUser,
}
