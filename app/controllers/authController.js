import dbQuery from '../db/dev/dbQuery';
import {
  comparePassword, generateToken, isEmpty, isValidEmail, validatePassword,
} from '../helpers/validation';
import {
  errorMessage, status, successMessage,
} from '../helpers/status';

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

  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Please enter required fields.';

    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Email or password invalid.';

    return res.status(status.bad).send(errorMessage);
  }

  const findUser = 'SELECT * FROM users WHERE email = $1';

  try {
    const { rows } = await dbQuery.query(findUser, [email]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist.';

      return res.status(status.notfound).send(errorMessage);
    }

    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';

      return res.status(status.bad).send(errorMessage);
    }

    const token = generateToken(dbResponse.id);

    delete dbResponse.password;

    successMessage.data = dbResponse;
    successMessage.data.token = token;

    return res.status(status.success).send(successMessage);
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

export { login };
