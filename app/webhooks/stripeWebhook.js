import express from 'express';
import stripe from 'stripe';
import env from '../../env';

const router = express.Router();

router.post('/', async (req, res) => {
  let eventType;

  // Check if webhook signing is configured.
  if (env.stripe_webhook_key) {
    let event;
    const signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        env.stripe_webhook_key
      );
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.');

      return res.sendStatus(400);
    }
    const { data } = event;

    eventType = event.type;

    if (eventType === 'payment_intent.succeeded') {
      console.log('🔔  Payment received!');
      console.log(data);
      const session = data.object;

      console.log('handle payment succeeded');
    }
  }
  res.sendStatus(200);
});

export default router;
