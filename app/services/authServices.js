import dbQuery from '../db/dev/dbQuery';

import {
  errorMessage,
  status,
  successMessage,
} from '../helpers/status';

import {
  comparePassword,
  generateToken,
  isEmpty,
  isValidEmail,
  validatePassword,
} from '../helpers/validation';

export const loginService = async (email, password) => {
  const findUser = 'SELECT * FROM users WHERE email = $1';

  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Please enter required fields.';

    return {
      response: errorMessage,
      status: status.bad,
    };
  }

  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Email or password invalid.';

    return {
      response: errorMessage,
      status: status.bad,
    };
  }

  try {
    const { rows } = await dbQuery.query(findUser, [email]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist.';

      return {
        response: errorMessage,
        status: status.notfound,
      };
    }

    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';

      return {
        response: errorMessage,
        status: status.bad,
      };
    }

    const token = generateToken(dbResponse.id);

    delete dbResponse.password;

    successMessage.data = dbResponse;
    successMessage.data.token = token;

    return {
      response: successMessage,
      status: status.success,
    };
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};
