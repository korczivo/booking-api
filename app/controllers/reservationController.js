import { createReservationService } from '../services/reservationServices';

/**
 * @param {object} req
 * @param {object} res
 * @param {array} reservation obj
 * */

const createReservation = async (req, res) => {
  const {
    booking_end,
    booking_start,
    room_id,
    user_id,
  } = req.body;

  const {
    response,
    status,
  } = await createReservationService({
    booking_end,
    booking_start,
    room_id,
    user_id,
  });

  return res.status(status).send(response);
};

export {
  createReservation,
};
