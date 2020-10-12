import express from 'express';
import stripe from 'stripe';

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

router.post('/webhook', async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripeApi.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    console.log(`🔔  Payment received!`);
  }

  res.sendStatus(200);
});

export default router;
