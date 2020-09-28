import dbQuery from '../db/dev/dbQuery';
import {
  errorMessage,
  status,
} from './status';

const getCommentQuery = 'SELECT * FROM comments WHERE id=$1';

export const isCommentExists = async (req, res, next) => {
  const {
    params: {
      id,
    },
  } = req;

  const { rows } = await dbQuery.query(getCommentQuery, [id]);
  const getComment = rows[0];

  errorMessage.error = 'Comment does not exists.';

  if (!getComment) {
    return res.status(status.bad).send(errorMessage);
  }

  req.body.commentOwnerId = getComment.user_id;

  next();
};
