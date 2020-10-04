import dbQuery from '../db/dev/dbQuery';

import {
  errorMessage,
  status,
  successMessage,
} from '../helpers/status';

import {
  comparePassword,
  generateToken,
} from '../helpers/authHelper';

export const loginService = async (email, password) => {
  const findUser = 'SELECT * FROM users WHERE email = $1';

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
