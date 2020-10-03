import {
  createCommentService,
  deleteCommentService,
  updateCommentService,
} from '../services/commentsServices';

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

  const {
    response,
    status,
  } = await createCommentService({
    content,
    room_id,
    user_id,
  });

  return res.status(status).send(response);
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} deleted comment
 * */

const deleteComment = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  const {
    user_id,
  } = req.user;

  const {
    commentOwnerId,
  } = req.body;

  const {
    response,
    status,
  } = await deleteCommentService({
    commentOwnerId,
    id,
    user_id,
  });

  return res.status(status).send(response);
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} updated comment
 * */

const updateComment = async ({
  params,
  user,
  body,
}, res) => {
  const {
    id,
  } = params;

  const {
    user_id,
  } = user;

  const {
    content,
    commentOwnerId,
  } = body;

  const {
    response,
    status,
  } = await updateCommentService({
    commentOwnerId,
    content,
    id,
    user_id,
  });

  return res.status(status).send(response);
};

export {
  createComment,
  deleteComment,
  updateComment,
};
