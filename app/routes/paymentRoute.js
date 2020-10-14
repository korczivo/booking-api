import express from 'express';
import stripe from 'stripe';
import bodyParser from 'body-parser';

const router = express.Router();
const stripeApi = stripe('sk_test_51Hb73JBHQaP44l0q69BBkpIpJBxpll7LIYTBuwI4EZkKQhyRVs2gFeK3384bmhjAQ6T8pYlovrn8cCfEHp00AqIB00Wh7ACtw4');

router.post('/create-session', async (req, res) => {
  try {
    const session = await stripeApi.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Room name',
              // images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000, // room price
          },
          quantity: 1, // days
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5000/success.html',
      cancel_url: 'http://localhost:5000/cancel.html',
    });

    return res.status(200).send({ id: session.id });
  } catch (e) {
    console.log(e);
  }
});

export default router;
