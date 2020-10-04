import { body } from 'express-validator';

export const createCommentValid = [
  body('content')
    .isLength({ min: 3 })
    .withMessage('Comment must be min. 3 chars long.')
    .escape(),
  body('room_id')
    .isInt()
    .isLength({ min: 1 })
    .withMessage('Room id is required.'),
];

export const updateCommentValid = [
  body('content')
    .isLength({ min: 3 })
    .withMessage('Comment must be min. 3 chars long.')
    .escape(),
];
