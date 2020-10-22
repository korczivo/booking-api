import {
  createReservationService,
  getReservationService,
} from '../services/reservationServices/reservationServices';

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
  } = req.body;

  const { user_id } = req.user;

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

/**
 * @param {object} req
 * @param {object} res
 * @param {array} reservation obj
 * */

const getReservation = async (req, res) => {
  const { id } = req.params;

  const {
    response,
    status,
  } = await getReservationService(id);

  return res.status(status).send(response);
};

export {
  createReservation,
  getReservation,
};
