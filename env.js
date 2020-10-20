import dotenv from 'dotenv';

dotenv.config();

export default {
  database_url: process.env.DATABASE_URL,
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  test_database_url: process.env.TEST_DATABASE_URL,
};
