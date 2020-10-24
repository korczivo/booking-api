import dayjs from 'dayjs';

export const countDays = ({
  booking_end,
  booking_start,
}) => {
  const dateStart = dayjs(booking_start);
  const dateEnd = dayjs(booking_end);

  return dateEnd.diff(dateStart, 'day');
};
