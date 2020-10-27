import stripe from 'stripe';
import env from '../../env';
import { status } from '../helpers/status';
import dbQuery from '../db/dev/dbQuery';

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
    console.log(e);
  }
};
