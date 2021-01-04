const app = require('./app');
const { PORT, NODE_ENV } = require('./config');

app.listen(PORT, () =>
  console.log(`Server listening in ${NODE_ENV} mode on ${PORT}`)
);
