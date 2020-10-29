import stripe from 'stripe';
import env from '../../env';
import dbQuery from '../db/dev/dbQuery';

import {
  errorMessage,
  status,
} from '../helpers/status';

const stripeApi = stripe(env.stripe_secret_key);

export const paymentService = async reservation_id => {
  const getReservationQuery = 'SELECT * FROM reservations WHERE id=$1';

  try {
    const { rows } = await dbQuery.query(getReservationQuery, [reservation_id]);
    const dbResponse = rows[0];

    const paymentIntent = await stripeApi.paymentIntents.create({
      amount: dbResponse.reservation_price,
      currency: 'usd',
      metadata: {
        reservation_id: dbResponse.id,
      },
    });

    return {
      response: {
        clientSecret: paymentIntent.client_secret,
        publishableKey: env.stripe_public_key,
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
