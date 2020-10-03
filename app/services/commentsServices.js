import dbQuery from '../db/dev/dbQuery';
import {
  errorMessage, status, successMessage,
} from '../helpers/status';

export const createCommentService = async ({
  user_id,
  room_id,
  content,
}) => {
  const createCommentQuery = `INSERT INTO
  comments(user_id, room_id, content)
  VALUES($1, $2, $3)
  returning *`;

  const values = [
    user_id,
    room_id,
    content,
  ];

  try {
    const { rows } = await dbQuery.query(createCommentQuery, values);

    return {
      response: {
        data: rows[0],
      },
      status: status.created,
    };
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};

export const deleteCommentService = async ({
  id,
  user_id,
  commentOwnerId,
}) => {
  const deleteCommentQuery = 'DELETE FROM comments WHERE id=$1 returning *';

  try {
    if (user_id === commentOwnerId) {
      const { rows: deletedItem } = await dbQuery.query(deleteCommentQuery, [id]);
      const dbResponse = deletedItem[0];

      successMessage.data = dbResponse;

      return {
        response: successMessage,
        status: status.success,
      };
    }

    errorMessage.error = 'You are not owner this comment!';

    return {
      response: errorMessage,
      status: status.bad,
    };
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};

export const updateCommentService = async ({
  id,
  user_id,
  content,
  commentOwnerId,
}) => {
  const updateCommentQuery = `UPDATE comments SET content = $1 WHERE id = ${id} returning *`;

  try {
    if (user_id === commentOwnerId) {
      const { rows } = await dbQuery.query(updateCommentQuery, [content]);
      const dbResponse = rows[0];

      return {
        response: dbResponse,
        status: status.success,
      };
    }

    errorMessage.error = 'You are not owner this comment!';

    return {
      response: errorMessage,
      status: status.bad,
    };
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};
