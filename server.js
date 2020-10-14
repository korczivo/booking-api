import express from 'express';
import '@babel/polyfill';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from './env';
import usersRoute from './app/routes/usersRoute';
import authRoute from './app/routes/authRoute';
import roomsRoute from './app/routes/roomsRoute';
import commentsRoute from './app/routes/commentsRoute';
import reservationRoute from './app/routes/reservation';
import paymentRoute from './app/routes/paymentRoute';
import stripeWebhook from './app/webhooks/stripeWebhook';

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// app.use(bodyParser.json());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(
//   express.json({
//     // We need the raw body to verify webhook signatures.
//     // Let's compute it only when hitting the Stripe webhook endpoint.
//     verify(req, res, buf) {
//       if (req.originalUrl.startsWith('/api/v1/webhook')) {
//         req.rawBody = buf.toString();
//       }
//     },
//   })
// );

app.use('/api/v1', usersRoute);
app.use('/api/v1', authRoute);
app.use('/api/v1', roomsRoute);
app.use('/api/v1', commentsRoute);
app.use('/api/v1', reservationRoute);
app.use('/api/v1', paymentRoute);
app.use('/webhook/stripe', bodyParser.raw({ type: '*/*' }), stripeWebhook);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;
