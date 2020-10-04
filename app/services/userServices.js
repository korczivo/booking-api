import dbQuery from '../db/dev/dbQuery';

import {
  errorMessage,
  status,
} from '../helpers/status';

export const createUserServices = async user => {
  const createUserQuery = `INSERT INTO
      users(email, first_name, last_name, password)
      VALUES($1, $2, $3, $4)
      returning *`;

  try {
    const { rows } = await dbQuery.query(createUserQuery, user);
    const dbResponse = rows[0];

    delete dbResponse.password;
    delete dbResponse.id;

    return {
      response: {
        data: dbResponse,
      },
      status: status.created,
    };
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'User with that email already exist.';

      return {
        response: errorMessage,
        status: status.conflict,
      };
    }
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};
