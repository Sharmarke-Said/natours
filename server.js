const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION shutting down...');
  console.error(`${err.name} : ${err.message} `);
  // console.error(`${err.name} : ${err.message}  ${err.stack}`);

  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<DB_PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('MongoDB Connected Succesfully!...');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION shutting down...');
  // console.error(`${err.name} : ${err.message}`);
  console.error(`${err.name} : ${err.message}  ${err.stack}`);
  server.close(() => {
    process.exit(1);
  });
});
