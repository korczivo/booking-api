import dbQuery from '../db/dev/dbQuery';
import {
  errorMessage,
  status,
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
    const { rows } = dbQuery.query(createCommentQuery, values);

    return res.status(status.created).send(rows);
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return res.status(status.error).send(errorMessage);
  }
};

const deleteComment = async (req, res) => {
  const {
    id,
  } = req.body;

  const {
    user_id,
  } = req.user;

  const deleteCommentQuery = 'DELETE FROM comments WHERE id=$1';

  const values = [
    id,
  ];

  try {

  } catch (e) {
    console.log(e);
  }
};

export {
  createComment,
};
