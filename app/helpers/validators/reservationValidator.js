import { body } from 'express-validator';

export const createReservationValid = [
  body('room_id')
    .isLength({ min: 1 })
    .withMessage('You must provide room id')
    .escape()
    .isInt(),
  body('room_id')
    .isLength({ min: 1 })
    .withMessage('You must provide user id')
    .escape()
    .isInt(),
  body('booking_start')
    .isLength({ min: 1 })
    .withMessage('You must provide start date.')
    .escape()
    .isDate(),
  body('booking_end')
    .isLength({ min: 1 })
    .withMessage('You must provide end date.')
    .escape()
    .isDate(),
];
