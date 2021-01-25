module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL || 'postgresql://postgres@localhost/noteful_api',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'placeholder-token',
};
