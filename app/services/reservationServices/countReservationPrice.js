import dbQuery from '../../db/dev/dbQuery';

export const countReservationPrice = async ({
  reservationPeriod,
  room_id,
}) => {
  const getRoomQuery = 'SELECT price from rooms WHERE id=$1';

  const { rows: roomRow } = await dbQuery.query(getRoomQuery, [room_id]);

  const room = roomRow[0];

  return (reservationPeriod * room.price) * 100;
};
