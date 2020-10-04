import { body } from 'express-validator';

export const userValidSchema = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .escape()
    .isLength({ min: 5 })
    .withMessage('Email must be min. 5 chars long.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be min. 8 chars long.')
    .escape(),
  body('first_name')
    .isLength({ min: 5 })
    .withMessage('Name must be min. 5 chars long.')
    .escape(),
  body('first_name')
    .isLength({ min: 5 })
    .withMessage('Name must be min. 5 chars long.')
    .escape(),
];
