import dbQuery from '../../db/dev/dbQuery';

import {
  errorMessage,
  status,
} from '../../helpers/status';
import { countDays } from './countDays';
import { countReservationPrice } from './countReservationPrice';

export const createReservationService = async ({
  booking_end,
  booking_start,
  room_id,
  user_id,
}) => {
  const createReservationQuery = `INSERT INTO
  reservations(user_id, room_id, booking_start, booking_end, reservation_price)
  VALUES($1, $2, $3, $4, $5)
  returning *`;

  const isReservationExistsQuery = `SELECT * FROM
  reservations WHERE room_id = $1
  AND
  booking_start BETWEEN $2 AND $3 
  or 
  booking_end BETWEEN $2 AND $3`;

  const reservationPeriod = countDays({
    booking_end,
    booking_start,
  });

  const isReservationExist = [
    room_id,
    booking_start,
    booking_end,
  ];

  const { rows: reservations } = await dbQuery.query(isReservationExistsQuery, isReservationExist);

  try {
    if (reservations.length === 0) {
      const reservationPrice = await countReservationPrice({
        reservationPeriod,
        room_id,
      });

      const reservation = [
        user_id,
        room_id,
        booking_start,
        booking_end,
        reservationPrice,
      ];

      const { rows } = await dbQuery.query(createReservationQuery, reservation);
      const dbResponse = rows[0];

      return {
        response: dbResponse,
        status: status.created,
      };
    }
    errorMessage.error = 'Room is not available in this dates';

    return {
      response: errorMessage,
      status: status.created,
    };
  } catch (error) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.success,
    };
  }
};

export const getReservationService = async id => {
  const getReservationQuery = 'SELECT * FROM reservations WHERE id = $1';

  try {
    const { rows } = await dbQuery.query(getReservationQuery, [id]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'Reservation does not exists.';

      return {
        response: errorMessage,
        status: status.notfound,
      };
    }

    return {
      response: {
        data: dbResponse,
      },
      status: status.success,
    };
  } catch (error) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.success,
    };
  }
};

export const setReservationStatus = async id => {
  const getReservationQuery = 'SELECT * FROM reservations WHERE id = $1';
  const updateReservationQuery = 'UPDATE reservations SET paid = true WHERE id = $1 returning *';

  try {
    const { rows } = await dbQuery.query(getReservationQuery, [id]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'Reservation does not exists.';

      return {
        response: errorMessage,
        status: status.notfound,
      };
    }

    const { rows: reservationItem } = await dbQuery.query(updateReservationQuery, [id]);

    return {
      status: status.success,
    };
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.success,
    };
  }
};
