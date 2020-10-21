import express from 'express';
import stripe from 'stripe';

const router = express.Router();

router.post('/', async (req, res) => {
  let eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK
      );
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.');

      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const { data } = event;

    eventType = event.type;

    if (eventType === 'payment_intent.succeeded') {
      console.log('🔔  Payment received!');
      console.log(data);
      const session = data.object;

      console.log('handle payment succeeded');
    } else if (eventType === 'account.updated') {
      console.log('🔔  Stripe Account updated!');
      console.log(data);
      const account = data.object;

      console.log('handle account update');
    }
  }
  res.sendStatus(200);
});

export default router;
