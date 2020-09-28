import dbQuery from '../db/dev/dbQuery';
import {
  errorMessage,
  status, successMessage,
} from '../helpers/status';

/**
 * @param {object} req
 * @param {object} res
 * @param {object} created comment
 * */

const createComment = async (req, res) => {
  const {
    room_id,
    content,
  } = req.body;

  const {
    user_id,
  } = req.user;

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

    return res.status(status.created).send(rows[0]);
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

const deleteComment = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  const {
    user_id,
  } = req.user;

  const getCommentQuery = 'SELECT * FROM comments WHERE id=$1';
  const deleteCommentQuery = 'DELETE FROM comments WHERE id=$1 returning *';

  try {
    const { rows } = await dbQuery.query(getCommentQuery, [id]);
    const getComment = rows[0];

    if (!getComment) {
      errorMessage.error = 'Comment does not exist.';

      return res.status(status.notfound).send(errorMessage);
    }

    if (user_id === getComment.user_id) {
      const { rows: deletedItem } = await dbQuery.query(deleteCommentQuery, [id]);
      const dbResponse = deletedItem[0];

      successMessage.data = dbResponse;

      return res.status(status.success).send(successMessage);
    }

    errorMessage.error = 'You are not owner this comment!';

    return res.status(status.bad).send(errorMessage);
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

export {
  createComment,
  deleteComment,
};
