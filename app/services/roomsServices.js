import dbQuery from '../db/dev/dbQuery';

import {
  errorMessage,
  status,
  successMessage,
} from '../helpers/status';

import { getFieldOfObj } from '../helpers/common';

export const getRoomsService = async () => {
  const getRoomsQuery = 'SELECT * FROM ROOMS';

  try {
    const { rows } = await dbQuery.query(getRoomsQuery);

    return {
      response: {
        data: rows,
      },
      status: status.success,
    };
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};

export const getRoomService = async roomId => {
  const getRoomQuery = 'SELECT * FROM rooms WHERE id=$1';
  const getCommentsQuery = 'SELECT * FROM comments WHERE room_id=$1';

  try {
    const { rows: roomComments } = await dbQuery.query(getCommentsQuery, [roomId]);

    const { rows } = await dbQuery.query(getRoomQuery, [roomId]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'Room does not exist.';

      return {
        response: errorMessage,
        status: status.notfound,
      };
    }

    const response = {
      ...dbResponse,
      comments: [...roomComments],
    };

    return {
      response: {
        data: response,
      },
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

export const createRoomService = async room => {
  const createRoomQuery = `INSERT INTO
  rooms(name, type, price, size, capacity, pets, breakfast, description, slug)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *`;

  try {
    const { rows } = await dbQuery.query(createRoomQuery, room);
    const dbResponse = rows[0];

    return {
      response: {
        data: dbResponse,
      },
      status: status.created,
    };
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Room with that name already exist.';

      return {
        response: errorMessage,
        status: status.conflict,
      };
    }
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.success,
    };
  }
};

export const updateRoomService = async (roomId, room) => {
  const getRoomQuery = 'SELECT * FROM rooms WHERE id=$1';
  const updateRoomQuery = `UPDATE rooms SET ${[...getFieldOfObj(room)]} WHERE id = ${roomId} returning *`;

  try {
    const { rows } = await dbQuery.query(getRoomQuery, [roomId]);
    const findRoom = rows[0];

    if (!findRoom) {
      errorMessage.error = 'Room does not exist.';

      return {
        response: errorMessage,
        status: status.notfound,
      };
    }

    const values = [...Object.values(room)];

    const { rows: updatedRoom } = await dbQuery.query(updateRoomQuery, values);

    return {
      response: {
        data: updatedRoom,
      },
      status: status.success,
    };
  } catch (e) {
    errorMessage.error = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};

export const deleteRoomService = async roomId => {
  const getRoomQuery = 'SELECT * FROM rooms WHERE id=$1';
  const deleteRoomQuery = 'DELETE FROM rooms WHERE id=$1';

  try {
    const { rows } = await dbQuery.query(getRoomQuery, [roomId]);
    const findRoom = rows[0];

    if (!findRoom) {
      errorMessage.error = 'Room does not exist.';

      return {
        response: errorMessage,
        status: status.notfound,
      };
    }

    await dbQuery.query(deleteRoomQuery, [roomId]);

    return {
      response: successMessage,
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
