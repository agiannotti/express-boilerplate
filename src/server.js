const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Server listening in ${process.env.NODE_ENV} mode on ${PORT}`)
);
