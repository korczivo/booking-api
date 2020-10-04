import { body } from 'express-validator';

export const createRoomValid = [
  body('name')
    .isLength({ min: 5 })
    .escape()
    .trim(),
  body('type')
    .isLength({ min: 5 })
    .escape()
    .trim(),
  body('size')
    .isLength({ min: 1 })
    .isInt()
    .escape(),
  body('capacity')
    .isLength({ min: 1 })
    .isInt()
    .escape(),
  body('pets')
    .isBoolean(),
  body('breakfast')
    .isBoolean(),
  body('description')
    .isLength({ min: 10 })
    .escape(),
];
