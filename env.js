import dotenv from 'dotenv';

dotenv.config();

export default {
  database_url: process.env.DATABASE_URL,
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  secret: process.env.SECRET,
  test_database_url: process.env.TEST_DATABASE_URL,
};
