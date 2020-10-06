import {
  createRoomService,
  deleteRoomService,
  getRoomService,
  getRoomsService,
  updateRoomService,
} from '../services/roomsServices';

import { slugifyName } from '../helpers/common';

/**
 * @param {object} req
 * @param {object} res
 * @param {array} array of rooms
 * */

const getRooms = async (req, res) => {
  const {
    status,
    response,
  } = await getRoomsService();

  return res.status(status).send(response);
};

const getRoom = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  const {
    status,
    response,
  } = await getRoomService(id);

  return res.status(status).send(response);
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} created room
 * */

const createRoom = async (req, res) => {
  const {
    name,
    type,
    price,
    size,
    capacity,
    pets,
    breakfast,
    description,
  } = req.body;

  const slug = slugifyName(name);

  const room = [
    name,
    type,
    price,
    size,
    capacity,
    pets,
    breakfast,
    description,
    slug,
  ];

  const {
    response,
    status,
  } = await createRoomService(room);

  return res.status(status).send(response);
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} updated room
 * */

const updateRoom = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  const {
    response,
    status,
  } = await updateRoomService(id, req.body);

  return res.status(status).send(response);
};

/**
 * @param {object} req
 * @param {object} res
 * */

const deleteRoom = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  const {
    response,
    status,
  } = await deleteRoomService(id);

  return res.status(status).send(response);
};

export {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
};
